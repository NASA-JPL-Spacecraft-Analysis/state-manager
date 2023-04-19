import { Query, Resolver } from 'type-graphql';

import { Version } from '../models/version';

const VERSION = 'G23.1 V7.0.1';

@Resolver()
export class VersionResolver {
  @Query()
  public version(): Version {
    return { version: VERSION };
  }
}
