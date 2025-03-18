const hasValidContents = (data) => {
  if (data.type === "directory") {
    if (!Array.isArray(data.contents)) {
      return false;
    }
    for (const child of data.contents) {
      isValid(child, false);
    }
    return true;
  }
  if (data.type === "file") {
    if (typeof data.contents !== "string") {
      return false;
    }
    return true;
  }
  return false;
};

const isValid = (data, isRoot = true) => {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return false;
  }

  if (isRoot && Object.keys(data).length === 0) {
    return false;
  }

  if (!("type" in data && "name" in data && "contents" in data)) {
    return false;
  }

  if (isRoot && data.name !== "My Vault") {
    return false;
  }

  if (!hasValidContents(data)) {
    return false;
  }

  return true;
};

const fileSystemComparator = (a, b) => {
  if (a.type === "directory" && b.type === "directory") {
    return a.name.localeCompare(b.name);
  }
  if (a.type === "directory") {
    return -1;
  }
  if (b.type === "directory") {
    return 1;
  }
  return a.name.localeCompare(b.name);
};

const sortRecursively = (data) => {
  if (Array.isArray(data)) {
    return data.map(sortRecursively).sort(fileSystemComparator);
  } else if (typeof data === "object" && data !== null) {
    for (const key in data) {
      data[key] = sortRecursively(data[key]);
    }
  }
  return data;
};

const isValidPassword = (password) => {
  const MIN_PASSWORD_LENGTH = 8;

  return !password.includes(" ") && password.length > MIN_PASSWORD_LENGTH;
};

module.exports = { isValid, sortRecursively, isValidPassword };
