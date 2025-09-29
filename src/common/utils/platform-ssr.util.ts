/**
 * SSR 兼容的平台检测工具
 * 支持服务端和客户端环境
 */

export interface PlatformInfo {
  os: 'windows' | 'mac' | 'Unknown';
  architecture: 'x64' | 'arm64' | 'Unknown';
}

/**
 * 检测当前是否在浏览器环境中
 */
export function isBrowser(): boolean {
  return typeof globalThis !== 'undefined' &&
         typeof (globalThis as any).window !== 'undefined' &&
         typeof (globalThis as any).document !== 'undefined' &&
         typeof (globalThis as any).navigator !== 'undefined';
}

/**
 * 检测当前是否在服务端环境中
 */
export function isServer(): boolean {
  return !isBrowser();
}

/**
 * 从 User-Agent 字符串中检测操作系统
 */
export function getOperatingSystemFromUA(userAgent: string): 'windows' | 'mac' | 'Unknown' {
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
export function getArchitectureFromUA(userAgent: string): 'x64' | 'arm64' | 'Unknown' {
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

/**
 * 服务端平台检测 (基于 User-Agent)
 */
export function getPlatformInfoFromUA(userAgent: string): PlatformInfo {
  return {
    os: getOperatingSystemFromUA(userAgent),
    architecture: getArchitectureFromUA(userAgent)
  };
}

/**
 * 客户端增强型平台检测 (使用 WebGL 等 API)
 */
export function getClientPlatformInfo(): PlatformInfo {
  if (!isBrowser()) {
    return { os: 'Unknown', architecture: 'Unknown' };
  }

  const nav = (globalThis as any).navigator;
  const userAgent = nav.userAgent;
  const platform = nav.platform;

  // 操作系统检测
  let os: 'windows' | 'mac' | 'Unknown' = 'Unknown';
  if (/Mac|macOS/.test(platform) || /Macintosh/.test(userAgent)) {
    os = 'mac';
  } else if (/Win/.test(platform) || /Windows/.test(userAgent)) {
    os = 'windows';
  }

  // 架构检测 - 优先使用 WebGL (仅在 macOS 上)
  let architecture: 'x64' | 'arm64' | 'Unknown' = 'Unknown';

  if (os === 'mac') {
    try {
      const doc = (globalThis as any).document;
      const canvas = doc.createElement('canvas');
      const gl = canvas.getContext('webgl') as any;
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

          // Apple Silicon Macs 的 GPU 标识
          if (/Apple M\d|Apple GPU/i.test(renderer)) {
            architecture = 'arm64';
          } else if (/Intel|AMD Radeon|NVIDIA/i.test(renderer) && !/Apple/i.test(renderer)) {
            architecture = 'x64';
          }
        }
      }
    } catch (error) {
      // WebGL 检测失败，使用 fallback
    }
  }

  // 如果 WebGL 检测失败，使用 User-Agent fallback
  if (architecture === 'Unknown') {
    architecture = getArchitectureFromUA(userAgent);
  }

  return { os, architecture };
}

/**
 * 通用的平台检测函数 (SSR 兼容)
 * 在服务端需要传入 userAgent，在客户端会自动获取
 */
export function getPlatformInfo(userAgent?: string): PlatformInfo {
  if (isServer()) {
    if (!userAgent) {
      // 服务端环境但没有提供 userAgent
      return {
        os: 'Unknown',
        architecture: 'Unknown'
      };
    }
    return getPlatformInfoFromUA(userAgent);
  } else {
    // 客户端环境，使用增强型检测
    return getClientPlatformInfo();
  }
}

/**
 * SSR 兼容的操作系统检测
 */
export function getOperatingSystem(userAgent?: string): 'windows' | 'mac' | 'Unknown' {
  return getPlatformInfo(userAgent).os;
}

/**
 * SSR 兼容的架构检测
 */
export function getArchitecture(userAgent?: string): 'x64' | 'arm64' | 'Unknown' {
  return getPlatformInfo(userAgent).architecture;
}

/**
 * SSR 兼容的 macOS 检测
 */
export function isMac(userAgent?: string): boolean {
  return getOperatingSystem(userAgent) === 'mac';
}

/**
 * SSR 兼容的 Windows 检测
 */
export function isWindows(userAgent?: string): boolean {
  return getOperatingSystem(userAgent) === 'windows';
}

/**
 * SSR 兼容的 x64 检测
 */
export function isX64(userAgent?: string): boolean {
  return getArchitecture(userAgent) === 'x64';
}

/**
 * SSR 兼容的 ARM64 检测
 */
export function isARM64(userAgent?: string): boolean {
  return getArchitecture(userAgent) === 'arm64';
}

/**
 * 生成平台标识字符串
 */
export function getPlatformSignature(userAgent?: string): string {
  const info = getPlatformInfo(userAgent);
  return `${info.os}-${info.architecture}`;
}

// 默认导出
export default {
  getPlatformInfo,
  getOperatingSystem,
  getArchitecture,
  isMac,
  isWindows,
  isX64,
  isARM64,
  getPlatformSignature,
  isBrowser,
  isServer,
  getPlatformInfoFromUA,
  getClientPlatformInfo
};
