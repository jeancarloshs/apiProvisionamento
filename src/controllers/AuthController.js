import db from "../config/dbConfig.js";
import md5 from "md5";
import constants from "../constants/constants.js";
import jwt from "jsonwebtoken";
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
    const { login, password } = req.body;
    const passwordEncrypted = password !== undefined ? md5(password) : "";  

    try {
      const userLogin =
        await db`SELECT id, "nomeFuncionario", "emailFuncionario" AS "email", "senhaFuncionario" AS "password", "admin", "permissaoDoColaborador" FROM "tbUsuarios" where "emailFuncionario" = ${login} AND "senhaFuncionario" = ${password}`;
      response.success = userLogin.length > 0;

      if (response.success) {
        response.success = true;
        response.found = userLogin.length;

        const token = jwt.sign({ login: login }, SECRET, {
          expiresIn: 2592000,
        });
        response.data = userLogin;
        // console.log(token)
        return res.json({ auth: true, token });
      } else {
        res.status(401);
        response.error = constants["401"].userLoginError;
      }
    //   console.log(data);
    } catch (err) {
      console.log(err);
    }
    return res.json(response);
  },
};