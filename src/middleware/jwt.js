import constants from "../constants/constants.js";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET;
import { responseModel } from "../helpers/responseModelHelper.js";
import LogsModel from "../models/logsModel.js";

export default function verifyJWT(req, res, next) {
  const response = { ...responseModel };
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res
      .status(constants['403'].status)
      .json({ error: constants['403'].tokenNotFound });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, SECRET, (error, decode) => {
    if (error) {
      response.error = constants['401'].tokenItsNotValid;
      return res.status(401).json(response);
    }
    req.userId = decode.userId;

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (ip && ip.includes(',')) {
      ip = ip.split(',')[0];
    }

    if (ip.includes('::ffff:')) {
      ip = ip.replace('::ffff:', '');
    }

    async function criarRegistro() {
      try {
        await LogsModel.create({
          userId: decode.id,
          userApp: decode.app,
          userToken: token,
          userIP: ip,
          routeRequest: req.url,
          methodRequest: req.method,
          userAgent: req.headers['user-agent']
        });
        console.log("Registro criado com sucesso!");
      } catch (error) {
        console.error("Erro ao criar registro:", error);
      }
    }

    // Chamar a função para executá-la
    criarRegistro();
    next();
  });
};