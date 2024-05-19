import { provisioningToMap, Provisioning } from "../models/provisioningModel";
import { UsersModel } from "../models/usuariosModel";
import { ServiceType } from "../models/tipoDeServicoModel";
import { AppsModel } from "../models/appsModel";
import { Op } from "sequelize";

export const clientsListRepository = async (app: number) => {
  const clientsListRepository = await Provisioning.findAll({
    where: {
      'app': app
    },
    include: [
      {
        model: UsersModel,
        attributes: ['nomeFuncionario'],

      },
      {
        model: ServiceType,
        attributes: ['tipoDeServico']
      },
      {
        model: AppsModel,
        attributes: ['nomeApp']
      }
    ],
    attributes: [
      'id',
      'nomeCliente',
      'enderecoCliente',
      'numeroDeSerie',
      'posicionamento',
      'patrimonioNaxos',
      'created_at',
      'updated_at'
    ],
    order: [["id", "ASC"]],
    replacements: { app: app },
  })

  const listClients = provisioningToMap(clientsListRepository);
  return listClients;
};

export const findClientRepository = async (app: number, nomeCliente: string) => {
  const findClientRepository = await Provisioning.findAll({
    where: {
      "app": app,
      clientes: {
        [Op.like]: `%${nomeCliente}%` // Correção aqui
      }
    }
  });

  const clientFound = provisioningToMap(findClientRepository);
  return clientFound;
};

export const findClientTecExtRepository = async (app: number, tecnicoRua: string) => {
  const findClientTecExtRepository = await Provisioning.findAll({
    where: {
      "app": app,
      tecnicoRua: {
        [Op.like]: `%${tecnicoRua}%`
      }
    }
  });

  const foundClientTecExt = provisioningToMap(findClientTecExtRepository);
  return foundClientTecExt;
};

export const findClientTecIntRepository = async (app: number, tecnicoSup: string) => {
  const findClientTecIntRepository = await Provisioning.findAll({
    where: {
      "app": app,
      tecnicoSup: {
        [Op.like]: `%${tecnicoSup}%`
      }
    }
  });

  const foundClientTecInt = provisioningToMap(findClientTecIntRepository);
  return foundClientTecInt;
};

export const findWithSerialNumberRepository = async (app: number, numberSerial: string) => {
  const findWithSerialNumberRepository = await Provisioning.findAll({
    where: {
      "app": app,
      numberSerial: {
        [Op.like]: `%${numberSerial}%`
      }
    }
  })

  const foundWithSerialNumber = provisioningToMap(findWithSerialNumberRepository);
  return foundWithSerialNumber;
};

export const findWithPatrimonyRepository = async (app: number, patrimonioNX: string) => {
  const findWithPatrimonyRepository = await Provisioning.findAll({
    where: {
      "app": app,
      patrimonioNX: patrimonioNX
    }
  })

  const foundWithPatrimony = provisioningToMap(findWithPatrimonyRepository);
  return foundWithPatrimony;
};

export const findTypeServiceRepository = async (app: number, tipoDeAtivacao: string) => {
  const findTypeServiceRepository = await Provisioning.findAll({
    where: {
      "app": app,
      tipoDeAtivacao: tipoDeAtivacao
    }
  })

  const foundTypeService = provisioningToMap(findTypeServiceRepository);
  return foundTypeService;
};

export const provisioningClientRepository = async (
  nomeCliente: string,
  enderecoCliente: string,
  tecnicoRua: string,
  numeroDeSerie: string,
  tipoDeServico: string,
  posicionamento: string,
  patrimonioNaxos: string,
  tecnicoSup: string,
  app: number
) => {
  const provisioningClientRepository = await Provisioning.create({
    nomeCliente: nomeCliente,
    enderecoCliente: enderecoCliente,
    tecnicoRua: tecnicoRua,
    numeroDeSerie: numeroDeSerie,
    tipoDeServico: tipoDeServico,
    posicionamento: posicionamento,
    patrimonioNaxos: patrimonioNaxos,
    tecnicoSup: tecnicoSup,
    app: app
  })

  const provisionedClient = [provisioningClientRepository.dataValues];
  return provisionedClient;
};

export const deleteClientRepository = async (clientID: number) => {
  const deleteClientRepository = await Provisioning.findByPk(clientID);
  return deleteClientRepository
}