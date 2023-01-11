////////////////////////////////////////////////////////////////////////////
//
// Copyright 2021 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

import { createContext } from "react";
import Realm from "realm";
import { createUseRealm } from "./useRealm";
import { createUseQuery } from "./useQuery";
import { createUseObject } from "./useObject";
import { createRealmProvider, RealmProvider } from "./RealmProvider";

/**
 * Returns a {@link Realm.Collection} of {@link Realm.Object}s from a given type.
 * The hook will update on any changes to any object in the collection
 * and return an empty array if the colleciton is empty.
 *
 * The result of this can be consumed directly by the `data` argument of any React Native
 * VirtualizedList or FlatList.  If the component used for the list's `renderItem` prop is {@link React.Memo}ized,
 * then only the modified object will re-render.
 *
 * @example
 * ```
 * const collection = useQuery(Object);
 *
 * // The methods `sorted` and `filtered` should be wrapped in a useMemo.
 * const sortedCollection = useMemo(collection.sorted(), [collection]);
 * ```
 *
 * @param type - The object type, depicted by a string or a class extending {@link Realm.Object}
 * @returns a collection of realm objects or an empty array
 *
 *  @Category Hooks
 */
export type useQuery = ReturnType<typeof createUseQuery>;

/**
 * Returns a {@link Realm.Object} from a given type and primary key.
 * The hook will update on any changes to the properties on the returned object
 * and return null if it either doesn't exist or has been deleted.
 *
 * @example
 * ```
 * const object = useObject(ObjectClass, objectId);
 * ```
 *
 * @param type - The object type, depicted by a string or a class extending {@link Realm.Object}
 * @param primaryKey - The primary key of the desired object which will be retrieved using {@link Realm.objectForPrimaryKey}
 * @returns either the desired {@link Realm.Object} or `null` in the case of it being deleted or not existing.
 */
export type useObject = ReturnType<typeof createUseObject>;

/**
 * Returns the instance of the {@link Realm} configured by `createRealmContext`
 *
 * @example
 * ```
 * const realm = useRealm();
 * ```
 *
 * @returns {Realm} a realm instance
 *
 * @Category Hooks
 */
export type useRealm = ReturnType<typeof createUseRealm>;

export type RealmContext = {
  RealmProvider: RealmProvider;
  useQuery: useQuery;
  useObject: useObject;
  useRealm: useRealm;
};

/**
 * Creates Realm React hooks and Provider component for a given Realm configuration
 *
 * @example
 * ```
 *class Task extends Realm.Object {
 *  ...
 *
 *  static schema = {
 *    name: 'Task',
 *    primaryKey: '_id',
 *    properties: {
 *      ...
 *    },
 *  };
 *}
 *
 *const {userRealm, useQuery, useObject, RealmProvider} = createRealmContext({schema: [Task]});
 * ```
 *
 * @param realmConfig - {@link Realm.Configuration} used to open the Realm
 * @returns {RealmContext} - An object containing a {@link RealmProvider} component
 * and {@link useRealm}, {@link useQuery} and {@link useObject} hooks.
 */
export const createRealmContext: (realmConfig?: Realm.Configuration) => RealmContext = (
  realmConfig: Realm.Configuration = {},
) => {
  const RealmContext = createContext<Realm | null>(null);
  const RealmProvider = createRealmProvider(realmConfig, RealmContext);

  const useRealm = createUseRealm(RealmContext);
  const useQuery = createUseQuery(useRealm);
  const useObject = createUseObject(useRealm);

  return {
    RealmProvider,
    useRealm,
    useQuery,
    useObject,
  };
};

export { Realm };
export { RealmProvider } from "./RealmProvider";
export * from "./AppProvider";
export * from "./UserProvider";
