# express-template [![Production CI](https://github.com/hec7orci7o/express-template/actions/workflows/production.yml/badge.svg)](https://github.com/hec7orci7o/express-template/actions/workflows/production.yml)

![Beta](https://img.shields.io/badge/Status-Beta-red)
![node](https://img.shields.io/badge/node-20.x-blue)
![npm](https://img.shields.io/badge/npm-9.8.1-blue)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)

## Folder structure

- `app.ts`: This is the main file of your project, it could be the entry point of your application and where you will set up your server.
- `test`: this folder contains tests to check the correct operation of the application.
- `api/controllers`: This directory contains the application's controllers, which are responsible for handling user input and updating the model and view accordingly.
- `api/middleware`: This folder stores intermediate functionalities that act as middelwares for filtering certain requests.
- `api/models`: This directory contains the application's data models, which are responsible for handling data and business logic.
- `api/routes`: This directory contains the application's routing files, which map URLs to specific controllers and actions.

## Getting Started

### Run for a development environment

```bash
npm run ci
npm run dev
```

### Run for a production environment

#### Command Line

> **Note**
> this version requires to have port `3000` open on the router.

```bash
npm run ci
npm run build
npm run start
```

#### Docker

Build Docker image:

```bash
docker build -t express-template:latest .
```

Run the container:

```bash
docker run -p 3000:3000 --env-file .env express-template:latest
```

## Learn More

To learn more about Express.js, take a look at the following resources:

- [Express.js Documentation](https://expressjs.com/) - learn about Express.js features

You can check out [the Expressjs GitHub repository](https://github.com/expressjs/express)
