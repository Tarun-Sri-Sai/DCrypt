class UserCanceledError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserCanceledError";
  }
}

class VaultReadError extends Error {
  constructor(message) {
    super(message);
    this.name = "VaultReadError";
  }
}

class VaultWriteError extends Error {
  constructor(message) {
    super(message);
    this.name = "VaultWriteError";
  }
}

class VaultDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "VaultDataError";
  }
}

module.exports = {
  UserCanceledError,
  VaultReadError,
  VaultWriteError,
  VaultDataError,
};
