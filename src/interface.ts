export class MissingEnvironment extends Error {
  constructor(message: string) {
    super(message);

    this.name = "MissingEnvironment";

    Object.setPrototypeOf(this, MissingEnvironment.prototype);
  }
}

export enum RequiredEnvironmentTypes {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  StringArray = "stringarray",
  NumberArray = "numberarray",
}

export interface RequiredEnvironment {
  name: string;
  type: RequiredEnvironmentTypes;
  delimiter?: string;
}
