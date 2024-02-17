import db from "../config/dbConfig.js";
import constants from "../constants/constants.js";
import Files from "../models/arquivosModel.js";

const responseModel = {
  success: false,
  found: 0,
  data: [],
  error: "",
};

export default {
  async listaArquivos(req, res) {
    const response = { ...responseModel };
    response.data = [];

    const tbArquivos = await Files.findAll();

    try {
      if (tbArquivos.length > 0) {
        response.success = true;
        response.found = tbArquivos.length;
        response.data = tbArquivos
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
    const response = { ...responseModel };
    const {
      nomeArquivo,
      urlArquivo
    } = req.body;

    try {
      const resInserirArquivo = await Files.create({
        nome: nomeArquivo,
        url: urlArquivo
      })

      if (resInserirArquivo) {
        console.log('Arquivo inserido com sucesso:', resInserirArquivo.toJSON());
        response.success = true;
        response.data = constants['201'].fileCreatedSuccessfully
      } else {
        response.data = constants['404'].noFilesFound
        return res.status(404).json(response)
      }

    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response)
  },
  
  async atualizarArquivo(req, res) {
    const response = { ...responseModel };
    const dataAtual = new Date();
    const arqId = req.params.id;
    const { 
      nomeArquivo,
      urlArquivo
    } = req.body;
    let query = "";

    try {
      query = await db`
      UPDATE "tbArquivos" SET "nome"=${nomeArquivo}, "url"=${urlArquivo}, "update_at"=${dataAtual} 
      WHERE "id"=${arqId}
      RETURNING *;`

      response.success = query.length > 0;

      if (response.success) {
        response.success = true;
        response.found = query.length;
        response.data = constants["201"].fileUpdateSuccess;
      } else {
        response.error = constants["404"].noFilesFound
      }
      
    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }

    return res.json(response);
  },

  async deletarArquivo(req, res) {
    const response = { ...responseModel };
    const arqId = req.params.id;

    try {
      const resDeletarArquivo = await Files.findByPk(arqId);

      if (resDeletarArquivo) {
        response.success = true
        response.found = resDeletarArquivo.length;
        response.data = constants["200"].deletedFile;
        await resDeletarArquivo.destroy();
        return res.status(200).json(response);
      } else {
        response.error = constants["404"].noFilesFound;
      }
    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response)
  }
};
