export class GetReleasesQueryDTO {
  releasesType: 'win32-x64' | 'darwin-x64' | 'darwin-arm64' | 'win32-arm64';
}
export class GetReleasesDTO {
  version: string;
  url: string;
  releaseDate: string;
  releasesInfo: Record<GetReleasesQueryDTO['releasesType'], { url: string; md5: string }>;
}
