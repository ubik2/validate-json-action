"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJsons = void 0;
const path_1 = __importDefault(require("path"));
const json_file_reader_1 = require("./json-file-reader");
const schema_validator_1 = require("./schema-validator");
const logger_1 = require("./logger");
const glob_1 = __importDefault(require("glob"));
const validateJsons = async (sourceDir, schemaRelativePath, jsonRelativePaths) => {
    const schemaPath = path_1.default.join(sourceDir, schemaRelativePath);
    try {
        const schema = await (0, json_file_reader_1.getJson)(schemaPath);
        const validatorFunc = await schema_validator_1.schemaValidator.prepareSchema(schema);
        (0, logger_1.prettyLog)(schemaPath);
        const jsonFilePaths = jsonRelativePaths.reduce((accumulator, currentValue) => accumulator.concat(glob_1.default.sync(path_1.default.posix.join(sourceDir, currentValue))), []);
        return await Promise.all(jsonFilePaths.map(async (filePath) => {
            try {
                const jsonData = await (0, json_file_reader_1.getJson)(filePath);
                const result = await schema_validator_1.schemaValidator.validate(jsonData, validatorFunc);
                (0, logger_1.prettyLog)(filePath);
                return { filePath, valid: result };
            }
            catch (e) {
                (0, logger_1.prettyLog)(filePath, e);
                return { filePath, valid: false };
            }
        }));
    }
    catch (err) {
        (0, logger_1.prettyLog)(schemaPath, err);
        return [{ filePath: schemaPath, valid: false }];
    }
};
exports.validateJsons = validateJsons;
