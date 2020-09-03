import {Models} from '@rematch/core';
import {loading} from '@app/core/models/loading.model';
import {internetConnection} from '@app/core/models/internet-connection.model';
import {isLoadedFromStorage} from '@app/core/models/is-loaded-from-storage.model';
import {auth} from '@auth/models/auth.model';

export interface RootModel extends Models<RootModel> {
  isLoadedFromStorage: typeof isLoadedFromStorage;
  loading: typeof loading;
  internetConnection: typeof internetConnection;
  auth: typeof auth;
}

export const models: RootModel = {
  isLoadedFromStorage,
  internetConnection,
  loading,
  auth,
};
