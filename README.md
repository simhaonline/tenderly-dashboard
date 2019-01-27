# Tenderly Dashboard

## Development

This project is made using Create React App so most things you will be able to read inside their documentation.

### Setup

To install the project and get up and running you just need to run the following commands.

```
// Install all dependencies. It is important to not use npm and use yarn for depedency management.
yarn install

// This will start the server according to the .env file
yarn start
```

By default the `.env` file is setup to point to the local Tenderly project. If you wish to use other variables create a `.env.local` file which will override current variables from `.env`

```
// .env.local

REACT_APP_API_URL=https://custom.domain:1337
```

Read more on the [official doumentaion](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#what-other-env-files-can-be-used).

### Adding Dependencies

When adding dependencies it is important they are adding using `yarn` instead of `npm` as we use the `yarn.lock` file to manage dependency versions.

```
// Correct
yarn add my-package

// Wrong
npm i my-package --save
```
