import { TCallbackHandler, TlistnerType } from "./types";

export const registerListner = (
  event: string,
  cb: TCallbackHandler,
  listners: TlistnerType
) => {
  if (listners[event]) {
    listners[event].push(cb);
  } else {
    listners[event] = [cb];
  }
};
