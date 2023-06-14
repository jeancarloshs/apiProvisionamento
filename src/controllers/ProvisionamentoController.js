import express, { response } from "express";
import db from "../config/dbConfig.js";
import constants from "../constants/constants.js";
import json from "body-parser";

const responseModel = {
  success: false,
  found: 0,
  data: [],
  error: "",
};

export default {
  async listaClientes(req, res) {
    const response = { ...responseModel };
    response.data = [];

    const tbClientesProvisionados = await db`SELECT * FROM "PROVISIONAMENTO"`;

    if (tbClientesProvisionados.length > 0) {
      response.success = true;
      response.found = tbClientesProvisionados.length;
      response.data.push(tbClientesProvisionados);
    }

    return res.json(response);
  },

  async buscaCliente(req, res) {
    const response = { ...responseModel };
    const { nomeCliente } = req.body;
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // weekday: 'long',
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    response.data = [];

    const resCliente =
      await db`SELECT * FROM "PROVISIONAMENTO" WHERE "clientes" LIKE '%' || ${nomeCliente} || '%';`;

    // Formatar a data para cada registro retornado
    const resClienteFormatado = resCliente.map((row) => {
      return {
        ...row,
        data: dataFormatada.format(row.data),
      };
    });

    console.log(resClienteFormatado);

    response.success = resClienteFormatado.length > 0;
    // console.log(resClienteFormatado)

    try {
      if (response.success) {
        response.success = true;
        response.found = resClienteFormatado.length;
        response.data.push(resClienteFormatado);
      } else {
        response.error = constants["404"].userNotFound;
      }
    } catch (e) {
      console.log("ERRO:", e);
    }
    return res.json(response);
  },

  async buscaServicoTecnico(req, res) {
    const response = { ...responseModel };
    const { tecnicoRua } = req.body;
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // weekday: 'long',
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    response.data = [];

    const resTecnicoRua =
      await db`SELECT * FROM "PROVISIONAMENTO" WHERE "tecnicoRua" LIKE '%' || ${tecnicoRua} || '%';`;

    // Formatar a data para cada registro retornado
    const resTecnicoRuaFormatado = resTecnicoRua.map((row) => {
      return {
        ...row,
        data: dataFormatada.format(row.data),
      };
    });

    console.log(resTecnicoRuaFormatado);

    response.success = resTecnicoRuaFormatado.length > 0;
    // console.log(resClienteFormatado)

    try {
      if (response.success) {
        response.success = true;
        response.found = resTecnicoRuaFormatado.length;
        response.data.push(resTecnicoRuaFormatado);
      } else {
        response.error = constants["404"].userNotFound;
      }
    } catch (e) {
      console.log("ERRO:", e);
    }
    return res.json(response);
  },

  async buscaServicoSuporte(req, res) {
    const response = { ...responseModel };
    const { tecnicoSup } = req.body;
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // weekday: 'long',
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    response.data = [];

    const resTecnicoSup =
      await db`SELECT * FROM "PROVISIONAMENTO" WHERE "tecnicoSup" LIKE '%' || ${tecnicoSup} || '%';`;

    // Formatar a data para cada registro retornado
    const resTecnicoSupFormatado = resTecnicoSup.map((row) => {
      return {
        ...row,
        data: dataFormatada.format(row.data),
      };
    });

    console.log(resTecnicoSupFormatado);

    response.success = resTecnicoSupFormatado.length > 0;
    // console.log(resClienteFormatado)

    try {
      if (response.success) {
        response.success = true;
        response.found = resTecnicoSupFormatado.length;
        response.data.push(resTecnicoSupFormatado);
      } else {
        response.error = constants["404"].userNotFound;
      }
    } catch (e) {
      console.log("ERRO:", e);
    }
    return res.json(response);
  },

  async buscaSerialNumber(req, res) {
    const response = { ...responseModel };
    let numberSerial = req.params.id;
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // weekday: 'long',
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    response.data = [];

    try {
      let resNumberSerial =
        await db`SELECT * FROM "PROVISIONAMENTO" WHERE "numberSerial" LIKE '%' || ${numberSerial} || '%';`;

      // Formatar a data para cada registro retornado
      let resNumberSerialFormatado = resNumberSerial.map((row) => {
        return {
          ...row,
          data: dataFormatada.format(row.data),
        };
      });

      console.log(resNumberSerialFormatado);

      response.success = resNumberSerialFormatado.length > 0;
      if (response.success) {
        response.success = resNumberSerialFormatado.length;
        response.found = resNumberSerialFormatado.length;
        response.data = resNumberSerialFormatado;
      } else {
        response.error = constants["404"].userNotFound;
      }
    } catch (e) {
      console.log("ERRO:", e);
    }
    return res.json(response);
  },

  async buscaPatrimonio(req, res) {
    const response = { ...responseModel };
    let patrimonioNX = req.params.id;
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    response.data = [];

    try {
      let resNumeroPatrimonioNX =
        // await db`SELECT * FROM "PROVISIONAMENTO" WHERE "patrimonioNX" = "${patrimonioNX}"`;
        await db`SELECT * FROM "PROVISIONAMENTO" WHERE "patrimonioNX" LIKE '%' || ${patrimonioNX} || '%';`;

      // Formatar a data para cada registro retornado
      let resNumeroPatrimonioNXFormatado = resNumeroPatrimonioNX.map((row) => {
        return {
          ...row,
          data: dataFormatada.format(row.data),
        };
      });

      response.success = resNumeroPatrimonioNXFormatado.length > 0;
      if (response.success) {
        response.success = resNumeroPatrimonioNXFormatado.length;
        response.found = resNumeroPatrimonioNXFormatado.length;
        response.data.push(resNumeroPatrimonioNXFormatado);
      } else {
        response.error = constants["404"].heritageNotFound;
        console.log("patrimonio inexistente");
      }
    } catch (e) {
      console.log("ERRO:", e);
    }
    return res.json(response);
  },

  async buscaTipoDeServico(req, res) {
    const response = { ...responseModel };
    const { tipoDeAtivacao } = req.body;
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // weekday: 'long',
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    response.data = [];

    const resTipoDeAtivacao =
      await db`SELECT * FROM "PROVISIONAMENTO" WHERE "tipoDeAtivacao" LIKE '%' || ${tipoDeAtivacao} || '%';`;

    // Formatar a data para cada registro retornado
    const resTipoDeAtivacaoFormatado = resTipoDeAtivacao.map((row) => {
      return {
        ...row,
        data: dataFormatada.format(row.data),
      };
    });

    console.log(resTipoDeAtivacaoFormatado);

    response.success = resTipoDeAtivacaoFormatado.length > 0;
    // console.log(resClienteFormatado)

    try {
      if (response.success) {
        response.success = true;
        response.found = resTipoDeAtivacaoFormatado.length;
        response.data.push(resTipoDeAtivacaoFormatado);
      } else {
        response.error = constants["404"].userNotFound;
      }
    } catch (e) {
      console.log("ERRO:", e);
    }
    return res.json(response);
  },

  async provisionaClientes(req, res) {
    const response = { ...responseModel };
    response.data = [];
    const dataAtual = new Date();
    const {
      clientes,
      patrimonioNX,
      numberSerial,
      posicionamento,
      tipoDeAtivacao,
      tecnicoRua,
      tecnicoSup,
    } = req.body;
    let query = "";

    try {
      query = await db`
      INSERT INTO "PROVISIONAMENTO" ("clientes", "tecnicoRua", "numberSerial", "tipoDeAtivacao", "posicionamento", "patrimonioNX", "tecnicoSup", "data")
      VALUES (${clientes}, ${tecnicoRua}, ${numberSerial}, ${tipoDeAtivacao}, ${posicionamento}, ${patrimonioNX}, ${tecnicoSup}, ${dataAtual})
      RETURNING *;`;

      console.log(query);

      response.success = query.length > 0;

      if (response.success) {
        response.success = true;
        response.found = resNumeroPatrimonioFormatado.length;
        response.success.push(resNumeroPatrimonioFormatado);
        response.success = true;
        response.data = query.length;
        // response.success.push = ["PROVISIONADO COM SUCESSO"];
      } else {
        response.error = constants["404"].userNotFound;
      }
    } catch (e) {
      console.log("ERRO:", e);
    }
    return res.json(query);
  },

  async removeCliente(req, res) {
    const response = { ...responseModel };
    response.data = [];
    let clienteId = req.params.id;
    let query = "";

    try {
      query = await db`
      DELETE FROM "PROVISIONAMENTO"
      WHERE "id" = ${clienteId}
      RETURNING *;`;
      console.log(query);

      response.success = query.length > 0;
      if (response.success) {
        response.data = query.length;
        response.found = query.length;
        response.data = constants["200"].deletedUser;
      } else {
        response.error = constants["404"].userNotFound;
      }
    } catch (e) {
      console.log("ERRO:", e);
      // response.error = "Erro ao excluir o cliente";
    }
    return res.json(response);
  },
};
