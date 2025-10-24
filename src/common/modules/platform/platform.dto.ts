import { GetReleasesDTO } from '../releases/releases.dto';

export class GetPlatformInfoDTO {
  os: 'windows' | 'mac' | 'Unknown';
  releases: GetReleasesDTO | null;
}

export class GetUserAgentDTO {
  userAgent: string;
}

export class GetOSDTO {
  os: 'windows' | 'mac' | 'Unknown';
}

export type GetArchitecture = 'x64' | 'arm64' | null;
