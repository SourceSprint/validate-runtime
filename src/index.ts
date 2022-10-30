import {
  MissingEnvironment,
  RequiredEnvironment,
  RequiredEnvironmentTypes,
} from "./interface";

export * from "./interface";

export default (parameters: RequiredEnvironment[]) => {
  const errors: string[] = [];

  for (let parameter of parameters) {
    const value: any = process.env[parameter.name];

    if (!value) {
      errors.push(`Missing ${parameter.name}`);
      continue;
    }

    switch (parameter.type) {
      case RequiredEnvironmentTypes.String: {
        if (typeof value === "string") {
          continue;
        }

        break;
      }

      case RequiredEnvironmentTypes.Number: {
        if (typeof value === "number" || !isNaN(value)) {
          continue;
        }

        break;
      }

      case RequiredEnvironmentTypes.Boolean: {
        if (typeof value === "boolean") {
          continue;
        }

        break;
      }

      case RequiredEnvironmentTypes.StringArray: {
        if (typeof value === "string") {
          if (!parameter.delimiter) {
            errors.push(`Missing delimiter for ${parameter.name}`);
            continue;
          }

          const values = value.split(parameter.delimiter);
          // At this point everything should be a string but we check either way

          const invalidValues = values
            .filter((item) => typeof item !== "string")
            .map((item) => `Expected ${item} to be string got ${typeof item}`)
            .join("\n");

          errors.push(invalidValues);
          continue;
        }

        break;
      }

      case RequiredEnvironmentTypes.NumberArray: {
        if (typeof value === "string") {
          if (!parameter.delimiter) {
            errors.push(`Missing delimiter for ${parameter.name}`);
            continue;
          }

          const values: any[] = value.split(parameter.delimiter);

          const invalidValues = values
            .filter((item) => typeof item !== "number" && isNaN(item))
            .map((item) => `Expected ${item} to be number got ${typeof item}`)
            .join("\n");

          errors.push(invalidValues);
          continue;
        }

        break;
      }
    }

    errors.push(
      `Parameter mismatch | Expected ${parameter.type} got ${typeof value}`
    );
  }

  const safeerrors = errors.filter((item) => item.length > 0);

  if (safeerrors.length > 0) {
    const message = safeerrors.join("\n");

    throw new MissingEnvironment(message);
  }
};
