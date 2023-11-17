export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IData[];
}

export interface IData {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: array;
  species: array;
  starships: array;
  vehicles: array;
  url: string;
  created: string;
  edited: string;
}

interface IStoreCharactersList {
  results: IData[];
  count: number;
  searchValue: string;
  viewMode: number;
  loading: boolean;
  error: string | null;
}

interface IStoreCharacter {
  results: IData | null;
  loading: boolean;
  error: string | null;
}

interface IRequest {
  search: string;
  page: number;
}

interface AsyncThunkConfig {
  /** return type for `thunkApi.getState` */
  state?: unknown;
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
}
