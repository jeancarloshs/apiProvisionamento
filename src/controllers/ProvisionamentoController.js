import express from "express";
import db from "../config/dbConfig.js";
import constants from "../constants/constants.js";

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
    const { numberSerial } = req.body;
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

    const resNumberSerial =
      await db`SELECT * FROM "PROVISIONAMENTO" WHERE "numberSerial" LIKE '%' || ${numberSerial} || '%';`;

    // Formatar a data para cada registro retornado
    const resNumberSerialFormatado = resNumberSerial.map((row) => {
      return {
        ...row,
        data: dataFormatada.format(row.data),
      };
    });

    console.log(resNumberSerialFormatado);

    response.success = resNumberSerialFormatado.length > 0;
    // console.log(resClienteFormatado)

    try {
      if (response.success) {
        response.success = true;
        response.found = resNumberSerialFormatado.length;
        response.data.push(resNumberSerialFormatado);
      } else {
        response.error = constants["404"].userNotFound;
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

    query = await db`INSERT INTO PROVISIONAMENTO (clientes, tecnicoRua, numberSerial, tipoDeAtivacao, posicionamento, patrimonioNX, tecnicoSup)
              VALUES ('${clientes}', '${patrimonioNX}', '${numberSerial}', '${posicionamento}', '${tipoDeAtivacao}', '${tecnicoRua}', '${tecnicoSup}');`;

    if(response.success) {
      response.success = true
      response.data = query.length
    } else {
      response.error = constants["404"].userNotFound;
    }
  },
};
