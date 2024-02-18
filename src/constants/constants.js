export default {
    200: {
      status: 200,
      userError: "Usuário não pode ser criado",
      deletedUser: "Usuário Deletado",
      deletedClient: "Cliente deletado",
      deletedDuplicates: "Duplicados foram deletados!",
      serviceDeleted: "Serviço deletado",
      deletedFile: "Arquivo deletado"
    },
    201: {
      status: 201,
      userSuccess: "Usuário foi criado com Sucesso",
      userUpdateSuccess: "Usuário foi atualizado com Sucesso",
      successfullyProvisioned: "Provisionado com Sucesso",
      serviceCreatedSuccessfully: "Serviço criado com Sucesso",
      serviceUpdateSuccess: "Serviço atualizado com Sucesso",
      fileCreatedSuccessfully: "Arquivo criado com Sucesso",
      fileUpdateSuccess: "Arquivo atualizado com Sucesso"
    },
    401: {
      status: 401,
      tokenItsNotValid: "Token inválido",
      userLoginError: "Login ou senha incorretos",
      inactiveUser: "Usuário Inativo"
    },
    403: {
      status: 403,
      tokenNotFound: "Token de autenticação não fornecido.",
    },
    404: {
      status: 404,
      userNotFound: "Usuário não encontrado",
      heritageNotFound: "Patrimonio não encontrado",
      noFilesFound: "Nenhum arquivo encontrado!",
      noServiceFound: "Nenhum Serviço Encontrato",
      noProductsFound: "Nenhum produto encontrado!",
      noListsFound: "Nenhuma lista foi encontrada",
      noCustomersFound: "Nenhum cliente encontrado",
      noPositionsFound: "Nenhum cargo encontrado"
    },
    409: {
      status: 409,
      userAlreadyExist: "Usuário já existe na nossa base de dados",
      emailAlreadyExiste: "O email já está em uso.",
    },
    422: {
      status: 422,
      requiredfields: "Preencha todos os campos",
      userNotDefined: "user: É obrigatório"
    },
    500: {
      status: 500,
      errorOccurred: "Ocorreu um erro ao processar a solicitação.",
    }
  };