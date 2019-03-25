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
- adonis migration:run (executar a migration)
- adonis migration:rollback (desfazer a migration)

# Criando controller

- adonis make:controller <nome_controller>
- adonis route:list (listar rotas)

# Instalando adonis mail

- adonis install @adonisjs/mail

# Criando model

- adonis make:model <nome_model> -m -c
  - (-m: cria a migration / -c: cria o controller)

# Instalando adonis validator

- adonis install @adonisjs/validator

# Criando arquivo validator

- adonis make:validator <nome_model>
