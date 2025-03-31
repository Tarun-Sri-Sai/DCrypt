# DCrypt v1.0.5

DCrypt is a secrets editor extension for VS Code that offers the flexibility of plaintext files with the added security of on-the-fly encryption.

## Features

- Create a new file in your working directory with the extension `.dcrypt`.
- The editor will ask you a password to encrypt and decrypt the file contents.
- Type in your secrets (or literally any plaintext content) and the contents will be saved to the file, completely encrypted.
- The extension uses the AES-256-CBC symmetric encryption algorithm with a cryptographically random iv. This leaves no room for predictable patterns in the cipher.
