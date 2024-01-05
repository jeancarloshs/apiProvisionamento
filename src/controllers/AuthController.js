import md5 from "md5";
import constants from "../constants/constants.js";
import jwt from "jsonwebtoken";
import User from "../models/usuarioModel.js";
const SECRET = process.env.SECRET;

const responseModel = {
  success: false,
  found: 0,
  data: [],
  error: "",
};

export default {
  async login(req, res) {
    const response = { ...responseModel };
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

      const userLogin = await User.findAll({
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

        const token = jwt.sign({ id: resUserLogin[0].id }, SECRET, {
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
