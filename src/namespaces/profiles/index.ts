import { ProfilesModule } from '../../modules/profiles';
import { BaseConfig } from '../../modules/base';

export namespace Profiles {
  export interface Config extends BaseConfig {}

  export class API extends ProfilesModule {
    constructor(config: Config) {
      super(config);
    }
  }
}
