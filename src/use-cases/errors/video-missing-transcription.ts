export class VideoMissingTranscription extends Error {
  constructor() {
    super("Video transcription was not generated yet.");
  }
}
