import { Service, InjectCtx, RequestContext } from 'bwcx-ljsm';
import fetch from 'node-fetch';
import { GetReleasesDTO } from '@common/modules/releases/releases.dto';

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
    const ua = userAgent.toLowerCase();

    // macOS
    if (ua.includes('mac') || ua.includes('darwin')) {
      return 'mac';
    }

    // Windows
    if (ua.includes('windows') || ua.includes('win32') || ua.includes('win64')) {
      return 'windows';
    }

    return 'Unknown';
  }

  /**
   * 从 User-Agent 字符串中检测架构
   */
  public getArchitectureFromUA(userAgent: string): 'x64' | 'arm64' | 'Unknown' {
    const ua = userAgent.toLowerCase();

    // ARM64 检测
    if (ua.includes('arm64') || ua.includes('aarch64')) {
      return 'arm64';
    }

    // Apple Silicon Mac 检测 (基于 Safari 版本和特征)
    if (ua.includes('mac') && ua.includes('safari')) {
      // Safari 14.0+ 更可能是 Apple Silicon (启发式)
      const safariMatch = ua.match(/version\/([\d.]+).*safari/);
      if (safariMatch) {
        const version = parseFloat(safariMatch[1]);
        if (version >= 14.0) {
          // 进一步检查是否有 Apple Silicon 的迹象
          if (ua.includes('applewebkit/605.1.15') || ua.includes('version/14')) {
            return 'arm64';
          }
        }
      }
    }

    // x64 检测
    if (ua.includes('x64') || ua.includes('x86_64') || ua.includes('amd64') || ua.includes('wow64')) {
      return 'x64';
    }

    // 默认假设 x64 (大多数桌面系统)
    if (ua.includes('windows') || ua.includes('mac')) {
      return 'x64';
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
