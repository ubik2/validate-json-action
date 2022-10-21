import path from 'path';
import { getJson } from './json-file-reader';
import { schemaValidator } from './schema-validator';
import { prettyLog } from './logger';
import glob from 'glob';

export interface ValidationResult {
  filePath: string;
  valid: boolean;
}

export const validateJsonFiles = async (
  sourceDir: string,
  schemaRelativePath: string,
  jsonRelativePaths: string[],
): Promise<ValidationResult[]> => {
  const schemaPath = path.join(sourceDir, schemaRelativePath);
  try {
    const schema = await getJson(schemaPath);
    const validatorFunc = await schemaValidator.prepareSchema(schema);
    prettyLog(schemaPath);

    const jsonFilePaths = jsonRelativePaths.reduce(
      (accumulator, currentValue) =>
        accumulator.concat(glob.sync(path.posix.join(sourceDir, currentValue))),
      [] as string[],
    );
    return await Promise.all(
      jsonFilePaths.map(async (filePath) => {
        try {
          const jsonData = await getJson(filePath);
          const result = await schemaValidator.validate(jsonData, validatorFunc);
          prettyLog(filePath);
          return { filePath, valid: result };
        } catch (e) {
          prettyLog(filePath, e as Error);
          return { filePath, valid: false };
        }
      }),
    );
  } catch (err) {
    prettyLog(schemaPath, err as Error);
    return [{ filePath: schemaPath, valid: false }];
  }
};
