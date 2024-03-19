import db from "../config/dbConfig.js";
import constants from "../constants/constants.js";
import Files from "../models/arquivosModel.js";
import { responseModel } from "../helpers/responseModelHelper.js";

const response = { ...responseModel };

export default {
  async listaArquivos(req, res) {
    let app = req.params.app;
    response.data = [];

    const tbArquivos = await Files.findAll({
      where: {
        "app": app
      },
      order: [
        ["id", "ASC"],
      ]
    });

    try {
      if (tbArquivos.length > 0) {
        response.success = true;
        response.found = tbArquivos.length;
        response.data = tbArquivos;
      } else {
        response.error = constants["404"].noFilesFound;
      }
    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async inserirArquivo(req, res) {
    const { nomeArquivo, urlArquivo, app } = req.body;

    try {
      const resInserirArquivo = await Files.create({
        nome: nomeArquivo,
        url: urlArquivo,
        app: app,
      });

      if (resInserirArquivo) {
        console.log(
          "Arquivo inserido com sucesso:",
          resInserirArquivo.toJSON()
        );
        response.success = true;
        response.data = constants["201"].fileCreatedSuccessfully;
      } else {
        response.data = constants["404"].noFilesFound;
        return res.status(404).json(response);
      }
    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async atualizarArquivo(req, res) {
    const dataAtual = new Date();
    const arqId = req.params.id;
    const { nomeArquivo, urlArquivo, app } = req.body;

    const atualizaArquivo = {
      nome: nomeArquivo,
      url: urlArquivo,
      app: app
    };

    try {
      const arquivo = await Files.findByPk(arqId);

      if (arquivo) {
        await arquivo.update({atualizaArquivo}, {
          where: {
            "app": app
          }
        });
        response.success = true;
        // response.found = resAtualizarArquivo.length;
        response.data = constants["201"].fileUpdateSuccess;
      } else {
        response.error = constants["404"].noFilesFound;
      }
    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }

    return res.json(response);
  },

  async deletarArquivo(req, res) {
    const app = req.params.app;
    const arqId = req.params.id;

    try {
      const resDeletarArquivo = await Files.findByPk(arqId);

      if (resDeletarArquivo) {
        response.success = true;
        response.found = resDeletarArquivo.length;
        response.data = constants["200"].deletedFile;
        await resDeletarArquivo.destroy({
          where: {
            "app": app
          }
        });
        return res.status(200).json(response);
      } else {
        response.error = constants["404"].noFilesFound;
      }
    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },
};
