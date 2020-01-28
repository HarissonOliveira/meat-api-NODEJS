# Exemplo de API em NodeJS

### Instalação

```sh
$ npm install
$ npm init -y
```

### Abra dois terminais e execute um comando em cada um dos terminais


```sh
$ npm start
```

No arquivo common/environment.ts o valor padrão da variável SERVER_PORT é 3001, você pode alterar esse valor conforme desejar



### Anotações Adicionais


### Os exemplos de teste foram feitos com JEST e SUPERTEST

```
$ npm i jest@22.4.2 ts-jest@22.0.4 typescript@2.6.2 supertest@3.0.0 @types/jest@22.1.2 @types/supertest@2.0.4 -D -E
$ npm i ts-node@5.0.1 jest-cli@22.4.2 -D -E
```

No arquivo package.json na linha abaixo de license tem a configuração do JEST e o script de test também foi reescrito


### Autenticação da API foi feita com JWT - Json Web Token

````
$ npm i jsonwebtoken
$ npm i @types/jsonwebtoken
```
