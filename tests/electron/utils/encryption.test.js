const { encryptData, decryptData } = require("../../../electron/utils/encryption");

describe("Encryption and Decryption", () => {
  const password = "strongpassword123";
  const text = "Hello, this is a test!";

  test("encryptData should return a string with IV and ciphertext", () => {
    const encrypted = encryptData(text, password);
    expect(typeof encrypted).toBe("string");
    expect(encrypted.includes(":")).toBe(true);
  });

  test("decryptData should correctly decrypt encrypted text", () => {
    const encrypted = encryptData(text, password);
    const decrypted = decryptData(encrypted, password);
    expect(decrypted).toBe(text);
  });

  test("decryptData should throw error if password is incorrect", () => {
    const encrypted = encryptData(text, password);
    expect(() => decryptData(encrypted, "wrongpassword")).toThrow();
  });

  test("decryptData should throw error for invalid input", () => {
    expect(() => decryptData("invalidciphertext", password)).toThrow();
  });

  test("decryptData should throw error for missing IV", () => {
    const encrypted = encryptData(text, password);
    const corrupted = encrypted.split(":")[1];
    expect(() => decryptData(corrupted, password)).toThrow();
  });

  test("encryptData should generate different outputs for the same input", () => {
    const encrypted1 = encryptData(text, password);
    const encrypted2 = encryptData(text, password);
    expect(encrypted1).not.toBe(encrypted2);
  });
});
