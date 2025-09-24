export class DataConfig {
  static readonly GITHUB_REPO = 'https://github.com/algoux/algo-bootstrap';

  static readonly GITHUB_RELEASES_API = 'https://api.github.com/repos/Algobootstrap/algobootstrap/releases';

  static readonly GITHUB_RELEASES = 'https://github.com/Algobootstrap/algobootstrap/releases';

  static readonly DOCS_LINK = '';

  static readonly FAQ_LINK = '';

  static readonly SDUTACM_LINK = 'https://acm.sdut.edu.cn/';

  static readonly OJ_LINK = 'https://oj.sdutacm.cn/onlinejudge3/';

  static readonly BILIBILI_LINK = 'https://space.bilibili.com/1479542015';

  static readonly OLD_WEBSITE_LINK = 'https://ab.algoux.org/';

  static readonly VSCODE_LINK = 'https://code.visualstudio.com/';

  static readonly BLUE_GITHUB_LINK = 'https://github.com/dreamerblue';

  static readonly ATRIOR_GITHUB_LINK = 'https://github.com/ATRIOR-LCL';

  static readonly ALGOUX_LINK = 'https://algoux.org/';

  static readonly PASTE_THEN_AC_LINK = 'https://paste.then.ac/';

  static readonly RANKLAND_LINK = 'https://rl.algoux.org/';
}

export class ReleasesConfig {
  version!: string;
  constructor(version: string) {
    this.version = version;
  }

  public downloadSingleSystemLinks(platform: string): Array<string> {
    if (platform === 'windows') {
      return [
        `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-${this.version}-x64.exe`,
        `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-${this.version}-arm64.exe`,
      ];
    } else {
      return [
        `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-${this.version}.arm64.dmg`,
        `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-${this.version}.x64.dmg`,
      ];
    }
  }

  public downloadSingleSystemLink(platform: string, arch: string): string {
    if (platform === 'windows') {
      if (arch === 'x64') {
        return `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-${this.version}-x64.exe`;
      } else {
        return `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-${this.version}-arm64.exe`;
      }
    } else {
      if (arch === 'x64') {
        return `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-${this.version}.x64.dmg`;
      } else {
        return `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-${this.version}.arm64.dmg`;
      }
    }
  }

  public downloadAllSystemLink(): Array<string> {
    return [
      `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-${this.version}-x64.exe`,
      `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-${this.version}-arm64.exe`,
      `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-${this.version}.arm64.dmg`,
      `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-${this.version}.x64.dmg`,
    ];
  }
}
