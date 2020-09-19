export interface BaseActionType<Type, Payload = any> {
  type: Type;
  payload: Payload;
  meta?: any;
}

export function generateActionCreator<Type, Payload>(
  type: Type
): (payload: Payload) => BaseActionType<Type, Payload> {
  return function (payload: Payload) {
    return {
      type,
      payload,
    };
  };
}

export function generateSimpleActionCreator<Type>(
  type: Type
): () => BaseActionType<Type> {
  return function () {
    return {
      type,
      payload: {},
    };
  };
}

export const nop = generateActionCreator<"NOP_ACTION", any>("NOP_ACTION");
