# Nest API

An authentication API built with Nest.

## Features

- Basic CRUD requests.
- Return JWT for authorization.

## Built with

- Nest
- Docker
- TypeORM
- TypeScript
- PostgresQL

## About

The objective of this project was to practice the use of a few tools, mainly Nest and JWT (Jason Web Token).

With it, I learned Nest architecture and the framework core fundamentals. And also how Nest built its controllers, modules and services and how each component communicates with each other.

By building an authentication API with authorization, I could practice how Nest handles it, using guards and strategies, and learn how JWT works.

Lastly, I also used Docker, docker-compose and Docker Hub to build an application that runs on different platforms with ease.

## Setup

### With Docker

The easier way to test this API locally is using Docker. For that, you need [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) (Linux) installed.

Create a docker-compose.yml file and paste the following:

```docker-compose.yml
services:
  nest_api:
    image: uauramenezes/nest-api
    env_file:
      - ./.env
    ports:
      - '3000:3000'
    depends_on:
      - pg_db
  pg_db:
    image: postgres
    volumes:
      - ./data/db:/var/lib/postgresql/data
    env_file:
      - ./.env
```

Create a .env file and paste these values (only for development):

```.env
# key=value
DB_PORT=5432
DB_HOST=pg_db
DB_TYPE=postgres
DB_NAME=database
DB_USER=username
DB_PASSWORD=password
SECRET_KEY=Secret_Key
POSTGRES_DB=database
POSTGRES_USER=username
POSTGRES_PASSWORD=password
```

Then, on the folder containing the two files, build and run docker-compose by running

```
docker-compose up
```

### Without Docker

To build this project locally without Docker you'll need [Node.js](https://nodejs.org/en/), [PostgreSQL](https://www.postgresql.org/download/), [Yarn](https://yarnpkg.com/getting-started/install) and the [Nest CLI](https://docs.nestjs.com/) installed. Then:

```sh
# clone this repository
git clone https://github.com/uauramenezes/nest-api.git

# navigate to the project folder
cd nest-api
```

Create a .env file and paste these keys, make sure the values are the same used in PostgreSQL:

```.env
# key=value
DB_PORT=5432
DB_USER=postgres
DB_TYPE=postgres
DB_NAME=postgres
DB_HOST=localhost
DB_PASSWORD=postgres
SECRET_KEY=Secret_key
```

Then install the dependencies and start the app:

```sh
yarn install
yarn start
```
