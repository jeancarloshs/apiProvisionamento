import md5 from "md5";
import constants from "../constants/constants.js";
import jwt from "jsonwebtoken";
import Users from "../models/usuariosModel.js";
import LogsModel from "../models/logsModel.js";
const SECRET = process.env.SECRET;
import { responseModel } from "../helpers/responseModelHelper.js";

const response = { ...responseModel };

export default {
  async login(req, res) {
    response.data = [];
    let { email, password } = req.body;

    if (typeof(password) !== 'string') {
      password = String(password);
    }
    
    // const passwordEncrypted = password !== undefined ? md5(password) : "";
    const passwordEncrypted = md5(password);

    try {
      // const userLogin =
      //   await db`SELECT id, "nomeFuncionario", "emailFuncionario" AS "email", "senhaFuncionario" AS "password", "admin", "permissaoDoColaborador", "status" 
      //   FROM "tbUsuarios" where "emailFuncionario" = ${email} AND "senhaFuncionario" = ${passwordEncrypted}`;

      const userLogin = await Users.findAll({
        where: {
          emailFuncionario: email,
          senhaFuncionario: passwordEncrypted
        }
      })

      const resUserLogin = userLogin.map((element) => element.dataValues)

      response.success = resUserLogin.length > 0;
      if (response.success) {
        if (resUserLogin[0].status != 1) {
          res.status(401);
          response.error = constants["401"].inactiveUser;
          return res.json(response);
        }

        const token = jwt.sign({ id: resUserLogin[0].id, app: resUserLogin[0].app }, SECRET, {
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

        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
        // Verificar se o endereço IP é IPv6 mapeado para IPv4
        if (ip.includes('::ffff:')) {
            // IPv6 mapeado para IPv4
            ip = ip.replace('::ffff:', '');
        }

        await LogsModel.create({
          userId: resUserLogin[0].id,
          userApp: resUserLogin[0].app,
          userToken: token,
          userIp: ip,
          routeRequest: req.url,
          methodRequest: req.method,
          userAgent: req.headers['user-agent']
        });

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
