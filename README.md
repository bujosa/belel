# Belel

This is a simple project, related with hardhat express and ethereum.
We are using hardhat to compile and deploy the smart contracts, and express to create a simple api to interact with the smart contracts.

The main objective of this project is to create a simple api to interact with the smart contracts, and check the events and transactions.

## Technologies

- [Hardhat](https://hardhat.org/)
- [Ethers v6](https://docs.ethers.org/v6/getting-started/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development express
$ npm run dev
```

## Compile contracts

```bash
# compile
$ npx hardhat compile
```

## Init the local network

```bash
# init
$ npx hardhat node
```

## Deploy contracts

```bash
# deploy
$ npx hardhat run scripts/deploy.ts --network localhost
```
