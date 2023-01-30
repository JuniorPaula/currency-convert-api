# Conversor de moedas

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Mongodb](https://img.shields.io/badge/mongodb-6DA55F?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

# Instruções do projeto

API foi **desenvolvida** utilizando uma arquitetura bem definida e tentando deixar ao máximo desacoplada, utilizando **TDD** como metodologia de trabalho e seguindo um pouco as boas práticas do **Clean Architecture** para fazer a distribuição das responsabilidades em camadas, e sempre que possível utilizando os princípios do **SOLID**.

## Tecnologias utilizadas 
A utilização das tecnologias foi pensada a fim de facilitar o desenvolvimento, tais como: **NodeJS** e **Typescript** como stack principal, **Express** para roteamento das rotas e subir o servidor, **Axios** para chamadas a endpoits externos, **Mongodb** para a persistência dos dados, **Husky**, **Eslint**, **Prettier**, **Linter-staged** para configuração de linter, **Jest** para rodar os teste de unidade e integração, e **Shelf/jest-mongodb** para facilitar os teste de integração com o banco mocado em memória, **Docker** para facilitar o desenvolvimento e deploy.  

## Alguns patterns utilizados
- Composite
- Adapter
- Factory
- Dependency Injection
- Single Responsibility

### Instruções para rodar o projeto

Os requisitos necessários são:

- Node >= 16
- npm >= 8
- Mongodb > 4
- docker >= 20
- docker-compose >= 1.29

Faça o clone do projeto e rode o comando `npm install` para instalar as dependências.

~~~javascript
npm install
~~~

Configurar as variáveis de ambiente criando um arquivo `.env` na raiz do projeto, e seguindo o exemplo do arquivo `.env.example`.

#### Rodar Docker
Subir o container  pra rodas as aplicações

~~~javascript
docker-composer up
~~~
ou
~~~javascript
npm run docker:up
~~~

#### Startar ambiente de desenvolvimento
Subir o servidor de desenvolvimento atravéz do comando `npm run dev`

~~~javascript
npm run dev
~~~

#### Build
~~~javascript
npm run build
~~~

### Startar o ambiente de produções

~~~javascript
npm start
~~~

## Testes

#### Rodar todos os testes

~~~javascript
npm test
~~~

#### Rodar testes de unidade

~~~javascript
npm run test:unit
~~~

#### Rodar testes covarage
Cobertura de teste 
~~~javascript
npm run test:ci
~~~

## Principais funcionalidades
- Conversão de moedas
- Listar transações por usuários

## Endpoints da aplicação

#### Rota de conversão de moedas
~~~javascript
[POST] /convert
~~~

## **Request body**
~~~javascript
{
	"userId": string,
	"originCurrency": string,
	"originAmount": number,
	"destinationCurrency": string
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
{
	"trasactionId": string,
	"userId": string,
	"originCurrency": string,
	"originAmount": number,
	"destinationCurrency": string,
	"destinationValue": number,
	"currencyTax": number,
	"timeConvert": string
}
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~

#### Rota de transações por usuários
~~~javascript
[GET] /transactions/${userId}
~~~

## **Request params**
~~~javascript
{
	"userId": string,
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
[
	{
		"userId": string,
		"originCurrency": string,
		"originAmount": number,
		"destinationCurrency": string,
		"currencyTax": number,
		"timeConvert": string
	}
]
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~