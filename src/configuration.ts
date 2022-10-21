import * as core from '@actions/core';

export const configMapping = {
  GITHUB_WORKSPACE: 'ENV',
  SCHEMA: 'INPUT',
  JSON: 'INPUT',
};

export class Config {
  public GITHUB_WORKSPACE: string;
  public SCHEMA: string;
  public JSON: string;
  constructor() {
    this.GITHUB_WORKSPACE = '';
    this.SCHEMA = '';
    this.JSON = '';
  }
}

export function getConfig(): Config {
  const config: Config = new Config();
  config.GITHUB_WORKSPACE = <string>process.env['GITHUB_WORKSPACE'];
  config.SCHEMA = core.getInput('schema');
  config.JSON = core.getInput('json');
  core.debug(`GITHUB_WORKSPACE: ${config.GITHUB_WORKSPACE}`);
  core.debug(`SCHEMA: ${config.SCHEMA}`);
  core.debug(`JSON: ${config.JSON}`);
  return config;
}

export function verifyConfigValues(config: Config): string[] | undefined {
  const errors: string[] = [];
  if (config.GITHUB_WORKSPACE === '') {
    errors.push('🚨 Missing GITHUB_WORKSPACE environment variable');
  }
  if (config.SCHEMA === '') {
    errors.push('🚨 Missing schema input');
  }
  if (config.JSON === '') {
    errors.push('🚨 Missing json input');
  }
  return errors.length > 0 ? errors : undefined;
}
