import db from "../config/dbConfig";
import constants from "../constants/constants";
import { Files, mapArquivosToIArquivos } from "../models/arquivosModel";
import { Request, Response } from "express";
import { IArquivos, IResponse } from "../types/arquivosTypes";
import { responseModel } from "../helpers/responseModelHelper";

const response: IResponse = { ...responseModel };

export default {
  async listaArquivos(req: Request, res: Response) {
    let app = req.params.app;
    response.data = [];

    const tbArquivosModel = await Files.findAll({
      where: {
        "app": app
      },
      order: [
        ["id", "ASC"],
      ]
    });

    const tbArquivos: IArquivos[] = mapArquivosToIArquivos(tbArquivosModel);

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

  async inserirArquivo(req: Request, res: Response) {
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

  async atualizarArquivo(req: Request, res: Response) {
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
        await arquivo.update({ atualizaArquivo }, {
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

  async deletarArquivo(req: Request, res: Response) {
    const app = req.params.app;
    const arqId = req.params.id;

    try {
      const resDeletarArquivo = await Files.findByPk(arqId);

      if (resDeletarArquivo) {
        await resDeletarArquivo.destroy();
        response.success = true;
        response.data = constants["200"].deletedFile;
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
