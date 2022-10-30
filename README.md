# Validate Runtime

Check if environmental variables exist and verify if their types

## installation

```shell
pnpm install @boxpositron/vre

or

npm install @boxpositron/vre

or

yarn add @boxpositron/vre
```

## Usage

Call the validate package the moment your application starts up and has loaded its environment. If there are missing environmental variables, the application will exit whilst displaying the missing parameters.

### Typescript

```ts
import validate, { RequiredEnvironmentTypes } from "validate-runtime-environment";

// Ensure you saturate your environment before calling validate
// You can use the dotenv package
// import dotenv from "dotenv";
// dotenv.config()

validate(
  {
    name: "MONGODB_URI",
    type: RequiredEnvironmentTypes.String, // "string"
  },
  {
    name: "PORT",
    type: RequiredEnvironmentTypes.Number, // "number"
  }
);

```js
### Javascript

```ts
const validate = require("@boxpositron/vre").default;

// Ensure you saturate your environment before calling validate
// You can use the dotenv package
// import dotenv from "dotenv";
// dotenv.config()

validate(
  {
    name: "MONGODB_URI",
    type: "string",
  },
  {
    name: "PORT",
    type: "number",
  }
);
```
