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
   * Mac 默认 ARM64，Windows 基于 UA 判断
   */
  public getArchitectureFromUA(userAgent: string): 'x64' | 'arm64' | 'Unknown' {
    if (!userAgent) return 'Unknown';
    const ua = userAgent.toLowerCase();

    // === Mac 架构检测 ===
    if (ua.includes('mac') || ua.includes('darwin')) {
      // Mac 默认假设为 ARM64 (Apple Silicon)
      return 'arm64';
    }

    // === Windows 架构检测 ===
    if (ua.includes('windows') || ua.includes('win32') || ua.includes('win64')) {
      // ARM64 Windows 检测
      if (ua.includes('arm64') || ua.includes('aarch64')) {
        return 'arm64';
      }

      // x64 Windows 检测
      if (ua.includes('win64') || ua.includes('x64') || ua.includes('wow64') || ua.includes('amd64') || ua.includes('x86_64')) {
        return 'x64';
      }

      // Windows 默认假设为 x64
      return 'x64';
    }

    // === 通用架构检测 ===
    if (ua.includes('arm64') || ua.includes('aarch64')) {
      return 'arm64';
    }

    if (ua.includes('x64') || ua.includes('x86_64') || ua.includes('amd64')) {
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
