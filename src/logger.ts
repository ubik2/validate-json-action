import chalk from 'chalk';
import { InvalidSchemaError, InvalidJsonError, InvalidJsonFileError } from './errors';

export const prettyLog = (filePath: string, error?: Error): void => {
  const prettyFilePath = chalk.grey.bold.underline(filePath);
  const prettyMessagePrefix = error ? chalk.red.bold('✗') : chalk.green.bold('✓');
  let output = `${prettyMessagePrefix}${prettyFilePath}`;
  if (error instanceof InvalidSchemaError) {
    output = `${output}${error.reason}`;
  } else if (error instanceof InvalidJsonError) {
    output = `${output}${error.enrichedError || error.reason}`;
  } else if (error instanceof InvalidJsonFileError) {
    const reason =
      error.innerError instanceof Error
        ? `${error.innerError.name}${error.innerError.message}`
        : error.innerError || '';
    output = `${output}${reason}`;
  } else if (error instanceof Error) {
    output = `${output}${error.name} - ${error.message}\n${error.stack}`;
  }
  console.log(`${output}`);
};
