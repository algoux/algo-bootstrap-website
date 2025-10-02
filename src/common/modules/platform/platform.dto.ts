import { GetReleasesDTO } from "../releases/releases.dto";

export class GetPlatformInfoDTO {
  os: 'windows' | 'mac' | 'Unknown';
  architecture: 'x64' | 'arm64' | 'Unknown';
  releases: GetReleasesDTO | null;
}

export class GetUserAgentDTO {
  userAgent: string;
}

export class GetOSDTO {
  os: 'windows' | 'mac' | 'Unknown';
}

export class GetArchitectureDTO {
  architecture: 'x64' | 'arm64' | 'Unknown';
}
