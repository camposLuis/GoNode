# INSTALANDO ADONIS

- npm install -g @adonisjs/cli

# CRIANDO APLICAÇÃO

- adonis new <nome_projeto> --api-only

# START SERVER

- adonis serve --dev

# INSTALANDO E CONFIGURANDO ESLINT

- npm install -D eslint
- npx eslint --init

# INSTALANDO E CONFIGURANDO BANCO DE DADOS MYSQL

- npm i --save mysql
- Execute:
  docker run --name mysqlDb -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d -t mysql:8.0.15 --default-authentication-plugin=mysql_native_password
  mysql -uroot --protocol tcp--character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
- adonis migration:run
