import constants from "../constants/constants";
import { Archives } from "../models/archivesModel";
import { Request, Response } from "express";
import { IArquivos, IResponse } from "../types/arquivosTypes";
import { responseModel } from "../helpers/responseModelHelper";
import { arquivosRepository, createArchiveRepository } from "../repositories/archivesRepository";

const response: IResponse = { ...responseModel };

export default {
  async listFiles(req: Request, res: Response) {
    let app = req.params.app;
    response.data = [];
    const archiveRepository: IArquivos[] | any = await arquivosRepository(parseInt(app));

    try {
      if (archiveRepository.length > 0) {
        response.success = true;
        response.found = archiveRepository.length;
        response.data = archiveRepository;
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

  async insertFile(req: Request, res: Response) {
    const { archiveName, archiveUrl, app } = req.body;

    try {
      let createArchive: IArquivos[] | any = await createArchiveRepository(archiveName, archiveUrl, app);

      if (createArchive) {
        console.log(
          "Arquivo inserido com sucesso:",
          createArchive.toJSON()
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

  async updateFile(req: Request, res: Response) {
    const arqId = req.params.id;
    const { archiveName, archiveUrl, app } = req.body;

    const atualizaArquivo = {
      name: archiveName,
      url: archiveUrl,
      app: app
    };

    try {
      const archive = await Archives.findByPk(arqId);

      if (archive) {
        await archive.update({ atualizaArquivo }, {
          where: {
            "app": app
          }
        });
        response.success = true;
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

  async deleteFile(req: Request, res: Response) {
    const app = req.params.app;
    const arqId = req.params.id;

    try {
      const deleteFile = await Archives.findByPk(arqId);

      if (deleteFile) {
        await deleteFile.destroy();
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
