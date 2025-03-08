const {
  encryptData,
  decryptData,
} = require("../../../electron/utils/encryption");

describe("encryptData", () => {
  const password = "strongpassword123";
  const text = "Hello, this is a test!";

  test("should return a string with IV and ciphertext", () => {
    const encrypted = encryptData(text, password);
    expect(typeof encrypted).toBe("string");
    expect(encrypted.includes(":")).toBe(true);
  });

  test("should generate different outputs for the same input", () => {
    const encrypted1 = encryptData(text, password);
    const encrypted2 = encryptData(text, password);
    expect(encrypted1).not.toBe(encrypted2);
  });
});

describe("decryptData", () => {
  const password = "strongpassword123";
  const text = "Hello, this is a test!";

  test("should correctly decrypt encrypted text", () => {
    const encrypted = encryptData(text, password);
    const decrypted = decryptData(encrypted, password);
    expect(decrypted).toBe(text);
  });

  test("should throw error if password is incorrect", () => {
    const encrypted = encryptData(text, password);
    expect(() => decryptData(encrypted, "wrongpassword")).toThrow();
  });

  test("should throw error for invalid input", () => {
    expect(() => decryptData("invalidciphertext", password)).toThrow();
  });

  test("should throw error for missing IV", () => {
    const encrypted = encryptData(text, password);
    const corrupted = encrypted.split(":")[1];
    expect(() => decryptData(corrupted, password)).toThrow();
  });
});
