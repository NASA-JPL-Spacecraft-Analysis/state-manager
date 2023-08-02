import { Query, Resolver } from 'type-graphql';

import { Version } from '../models/version';

const VERSION = 'v8.0.1a G23.1';

@Resolver()
export class VersionResolver {
  @Query()
  public version(): Version {
    return { version: VERSION };
  }
}
