import { MIN_ITEM_NAME_LENGTH } from "./constants";

export const isValidName = (name) => {
  return (
    name.trim().length === name.length &&
    name.length > 0 &&
    name.length <= MIN_ITEM_NAME_LENGTH &&
    /^[a-zA-Z0-9._-\s]+$/.test(name)
  );
};
