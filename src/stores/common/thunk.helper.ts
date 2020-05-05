export function resolveWith(meta: any, action: any): any {
  return {
    ...action,
    meta,
  };
}

export function rejectWith(meta: any, action: any): any {
  return {
    ...action,
    error: true,
    meta,
  };
}

export function asThunk<T>(func: (payload: T) => any) {
  return function (payload: T) {
    return {
      ...func(payload),
      meta: {
        thunk: true,
      },
    };
  };
}
