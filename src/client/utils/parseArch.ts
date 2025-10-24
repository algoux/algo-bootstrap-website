import type { GetArchitecture } from '@common/modules/platform/platform.dto';

export function parseArch(arch: string | undefined): GetArchitecture {
  if (arch === 'x86_64' || arch === 'x64' || arch === 'amd64' || arch === 'amd') {
    return 'x64';
  } else if (arch === 'arm64' || arch === 'arm') {
    return 'arm64';
  }
  return undefined;
}
