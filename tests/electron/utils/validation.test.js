const { isValidPassword } = require("../../../electron/utils/validation");

describe("isValidPassword", () => {
  test("rejects passwords that are too short", () => {
    expect(isValidPassword("A1!")).toBe(false);
  });

  test("rejects passwords without uppercase letters", () => {
    expect(isValidPassword("lowercase1!")).toBe(false);
  });

  test("rejects passwords without lowercase letters", () => {
    expect(isValidPassword("UPPERCASE1!")).toBe(false);
  });

  test("rejects passwords without digits", () => {
    expect(isValidPassword("NoNumbers!")).toBe(false);
  });

  test("rejects passwords without special characters", () => {
    expect(isValidPassword("NoSpecial123")).toBe(false);
  });

  test("rejects passwords with spaces", () => {
    expect(isValidPassword("No Spaces1!")).toBe(false);
  });

  test("accepts strong passwords", () => {
    expect(isValidPassword("Valid123!")).toBe(true);
    expect(isValidPassword("Another@Password9")).toBe(true);
  });
});
