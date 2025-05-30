# DCrypt v2.0.0

DCrypt is a secrets editor extension for VS Code that offers the flexibility of plaintext files with the added security of on-the-fly encryption using OpenPGP.

## Features

- Create a new file in your working directory with the extension `.pgp`.
- The editor may ask you a password to encrypt and decrypt the file contents.
- Type in your secrets (or literally any plaintext content) and the contents will be saved to the file, completely encrypted.
- You will be editing the text completely in-memory, no unencrypted data is written to the disk.
