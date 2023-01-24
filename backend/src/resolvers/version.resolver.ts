import { Query, Resolver } from 'type-graphql';

import { Version } from '../models/version';

const VERSION = 'V7.0 G23.0';

@Resolver()
export class VersionResolver {

    @Query()
    public version(): Version {
      return { version: VERSION };
    }
}
