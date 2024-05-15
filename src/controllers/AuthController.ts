import md5 from "md5";
import { Request, Response } from "express";
import constants from "../constants/constants";
import jwt from "jsonwebtoken";
import { UsersModel } from "../models/usuariosModel";
import LogsModel from "../models/logsModel";
import { responseModel } from "../helpers/responseModelHelper";
import { getInfoIp } from "../services/getIpService";
import { IResponse } from "../types/authTypes";
const SECRET = process.env.SECRET;

const response: IResponse = { ...responseModel };

export default {
  async login(req: Request, res: Response) {
    response.data = [];
    let { email, password } = req.body;

    if (typeof (password) !== 'string') {
      password = String(password);
    }

    // const passwordEncrypted = password !== undefined ? md5(password) : "";
    const passwordEncrypted = md5(password);

    try {
      // const userLogin =
      //   await db`SELECT id, "nomeFuncionario", "emailFuncionario" AS "email", "senhaFuncionario" AS "password", "admin", "permissaoDoColaborador", "status" 
      //   FROM "tbUsuarios" where "emailFuncionario" = ${email} AND "senhaFuncionario" = ${passwordEncrypted}`;

      const userLogin = await UsersModel.findAll({
        where: {
          emailFuncionario: email,
          senhaFuncionario: passwordEncrypted
        }
      })

      const resUserLogin = userLogin.map((element: any) => element.dataValues)

      response.success = resUserLogin.length > 0;
      if (response.success) {
        if (resUserLogin[0].status != 1) {
          res.status(401);
          response.error = constants["401"].inactiveUser;
          return res.json(response);
        }

        const token = jwt.sign({ id: resUserLogin[0].id, app: resUserLogin[0].app }, SECRET!, {
          expiresIn: 86400000, // 1 dia para expiração do token
        });

        response.data = resUserLogin;
        const objAuth = {
          user: {
            id: resUserLogin[0].id,
            nomeFuncionario: resUserLogin[0].nomeFuncionario,
            email: resUserLogin[0].email,
            admin: resUserLogin[0].admin,
            permissaoDoColaborador: resUserLogin[0].permissaoDoColaborador,
            status: resUserLogin[0].status,
          },
          auth: true,
          token: token,
        };

        let ip: any = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Verificar se o endereço IP é IPv6 mapeado para IPv4
        if (ip?.includes('::ffff:')) {
          // IPv6 mapeado para IPv4
          ip = ip.replace('::ffff:', '');
        }

        await LogsModel.create({
          userId: resUserLogin[0].id,
          userApp: resUserLogin[0].app,
          userToken: token,
          userIP: ip,
          routeRequest: req.url,
          methodRequest: req.method,
          userAgent: req.headers['user-agent']
        });
        await getInfoIp(resUserLogin[0].id, resUserLogin[0].app, ip);

        return res.json(objAuth);
      } else {
        res.status(401);
        response.error = constants["401"].userLoginError;
      }
    } catch (err) {
      console.error('ERROR', err);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },
};
