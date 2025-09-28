/**
 * 平台检测工具函数
 * 仅检测操作系统（Windows/macOS）和架构（x64/arm64）
 */

export interface PlatformInfo {
  os: 'windows' | 'mac' | 'Unknown';
  architecture: 'x64' | 'arm64' | 'Unknown';
}

/**
 * 检测操作系统
 */
export function getOperatingSystem(): 'windows' | 'mac' | 'Unknown' {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  // macOS
  if (/Mac|macOS/.test(platform) || /Macintosh/.test(userAgent)) {
    return 'mac';
  }

  // Windows
  if (/Win/.test(platform) || /Windows/.test(userAgent)) {
    return 'windows';
  }

  return 'Unknown';
}

/**
 * 检测架构
 */
export function getArchitecture(): 'x64' | 'arm64' | 'Unknown' {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  // 优先使用 WebGL 检测（对 macOS 最可靠）
  if (/Mac|macOS/.test(platform)) {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

          // Apple Silicon Macs 的 GPU 标识
          if (/Apple M\d|Apple GPU/i.test(renderer)) {
            return 'arm64';
          }

          // Intel Mac 的 GPU 标识
          if (/Intel|AMD Radeon|NVIDIA/i.test(renderer) && !/Apple/i.test(renderer)) {
            return 'x64';
          }
        }
      }
    } catch (error) {
      // WebGL 检测失败，继续使用其他方法
    }
  }

  // ARM64 检测 - 扩展模式匹配
  if (/ARM|arm64|aarch64/i.test(userAgent) || /arm64/i.test(platform)) {
    return 'arm64';
  }

  // x64 检测
  if (/x64|x86_64|AMD64|WOW64/i.test(userAgent)) {
    return 'x64';
  }

  // 针对 Intel Mac 的检测
  if (/x86_64|amd64/i.test(platform)) {
    return 'x64';
  }

  // macOS 启发式检测（fallback）
  if (/Mac|macOS/.test(platform)) {
    // Safari 版本和像素密度启发式检测
    const safariVersion = userAgent.match(/Version\/([\d.]+).*Safari/);
    if (safariVersion) {
      const version = parseFloat(safariVersion[1]);

      // Safari 14+ 和高像素密度更可能是 Apple Silicon
      if (version >= 14 && window.devicePixelRatio >= 2) {
        return 'arm64';
      }
    }
  }

  return 'Unknown';
}

/**
 * 检测是否为 macOS 系统
 */
export function isMac(): boolean {
  return getOperatingSystem() === 'mac';
}

/**
 * 检测是否为 Windows 系统
 */
export function isWindows(): boolean {
  return getOperatingSystem() === 'windows';
}

/**
 * 检测是否为 x64 架构
 */
export function isX64(): boolean {
  return getArchitecture() === 'x64';
}

/**
 * 检测是否为 ARM64 架构
 */
export function isARM64(): boolean {
  return getArchitecture() === 'arm64';
}

/**
 * 获取完整的平台信息
 */
export function getPlatformInfo(): PlatformInfo {
  return {
    os: getOperatingSystem(),
    architecture: getArchitecture()
  };
}

/**
 * 生成平台标识字符串
 */
export function getPlatformSignature(): string {
  const info = getPlatformInfo();
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
  getPlatformSignature
};
