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

  // ARM64 检测
  if (/ARM|arm64|aarch64/i.test(userAgent)) {
    return 'arm64';
  }

  // x64 检测
  if (/x64|x86_64|AMD64|WOW64/i.test(userAgent)) {
    return 'x64';
  }

  // 通过平台信息补充检测
  const platform = navigator.platform;
  if (/arm|aarch64/i.test(platform)) {
    return 'arm64';
  }
  if (/x86_64|amd64/i.test(platform)) {
    return 'x64';
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
