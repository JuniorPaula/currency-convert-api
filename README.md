# Conversor de moedas

Voc� dever� implementar uma API Rest que seja capaz de realizar a convers�o entre duas moedas
utilizando taxas de convers�es atualizadas de um servi�o externo.

Para realiza��o da convers�o � necess�rio o ID do usu�rio que deseja realizar a convers�o.

A API dever� registrar cada transa��o de convers�o com todas as informa��es relacionadas e tamb�m
disponibilizar um endpoint para consulta das transa��es realizadas por um usu�rio.

O projeto dever� ser feito em Node.js com TypeScript.

1. Deve ser poss�vel realizar a convers�o entre 4 moedas no m�nimo (BRL, USD, EUR, JPY);
1. As taxas de convers�o devem ser obtidas de [https://api.exchangeratesapi.io/latest?base=USD];
1. As transa��es de convers�o devem ser persistidas no banco de dados (embedded) contendo:
    * ID do usu�rio;
    * Moeda origem;
    * Valor origem;
    * Moeda destino;
    * Taxa de convers�o utilizada;
    * Data/Hora UTC;
1. Uma transa��o com sucesso deve retornar:
    * ID da transa��o
    * ID do usu�rio;
    * Moeda origem;
    * Valor origem;
    * Moeda destino;
    * Valor destino;
    * Taxa de convers�o utilizada;
    * Data/Hora UTC;
1. Uma transa��o com falha conhecida deve retornar um erro HTTP 400 com a descri��o da falha;
1. Dever� existir um endpoint para listagem de todas as transa��es realizadas por usu�rio;
1. Deve haver uma cobertura satisfat�ria de testes;
1. Deve-se adicionar a esse arquivo explica��es sobre como rodar a aplica��o, e uma apresenta��o sobre o
projeto: prop�sito, features, motiva��o das principais escolhas de tecnologias, e separa��o das camadas;
1. Todo o c�digo deve ser em ingl�s;
1. Disponibilizar o c�digo apenas nesse reposit�rio, sem nenhuma c�pia p�blica, para evitar pl�gio;

## Itens desej�veis
* Logs
* Tratamento de exce��es
* Documenta��o
* Coes�o de commits
* Mensagens de commits claras
* Configura��o de lint
* Testes unit�rios
* Testes de integra��o
* Documenta��o dos endpoints
* Estar rodando e dispon�vel (Ex: Heroku, ou similar)
* CI/CD

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