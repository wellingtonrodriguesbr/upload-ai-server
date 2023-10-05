export class FileNotFound extends Error {
  constructor() {
    super("File not found.");
  }
}
