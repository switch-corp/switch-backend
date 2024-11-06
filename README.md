# Switch Backend

Este é o backend do projeto Switch, desenvolvido com o framework [NestJS](https://nestjs.com/).

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Bun](https://bun.sh/) (opcional)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (opcional, para rodar o MongoDB via Docker)

## Instalação

1. Clone o repositório:

    ```sh
    git clone https://github.com/seu-usuario/switch-backend.git
    cd switch-backend
    ```

2. Instale as dependências:

    ```sh
    npm install
    ```

    ou

    ```sh
    yarn install
    ```

## Configuração

1. Crie um arquivo [.env](http://_vscodecontentref_/1) na raiz do projeto e configure as variáveis de ambiente necessárias. Você pode usar o arquivo `.env.example` como referência.

2. (Opcional) Se você estiver usando Docker, inicie o MongoDB com o comando:

    ```sh
    docker-compose up -d
    ```

## Rodando o Projeto

### Ambiente Local

Para rodar o projeto local, utilize o comando:

```sh
npm run start:dev