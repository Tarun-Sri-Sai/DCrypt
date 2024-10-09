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
    return false;
  }

  if (isRoot && Object.keys(item).length === 0) {
    return false;
  }

  if (!("type" in item && "name" in item && "contents" in item)) {
    return false;
  }

  if (isRoot && item.name !== "My Vault") {
    return false;
  }

  if (!isValidContents(item)) {
    return false;
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

export const fileSystemComparator = (a, b) => {
  const typeComparison =
    a.type === "directory" ? -1 : a.type === b.type ? 0 : 1;
  if (typeComparison !== 0) {
    return typeComparison;
  }
  return a.name.localeCompare(b.name);
};

export const sortRecursively = (vault) => {
  if (Array.isArray(vault)) {
    return vault.map(sortRecursively).sort(fileSystemComparator);
  } else if (typeof vault === "object" && vault !== null) {
    for (const key in vault) {
      vault[key] = sortRecursively(vault[key]);
    }
  }
  return vault;
};
