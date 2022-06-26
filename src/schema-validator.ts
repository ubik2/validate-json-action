import Ajv, { AnySchemaObject, ValidateFunction } from 'ajv';
import { InvalidSchemaError, InvalidJsonError } from './errors';

class SchemaValidator {
    private schemaValidator: Ajv;

    constructor() {
        this.schemaValidator = new Ajv({
            allErrors: true,
            validateFormats: false,
            verbose: true,
            loadSchema: this.loadSchema,
        });
    }

    public instance(): Ajv {
        return this.schemaValidator;
    }

    public async prepareSchema(schema: object): Promise<ValidateFunction> {
        const isSchemaValid = this.schemaValidator.validateSchema(schema);
        if (!isSchemaValid) {
            const errors = this.schemaValidator.errorsText(this.schemaValidator.errors);
            throw new InvalidSchemaError(errors);
        }

        return await this.schemaValidator.compileAsync(schema);
    }

    public async validate(data: object, validator: ValidateFunction): Promise<boolean> {
        const valid = await validator(data);

        if (!valid) {
            const errors = this.schemaValidator.errorsText(validator.errors);
            throw new InvalidJsonError(errors);
        }

        return valid;
    }

    async loadSchema(uri: string): Promise<AnySchemaObject> {
        return Promise.resolve({} as AnySchemaObject);
    }
}

export const schemaValidator = new SchemaValidator();
