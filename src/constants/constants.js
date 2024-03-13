export default {
    200: {
      status: 200,
      userError: "Usuário Não Pode Ser Criado",
      deletedUser: "Usuário Deletado",
      deletedClient: "Cliente Deletado",
      deletedDuplicates: "Duplicados Foram Deletados!",
      serviceDeleted: "Serviço Deletado",
      deletedFile: "Arquivo Deletado"
    },
    201: {
      status: 201,
      userSuccess: "Usuário Foi Criado com Sucesso",
      userUpdateSuccess: "Usuário foi Atualizado com Sucesso",
      successfullyProvisioned: "Provisionado com Sucesso",
      serviceCreatedSuccessfully: "Serviço Criado com Sucesso",
      serviceUpdateSuccess: "Serviço Atualizado com Sucesso",
      fileCreatedSuccessfully: "Arquivo Criado com Sucesso",
      fileUpdateSuccess: "Arquivo Atualizado com Sucesso"
    },
    401: {
      status: 401,
      tokenItsNotValid: "Token Inválido",
      userLoginError: "Login ou Senha Incorretos",
      inactiveUser: "Usuário Inativo"
    },
    403: {
      status: 403,
      tokenNotFound: "Token de Autenticação não Fornecido.",
    },
    404: {
      status: 404,
      userNotFound: "Usuário Não Encontrado",
      heritageNotFound: "Patrimonio Não Encontrado",
      noFilesFound: "Nenhum Arquivo Encontrado!",
      noServiceFound: "Nenhum Serviço Encontrato",
      noProductsFound: "Nenhum Produto Encontrado!",
      noListsFound: "Nenhuma Lista Foi Encontrada",
      noCustomersFound: "Nenhum Cliente Encontrado",
      noPositionsFound: "Nenhum Cargo Encontrado"
    },
    409: {
      status: 409,
      userAlreadyExist: "Usuário já Existe na Nossa Base de Dados",
      emailAlreadyExiste: "O Email já Está em Uso.",
    },
    422: {
      status: 422,
      requiredfields: "Preencha Todos os Campos",
      userNotDefined: "user: É obrigatório"
    },
    500: {
      status: 500,
      errorOccurred: "Ocorreu um erro ao Processar a Solicitação.",
    }
  };