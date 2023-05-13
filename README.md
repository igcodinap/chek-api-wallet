# API-Wallet Service with JWT, Express, and TypeScript

This is a simple implementation of an API-Wallet service which allows users to create wallets and retrieve their balances. It is built using Express.js and TypeScript, and it uses JSON Web Tokens (JWT) for authentication.

## Features

- Wallet Creation
- Retrieving Wallet Balance
- JWT Authentication

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- NPM

### Installation

1. Clone the repo
```bash
git clone https://github.com/your-username/your-repo.git
```

2. Install NPM packages
```bash
npm install
```

3. Copy .env file.

4. Update the .env file with your own variables.

### Usage

To run this project in a development mode, use:

```bash
npm run start:dev
```

To build and run this project in a production mode, use:

```bash
npm run build
npm start
```

## Running the tests

You can run the tests using the following command:

```bash
npm run test
```

For test coverage, use:

```bash
npm run test:coverage
```

## Linting

This project uses ESLint and Prettier for linting. You can check for linting issues using:

```bash
npm run lint
```

## Formatting

This project uses Prettier for code formatting. You can format your code using:

```bash
npm run format
```

## Built With

- Node.js
- Express
- JWT
- TypeScript

## Project Structure

```
├── app.ts
├── auth
│   └── auth.middleware.ts
├── config
│   └── database.ts
├── errors
│   ├── AppError.test.ts
│   ├── AppError.ts
│   └── ErrorMiddleware.ts
├── services
│   ├── jwt.service.test.ts
│   └── jwt.service.ts
└── wallet
    ├── wallet.middleware.test.ts
    ├── wallet.middleware.ts
    ├── wallet.model.test.ts
    ├── wallet.model.ts
    ├── wallet.repository.test.ts
    ├── wallet.repository.ts
    ├── wallet.routes.ts
    ├── wallet.service.test.ts
    └── wallet.service.ts
```

## Authors

- Ignacio Codina - https://github.com/igcodinap
