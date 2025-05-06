import { ReportsModule } from '../../modules/reports/index';
import { BaseConfig } from '../../modules/base';

export namespace Reports {
  export class API extends ReportsModule {
    constructor(config: BaseConfig) {
      super(config);
    }
  }
}
