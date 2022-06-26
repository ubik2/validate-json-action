"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidJsonError = exports.InvalidSchemaError = exports.InvalidJsonFileError = void 0;
class InvalidJsonFileError extends Error {
    constructor(filePath, innerError) {
        super();
        this.innerError = innerError;
        this.filePath = filePath;
    }
}
exports.InvalidJsonFileError = InvalidJsonFileError;
class InvalidSchemaError extends Error {
    constructor(reason) {
        super();
        this.reason = reason;
    }
}
exports.InvalidSchemaError = InvalidSchemaError;
class InvalidJsonError extends Error {
    constructor(reason, enrichedError) {
        super();
        this.reason = reason;
        this.enrichedError = enrichedError;
    }
}
exports.InvalidJsonError = InvalidJsonError;
