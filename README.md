[![Production CI](https://github.com/Hec7or-Uni/chess-backend/actions/workflows/production.yml/badge.svg)](https://github.com/Hec7or-Uni/chess-backend/actions/workflows/production.yml)

## Folder structure

- `app.ts`: This is the main file of your project, it could be the entry point of your application and where you will set up your server and routes.
- `database.ts`: This is the file that creates the connection to the database.
- ~~`config`~~:  This directory contains any configuration files, such as database connection settings, that the application needs to run.
- `api/controllers`: This directory contains the application's controllers, which are responsible for handling user input and updating the model and view accordingly.
- `api/models`: This directory contains the application's data models, which are responsible for handling data and business logic.
- `api/routes`: This directory contains the application's routing files, which map URLs to specific controllers and actions.
- ~~`api/views`~~: This directory contains the application's views, which are responsible for displaying data to the user.
- `api/middleware`: This folder stores intermediate functionalities that act as middelwares for filtering certain requests.
- `test`: this folder contains tests to check the correct operation of the application.

## Getting Started

Runs the developer server
```bash
npm run start
```

## Learn More

To learn more about Express.js, take a look at the following resources:

- [Express.js Documentation](https://expressjs.com/) - learn about Express.js features

You can check out [the Expressjs GitHub repository](https://github.com/expressjs/express)
