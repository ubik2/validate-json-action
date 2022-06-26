"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const configuration_1 = require("./configuration");
const json_validator_1 = require("./json-validator");
async function run() {
    try {
        const configuration = (0, configuration_1.getConfig)();
        const configurationErrors = (0, configuration_1.verifyConfigValues)(configuration);
        if (configurationErrors) {
            configurationErrors.forEach(e => core.error(e));
            core.setFailed('Missing configuration');
            return;
        }
        const jsonRelativePaths = configuration.JSONS.split(',');
        const validationResults = await (0, json_validator_1.validateJsons)(configuration.GITHUB_WORKSPACE, configuration.SCHEMA, jsonRelativePaths);
        const invalidJsons = validationResults.filter(res => !res.valid).map(res => res.filePath);
        core.setOutput('INVALID', invalidJsons.length > 0 ? invalidJsons.join(',') : '');
        if (invalidJsons.length > 0) {
            core.setFailed('Failed to validate all JSON files.');
        }
        else {
            core.info(`✅ All files were validated successfully.`);
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
run();
