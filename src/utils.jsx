import { ITEM_NAME_LIMIT, MIN_PASSWORD_LIMIT } from "./constants";

const isValidContents = (item) => {
  if (item.type === "directory") {
    if (!Array.isArray(item.contents)) {
      return false;
    }
    for (const child of item.contents) {
      isValidItem(child, false);
    }
    return true;
  }
  if (item.type === "file") {
    if (typeof item.contents !== "string") {
      return false;
    }
    return true;
  }
  return false;
};

export const isValidItem = (item, isRoot = true) => {
  if (typeof item !== "object" || item === null || Array.isArray(item)) {
    throw new Error("Item is not a valid object");
  }

  if (isRoot && Object.keys(item).length === 0) {
    return false;
  }

  if (!("type" in item && "name" in item && "contents" in item)) {
    throw new Error(
      "Every object should contain 'type', 'name', and 'contents' properties"
    );
  }

  if (isRoot && item.name !== "root") {
    return false;
  }

  if (!isValidContents(item)) {
    throw new Error(`One or more items are invalid. ${JSON.stringify(item)}`);
  }

  return true;
};

export const isValidName = (name) => {
  return (
    name.trim().length === name.length &&
    name.length > 0 &&
    name.length <= ITEM_NAME_LIMIT &&
    /^[a-zA-Z0-9._-\s]+$/.test(name)
  );
};

export const isValidPassword = (password) => {
  return !password.includes(" ") && password.length > MIN_PASSWORD_LIMIT;
};
