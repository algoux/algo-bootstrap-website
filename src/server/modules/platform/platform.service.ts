import { Service, InjectCtx, RequestContext } from 'bwcx-ljsm';
import fetch from 'node-fetch';
import { GetReleasesDTO } from '@common/modules/releases/releases.dto';
import uap from 'ua-parser-js';

@Service()
export default class PlatformService {
  public constructor(
    @InjectCtx()
    private readonly ctx: RequestContext,
  ) {}
  /**
   * 从 User-Agent 字符串中检测操作系统
   */
  public getOperatingSystemFromUA(userAgent: string): 'windows' | 'mac' | 'Unknown' {
    const ua = uap.UAParser(userAgent);
    const osName = ua.os.name.toLowerCase() || '';
    if (osName.includes('mac')) {
      return 'mac';
    }

    if (osName.includes('windows')) {
      return 'windows';
    }

    return 'Unknown';
  }

  public async getReleases(): Promise<GetReleasesDTO | null> {
    try {
      const response = await fetch('https://cdn.algoux.cn/algo-bootstrap/version.json?t=' + Date.now());
      const data: GetReleasesDTO = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching releases:', error);
      return null;
    }
  }
}
