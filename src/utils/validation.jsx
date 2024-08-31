const isValidChildren = (vault) => {
  if (vault.type === "directory") {
    if (!Array.isArray(vault.children)) {
      return false;
    }
    for (const child of vault.children) {
      validateVault(child, false);
    }
    return true;
  }
  if (vault.type === "file") {
    if (typeof vault.children !== "string") {
      return false;
    }
    return true;
  }
  return true;
};

export const validateVault = (vault, isRoot = true) => {
  if (typeof vault !== "object" || vault === null || Array.isArray(vault)) {
    throw new Error("Root directory is not a valid object");
  }

  if (isRoot && Object.keys(vault).length === 0) {
    return false;
  }

  if (!("type" in vault && "name" in vault && "children" in vault)) {
    throw new Error(
      "Every object should contain 'type', 'name', and 'children' properties"
    );
  }

  if (isRoot && vault.name !== "Vault") {
    return false;
  }

  if (!isValidChildren(vault)) {
    throw new Error("One or more sub-vaults are invalid");
  }

  return true;
};
