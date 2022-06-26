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
exports.verifyConfigValues = exports.getConfig = exports.configMapping = exports.ConfigKey = void 0;
const core = __importStar(require("@actions/core"));
var ConfigKey;
(function (ConfigKey) {
    ConfigKey["GITHUB_WORKSPACE"] = "GITHUB_WORKSPACE";
    ConfigKey["SCHEMA"] = "schema";
    ConfigKey["JSONS"] = "json";
})(ConfigKey = exports.ConfigKey || (exports.ConfigKey = {}));
exports.configMapping = [
    {
        key: ConfigKey.GITHUB_WORKSPACE,
        setup: 'ENV',
    },
    { key: ConfigKey.SCHEMA, setup: 'INPUT' },
    { key: ConfigKey.JSONS, setup: 'INPUT' },
];
function getConfig() {
    let config = {};
    exports.configMapping.forEach(i => {
        let value;
        switch (i.setup) {
            case 'ENV':
                value = process.env[ConfigKey[i.key]];
                break;
            case 'INPUT':
                value = core.getInput(ConfigKey[i.key]);
                break;
            default:
                value = '';
                break;
        }
        core.debug(`${ConfigKey[i.key]}: ${value}`);
        config[ConfigKey[i.key]] = value;
    });
    return config;
}
exports.getConfig = getConfig;
function verifyConfigValues(config) {
    let errors = [];
    Object.keys(config).forEach(key => {
        if (config[key] === '') {
            const mapping = exports.configMapping.find(i => i.key === key);
            errors.push(`🚨 Missing ${key} ${mapping.setup === 'ENV' ? 'environment variable' : mapping.setup.toLowerCase()}`);
        }
    });
    return errors.length > 0 ? errors : undefined;
}
exports.verifyConfigValues = verifyConfigValues;
