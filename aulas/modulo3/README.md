# Para inicializar o projeto executar dentro do diretório principal:

- yarn init -y

- yarn add express

- yarn add eslint -D

- yarn eslint --init

  - excluir o arquivo package-lock.json

  - executar yarn

- yarn add nodemon -D

# Criar um arquivo na raiz com o nome .editorconfig

          root = true
          [*]
          indent_style = space
          indent_size = 2
          charset = utf-8
          trim_trailing_whitespace = true
          insert_final_newline = true

# No arquivo package.json adicionar

          "scripts": {
              "start": "nodemon src/index.js"
            }

# criar um diretório src e criar os arquivos (modelo somente):

- index.js

        const server = require('./server')
        server.listen(process.env.PORT || 3000)

- routes.js

        const express = require('express')
        const routes = express.Router()
        module.exports = routes

- server.js

        const express = require('express')
        class App {
          constructor () {
            this.express = express()
            this.isDev = process.env.NODE_ENV !== 'production'
            this.middlewares()
            this.routes()
          }
          middlewares () {
            this.express.use(express.json())
          }
          routes () {
            this.express.use(require('./routes'))
          }
        }
        module.exports = new App().express

- yarn add mongoose (banco de dados)

- yarn add bcryptjs (criptografia de senha)

- yarn add jsonwebtoken (token de acesso - segurança)

- yarn add require-dir (facilita a importação dos controllers no arquivo routes.js)

- yarn add mongoose-paginate (paginação com mongoose)

- yarn add nodemailer (módulo para envio de email)

  - yarn add nodemailer-express-handlebars

  - yarn add express-handlebars

# Configuração de fila para envio de email

- instalando o banco redis

  - docker run --name noderedis -p 6379:6379 -d -t redis:alpine (versão minificada do redis)

  - yarn add kue

# Configurando validação

- yarn add joi (schema validator)

- yarn add express-validation (permite retornar o erro de validação em um json)

- yarn add youch (funciona como um formatador de erros)

- yarn add express-async-handler (Possibilita o envio dos erros que acontecem dentro das promises para o Exception Handle)
