const fs = require("fs");
const path = require("path");
const os = require("os");
const { Vault } = require("../../electron/vault");
const { VaultDataError, VaultReadError, VaultWriteError } = require("../../electron/utils/errors");
const { VAULT_DIRECTORY } = require("../../electron/utils/constants");

describe("Vault", () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "vault-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  test("should throw error for weak password", () => {
    expect(() => new Vault(tempDir, "weak"))
      .toThrow(VaultDataError);
  });

  test("should throw error for invalid directory", () => {
    expect(() => new Vault("/invalid/directory", "StrongPass123!"))
      .toThrow(VaultDataError);
  });

  test("should write and read data correctly", () => {
    const vault = new Vault(tempDir, "StrongPass123!");
    const testData = { key: "value" };
    const filePath = ["test.json"];

    vault.write(filePath, testData);
    const result = vault.read(filePath);
    
    expect(result).toEqual([
      { name: "test.json", isDirectory: false, contents: testData }
    ]);
  });

  test("should list directory contents", () => {
    const vault = new Vault(tempDir, "StrongPass123!");
    vault.write(["file1.json"], { data: 1 });
    vault.write(["file2.json"], { data: 2 });

    const contents = vault.read([]);
    expect(contents).toEqual(expect.arrayContaining(["file1.json", "file2.json"]));
  });

  test("should throw error when reading non-existent file", () => {
    const vault = new Vault(tempDir, "StrongPass123!");
    expect(() => vault.read(["nonexistent.json"])).toThrow(VaultReadError);
  });

  test("should throw error when writing to an invalid path", () => {
    const vault = new Vault(tempDir, "StrongPass123!");
    const invalidPath = ["invalid", "test.json"];
    const parentPath = path.join(tempDir, VAULT_DIRECTORY);
    fs.mkdirSync(parentPath, { recursive: true });
    fs.writeFileSync(path.join(parentPath, "invalid"), "not a directory");
    expect(() => vault.write(invalidPath, { key: "value" })).toThrow(VaultWriteError);
  });
});
