/**
 * 平台检测工具函数
 * 用于检测用户的操作系统、浏览器、设备类型等信息
 */

export interface PlatformInfo {
  os: string;
  osVersion?: string;
  browser: string;
  browserVersion?: string;
  device: 'desktop' | 'tablet' | 'mobile';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMac: boolean;
  isWindows: boolean;
  isLinux: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  userAgent: string;
}

/**
 * 获取操作系统信息
 */
export function getOperatingSystem(): { name: string; version?: string } {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  // macOS
  if (/Mac|macOS/.test(platform) || /Macintosh/.test(userAgent)) {
    const match = userAgent.match(/Mac OS X ([\d._]+)/);
    return {
      name: 'macOS',
      version: match ? match[1].replace(/_/g, '.') : undefined
    };
  }

  // Windows
  if (/Win/.test(platform) || /Windows/.test(userAgent)) {
    let version = 'Unknown';
    if (userAgent.includes('Windows NT 10.0')) version = '10/11';
    else if (userAgent.includes('Windows NT 6.3')) version = '8.1';
    else if (userAgent.includes('Windows NT 6.2')) version = '8';
    else if (userAgent.includes('Windows NT 6.1')) version = '7';
    
    return {
      name: 'Windows',
      version
    };
  }

  // Linux
  if (/Linux/.test(platform) || /X11/.test(userAgent)) {
    return {
      name: 'Linux',
      version: undefined
    };
  }

  // iOS
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    const match = userAgent.match(/OS ([\d_]+)/);
    return {
      name: 'iOS',
      version: match ? match[1].replace(/_/g, '.') : undefined
    };
  }

  // Android
  if (/Android/.test(userAgent)) {
    const match = userAgent.match(/Android ([\d.]+)/);
    return {
      name: 'Android',
      version: match ? match[1] : undefined
    };
  }

  return { name: 'Unknown' };
}

/**
 * 获取浏览器信息
 */
export function getBrowser(): { name: string; version?: string } {
  const userAgent = navigator.userAgent;

  // Chrome
  if (/Chrome\//.test(userAgent) && !/Edg\//.test(userAgent)) {
    const match = userAgent.match(/Chrome\/([\d.]+)/);
    return {
      name: 'Chrome',
      version: match ? match[1] : undefined
    };
  }

  // Edge
  if (/Edg\//.test(userAgent)) {
    const match = userAgent.match(/Edg\/([\d.]+)/);
    return {
      name: 'Edge',
      version: match ? match[1] : undefined
    };
  }

  // Firefox
  if (/Firefox\//.test(userAgent)) {
    const match = userAgent.match(/Firefox\/([\d.]+)/);
    return {
      name: 'Firefox',
      version: match ? match[1] : undefined
    };
  }

  // Safari
  if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) {
    const match = userAgent.match(/Version\/([\d.]+)/);
    return {
      name: 'Safari',
      version: match ? match[1] : undefined
    };
  }

  // Opera
  if (/OPR\//.test(userAgent)) {
    const match = userAgent.match(/OPR\/([\d.]+)/);
    return {
      name: 'Opera',
      version: match ? match[1] : undefined
    };
  }

  return { name: 'Unknown' };
}

/**
 * 检测设备类型
 */
export function getDeviceType(): 'desktop' | 'tablet' | 'mobile' {
  const userAgent = navigator.userAgent;

  // 移动设备
  if (/iPhone|iPod|Android.*Mobile/.test(userAgent)) {
    return 'mobile';
  }

  // 平板设备
  if (/iPad|Android(?!.*Mobile)/.test(userAgent)) {
    return 'tablet';
  }

  // 桌面设备
  return 'desktop';
}

/**
 * 检测是否为移动设备
 */
export function isMobileDevice(): boolean {
  return getDeviceType() === 'mobile';
}

/**
 * 检测是否为平板设备
 */
export function isTabletDevice(): boolean {
  return getDeviceType() === 'tablet';
}

/**
 * 检测是否为桌面设备
 */
export function isDesktopDevice(): boolean {
  return getDeviceType() === 'desktop';
}

/**
 * 检测是否为 Mac 系统
 */
export function isMac(): boolean {
  return getOperatingSystem().name === 'macOS';
}

/**
 * 检测是否为 Windows 系统
 */
export function isWindows(): boolean {
  return getOperatingSystem().name === 'Windows';
}

/**
 * 检测是否为 Linux 系统
 */
export function isLinux(): boolean {
  return getOperatingSystem().name === 'Linux';
}

/**
 * 检测是否为 iOS 系统
 */
export function isIOS(): boolean {
  return getOperatingSystem().name === 'iOS';
}

/**
 * 检测是否为 Android 系统
 */
export function isAndroid(): boolean {
  return getOperatingSystem().name === 'Android';
}

/**
 * 获取完整的平台信息
 */
export function getPlatformInfo(): PlatformInfo {
  const os = getOperatingSystem();
  const browser = getBrowser();
  const device = getDeviceType();

  return {
    os: os.name,
    osVersion: os.version,
    browser: browser.name,
    browserVersion: browser.version,
    device,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
    isMac: os.name === 'macOS',
    isWindows: os.name === 'Windows',
    isLinux: os.name === 'Linux',
    isIOS: os.name === 'iOS',
    isAndroid: os.name === 'Android',
    userAgent: navigator.userAgent
  };
}

/**
 * 检测是否支持触摸屏
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * 检测屏幕尺寸信息
 */
export function getScreenInfo() {
  return {
    width: window.screen.width,
    height: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    pixelRatio: window.devicePixelRatio || 1,
    orientation: window.screen.orientation?.type || 'unknown'
  };
}

/**
 * 检测网络连接信息（如果支持）
 */
export function getNetworkInfo() {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) {
    return null;
  }

  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData
  };
}

/**
 * 生成平台标识字符串（用于统计或日志）
 */
export function getPlatformSignature(): string {
  const info = getPlatformInfo();
  return `${info.os}/${info.browser}/${info.device}`;
}

// 默认导出主要的平台检测函数
export default {
  getPlatformInfo,
  getOperatingSystem,
  getBrowser,
  getDeviceType,
  isMobileDevice,
  isTabletDevice,
  isDesktopDevice,
  isMac,
  isWindows,
  isLinux,
  isIOS,
  isAndroid,
  isTouchDevice,
  getScreenInfo,
  getNetworkInfo,
  getPlatformSignature
};
