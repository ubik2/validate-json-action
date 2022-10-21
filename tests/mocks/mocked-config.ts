import * as path from 'path';
import { Config } from '../../src/configuration';

export class MockedConfig {
  private mockedConfig: Config;

  constructor() {
    this.mockedConfig = {
      GITHUB_WORKSPACE: path.join(__dirname, '..'),
      SCHEMA: '',
      JSON: '',
    };
  }

  public mockValue(key: string, value: string) {
    switch (key) {
      case 'GITHUB_WORKSPACE':
        this.mockedConfig.GITHUB_WORKSPACE = value;
        break;
      case 'SCHEMA':
        this.mockedConfig.SCHEMA = value;
        break;
      case 'JSON':
        this.mockedConfig.JSON = value;
        break;
    }
  }

  public set(): void {
    process.env['GITHUB_WORKSPACE'] = this.mockedConfig.GITHUB_WORKSPACE;
  }

  public resetAll(): void {
    this.mockedConfig.GITHUB_WORKSPACE = path.join(__dirname, '..');
    this.mockedConfig.SCHEMA = '';
    this.mockedConfig.JSON = '';
  }
}
