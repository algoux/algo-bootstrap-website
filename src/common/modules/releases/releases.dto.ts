export class GetReleasesQueryDTO {
  releasesType: 'win32-x64' | 'darwin-x64' | 'darwin-arm64' | 'win32-arm64';
}
export class GetReleasesDTO {
  version: string;
  releaseDate: string;
  'win32-x64': string;
  'darwin-x64': string;
  'darwin-arm64': string;
  'win32-arm64': string;
}
