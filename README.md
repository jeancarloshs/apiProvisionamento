
# apiProvisionamento

Essa API foi desenvolvida para utilizar com o sistema de provisionamento,
utilizando Node.js.


## Funcionalidades

- Create
- Read
- Update
- Delete


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SUPABASE_URL` = DATABASE URL

`SUPABASE_HOSTNAME` = postgres

`SUPABASE_DBUSER` = postgres

`SUPABASE_PASSWORD` = DATABASE PASSWORD

`SUPABASE_PORT` = DATABASE PORT

`SECRET` = JWT SECRET
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/jeancarloshs/apiProvisionamento.git
```

Entre no diretório do projeto

```bash
  cd apiProvisionamento
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

URL para testes

```bash
  127.0.0.1:3000
```

## Documentação da API

#### Autenticar na API para trazer o token

```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. O EMAIL do usuario para autenticar |
| `password`      | `string` | **Obrigatório**. O PASSWORD do usuario para autenticar |

#### Para fazer qualquer consulta na API precisa passar o Token Bearer

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna todos os Usuarios

```http
  GET /listaUsuarios
```

#### Retorna um Usuario

```http
  GET /listaUsuario/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Retorna todos os Clientes

```http
  GET /listaClientes
```

#### Pesquisa um Cliente

```http
  GET /buscaCliente
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nomeCliente`      | `string` | **Obrigatório**. O nomeCliente que você quer pesquisar |

#### Pesquisa pelos serviços do Tecnico de Rua

```http
  GET /buscaServicoTecnico
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `tecnicoRua`      | `string` | **Obrigatório**. O tecnicoRua que você quer pesquisar os serviços realizados |

#### Pesquisa pelos serviços do Tecnico de Interno

```http
  GET /buscaServicoSuporte
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `tecnicoSup`      | `string` | **Obrigatório**. O tecnicoSup que você quer pesquisar os serviços realizados |

#### Pesquisa o historico de instalação do Equipamento pelo numero de serie

```http
  GET /buscaSerialNumber/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Pesquisa o historico de instalação do Equipamento pelo patrimonio

```http
  GET /buscaPatrimonio/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Pesquisa o historico de instalação do Equipamento pelo patrimonio

```http
  GET /buscaTipoDeServico
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `tipoDeAtivacao`      | `string` | **Obrigatório**. O tipoDeAtivacao que você quer |

#### Retorna a lista de arquivos salvas no DB

```http
  GET /listaArquivos
```

#### Retorna todos os Serviços

```http
  GET /listaServicos
```

#### Salva no DB o Provisionamento do cliente

```http
  POST /provisionaClientes
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nomeCliente`      | `string` | **Obrigatório**. O nomeCliente que você quer |
| `enderecoCliente`      | `string` | **Obrigatório**. O enderecoCliente que você quer |
| `tecnicoRua`      | `string` | **Obrigatório**. O tecnicoRua que você quer |
| `numeroDeSerie`      | `string` | **Obrigatório**. O numeroDeSerie que você quer |
| `posicionamento`      | `string` | **Obrigatório**. O posicionamento que você quer |
| `tecnicoSup`      | `string` | **Obrigatório**. O tecnicoSup que você quer |
| `tipoDeServico`      | `string` | **Obrigatório**. O tipoDeServico que você quer |

#### Cadastra um novo usuario no DB

```http
  POST /inserirUsuario
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nomeFuncionario`      | `string` | **Obrigatório**. O nomeFuncionario que você quer |
| `cargoFuncionario`      | `string` | **Obrigatório**. O cargoFuncionario que você quer |
| `emailFuncionario`      | `string` | **Obrigatório**. O emailFuncionario que você quer |
| `senhaFuncionario`      | `string` | **Obrigatório**. O senhaFuncionario que você quer |
| `admin`      | `bool` | **Obrigatório**. O admin que você quer |
| `permissaoDoColaborador`      | `string` | **Obrigatório**. O permissaoDoColaborador que você quer |
| `status`      | `int` | **Obrigatório**. O status que você quer |

#### Atualiza um Usuario no DB

```http
  POST /atualizarUsuario/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nomeFuncionario`      | `string` | **Obrigatório**. O nomeFuncionario que você quer |
| `cargoFuncionario`      | `string` | **Obrigatório**. O cargoFuncionario que você quer |
| `emailFuncionario`      | `string` | **Obrigatório**. O emailFuncionario que você quer |
| `senhaFuncionario`      | `string` | **Obrigatório**. O senhaFuncionario que você quer |
| `admin`      | `bool` | **Obrigatório**. O admin que você quer |
| `permissaoDoColaborador`      | `string` | **Obrigatório**. O permissaoDoColaborador que você quer |
| `status`      | `int` | **Obrigatório**. O status que você quer |

#### Cadastra um novo Serviço no DB

```http
  POST /criarTipoDeServico
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `tipoDeServico` | `string` | **Obrigatório**. O tipoDeServico que você quer |

#### Atualiza um Serviço no DB

```http
  POST /atualizaTipoDeServico/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `tipoDeServico` | `string` | **Obrigatório**. O tipoDeServico que você quer |

#### Cadastra um novo Arquivo no DB

```http
  POST /inserirArquivo
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nomeArquivo`      | `string` | **Obrigatório**. O nomeArquivo que você quer |
| `urlArquivo`      | `string` | **Obrigatório**. O urlArquivo que você quer |

#### Atualiza um Arquivo no DB

```http
  POST /atualizarArquivo/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nomeArquivo`      | `string` | **Obrigatório**. O nomeArquivo que você quer |
| `urlArquivo`      | `string` | **Obrigatório**. O urlArquivo que você quer |

#### Remove um Cliente no DB

```http
  DELETE /removeCliente/:id
```

#### Remove um Usuario no DB

```http
  DELETE /deletarUsuario/:id
```

#### Remove um Serviço no DB

```http
  DELETE /deletarTipoDeServico/:id
```

#### Remove um Arquivo no DB

```http
  DELETE /deletarArquivo/:id
```
## Stack utilizada

**Front-end:** React, NextJS, TailwindCSS

**Back-end:** Node, Express, Sequelize


## Aprendizados

O que você aprendeu construindo esse projeto? Quais desafios você enfrentou e como você superou-os?

Esse projeto foi a segunda API em Node.JS que criei do zero, utilizei um pouco da base do primeiro projeto para iniciar este, porem inseri novas funcionalidades, como por exemplo o JWT e esse projeto está sendo utilizado no dia-a-dia pela equipe da empresa, então sempre que precisa de alguma funcionalidade nova ou correção o pessoal me aciona para poder atender a necessidade.
## Melhorias

Que melhorias você fez no seu código? Ex: refatorações, melhorias de performance, acessibilidade, etc

Além das refatorações, estou pensando em fazer a integração com a OLT da Nokia, para que a equipe não precise ficar acessando o equipamento toda vez que for ativar algum cliente
## Usado por

Esse projeto é usado pelas seguintes empresas:

- Naxos Telecom Comercio E Servicos Eireli


## Autores

- [@jeancarloshs](https://www.github.com/jeancarloshs)

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jean-carlos-nunes-de-almeida-81a68b139/)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

