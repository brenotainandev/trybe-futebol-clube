# Projeto Trybe Futebol Clube!

O projeto faz parte de uma atividade avaliativa do `Módulo: Back-end - Projeto TFC - Trybe Futebol Clube`, do curso de Desenvolvimento de Software da [Trybe](https://www.betrybe.com/).

## Habilidades

Nesse projeto:

- Realização da dockerização do app, network, volume e compose;
- Modelagem de dados com **MySQL** através do **Sequelize**;
- Criação e associação de tabelas usando models do sequelize;
- Construção de uma **API REST** com endpoints para consumir os models criados;
- Construção de um **CRUD** com **TypeScript**, utilizando **ORM**;

<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 3 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Deve rodar na porta `3001`;
 - A aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Garanta que o `express`;

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;
  - Você **deve** configurar as `Dockerfiles` corretamente nas raízes do `front-end` e `back-end`, para conseguir inicializar a aplicação;

</details>

# Orientações

<details>
<summary><strong> 🔰 Iniciando o projeto</strong></summary><br />

  1. Clone o repositório `Usar link SSH`

- Entre na pasta do repositório que você acabou de clonar:
  * `cd pasta-do-repositório`

  2. Instale as dependências [**Caso existam**]
  *`npm install`

</details>

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Use esse [link de referência para realizar a instalação corretamente no ubuntu](https://docs.docker.com/desktop/install/linux-install/);
  * Acesse o [link da documentação oficial com passos para desinstalar](https://docs.docker.com/compose/install/#uninstallation) caso necessário.

</details>

<details>
<summary><strong>🐳 Configuração Docker</strong></summary><br />

  ### Docker e Docker-compose

  ⚠ O docker-compose precisa estar na versão 1.29 ou superior.  ⚠
[Veja aqui a documentação para atualizar o docker-compose.](https://docs.docker.com/compose/install/)

- O arquivo `docker-compose.yml` pode ser utilizado para executar a aplicação na sua máquina local, para isso é necessário executar o comando `npm run compose:up` na raiz do projeto.
- Recomendo que prefira o usar o comando `npm run compose:up:dev` pois, diferente do comando anterior, este comando está configurado para compartilhar volumes com o _docker_ e também utiliza o _script_ que realiza o _live-reload_ ao fazer modificações no _back-end_. Somente quando instalar uma nova dependência ou alterar algum arquivo na raiz do backend, você deverá realizar o re-build do seu compose, pois o volume está mapeando somente alterações dentro da pasta `src` Você pode verificar essas configurações explorando o arquivo `docker-compose.dev.yml` e comparar com `docker-compose.yml`


</details>

## Desenvolvimento

<details id='Variaveis-de-ambiente'>
<summary><strong> ⚙️ Variáveis de ambiente </strong></summary><br />

  **No diretório `app/backend/` renomeie o arquivo `.env.example` para `.env` e configure os valores de acordo com o cenário do seu ambiente (credenciais de banco de dados, secrets desejadas e etc)**. Isso vai permitir que você inicialize a aplicação fora do _container_ e ela se conecte com seu banco local caso deseje.
 > `./app/backend/.env.example`
  ```txt
  JWT_SECRET=jwt_secret
  APP_PORT=3001
  DB_USER=seu_user
  DB_PASS=sua_senha
  DB_HOST=localhost
  DB_PORT=3306
  ```

</details>

<details id='Criptografia-de-senhas'>
<summary><strong>🔐 Criptografia de senhas </strong></summary><br />

⚠️ A biblioteca utilizada para criptografar a senha no banco de dados é a `bcryptjs` [bcryptjs npm](https://www.npmjs.com/package/bcryptjs) e que já vem instalada no projeto. ⚠️

</details>

<details id='sequelize'>
  <summary><strong>🎲 Sequelize</strong></summary>
  <br/>

  ![Exemplo banco de dados](assets/er-diagram.png)

  ⚠️ O `package.json` do diretório `app/backend` contém um script `db:reset` que é responsável por "dropar" o banco, recriar e executar as _migrations_ e _seeders_. Você pode executá-lo com o commando `npm run db:reset` se por algum motivo precisar recriar a base de dados;

  ⚠️ Quaisquer execução referente ao sequelize-cli deve ser realizada dentro do diretório `app/backend`. Certifique-se de que antes de rodar comandos do sequelize já exista uma versão compilada do back-end (diretório `app/build`), caso contrário basta executar `npm run build` para compilar. O sequelize só funcionará corretamente se o projeto estiver compilado.

  ⚠️ **O sequelize já foi inicializado, portanto NÃO é necessário executar o `sequelize init` novamente**

</details>


<details id='testes-de-cobertura'>
  <summary><strong> Testes de cobertura </strong></summary><br/>

  A construção de testes de cobertura no back-end foi feita em *TypeScript*, utilizando `mocha`, `chai` e `sinon`, na pasta `app/backend/src/tests/`.

</details>
