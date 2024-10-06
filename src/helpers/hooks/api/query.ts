import { keepPreviousData } from '@tanstack/react-query';

export type DefinedType = {} | null;

export type Loadable<TData extends DefinedType> =
  | {
      data: TData;
      loading: false;
      error: false;
      success: true;
    }
  | {
      data: undefined;
      loading: true;
      error: false;
      success: false;
    }
  | {
      data: undefined;
      loading: false;
      error: true;
      success: false;
    };

export type QueryOptions = {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  refetchInterval?: number;
  refetchOnMount?: boolean | 'always';
  placeholderData?: typeof keepPreviousData;
  retry?: number | boolean;
};

export type QueryResult<TData extends DefinedType> = {
  data: TData | undefined;
  isPending: boolean;
  isSuccess: boolean;
};

export const makeLoadable = <TData extends DefinedType = never>(
  data: TData,
): Loadable<TData> => ({
  data,
  loading: false,
  error: false,
  success: true,
});

export const makeLoadableLoading = <
  TData extends DefinedType = never,
>(): Loadable<TData> => ({
  data: undefined,
  loading: true,
  error: false,
  success: false,
});

export const makeLoadableError = <
  TData extends DefinedType = never,
>(): Loadable<TData> => ({
  data: undefined,
  loading: false,
  error: true,
  success: false,
});

export const mapLoadable =
  <TData extends DefinedType>(loadable: Loadable<TData>) =>
  <TMapped extends DefinedType>(
    map: (data: TData) => TMapped,
  ): Loadable<TMapped> => {
    if (loadable.success) {
      return makeLoadable(map(loadable.data));
    } else if (loadable.loading) {
      return makeLoadableLoading();
    } else {
      return makeLoadableError();
    }
  };

export function loadDataFromQuery<TData extends DefinedType>(
  query: QueryResult<TData>,
): Loadable<TData>;

export function loadDataFromQuery<
  TData extends DefinedType,
  TReturn extends DefinedType,
>(
  query: QueryResult<TData>,
  extractor: (data: TData) => TReturn,
): Loadable<TReturn>;

export function loadDataFromQuery<
  TData extends DefinedType,
  TMapped extends DefinedType,
>(
  query: QueryResult<TData>,
  extractor?: (data: TData) => TMapped,
): Loadable<TData> | Loadable<TMapped> {
  const { data, isPending, isSuccess } = query;
  if (isSuccess && data !== undefined) {
    return extractor ? makeLoadable(extractor(data)) : makeLoadable(data);
  } else if (isPending) {
    return extractor
      ? makeLoadableLoading<TMapped>()
      : makeLoadableLoading<TData>();
  } else {
    return extractor
      ? makeLoadableError<TMapped>()
      : makeLoadableError<TData>();
  }
}

export const onLoadable =
  <TData extends DefinedType>(loadable: Loadable<TData>) =>
  <TLoading, TError, TSuccess>(
    onLoading: () => TLoading,
    onError: () => TError,
    onSuccess: (data: TData) => TSuccess,
  ): TLoading | TError | TSuccess =>
    loadable.loading
      ? onLoading()
      : loadable.error
      ? onError()
      : onSuccess(loadable.data);