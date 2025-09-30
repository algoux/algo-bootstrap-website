import shotOneMac from '@client/assets/images/shot/shot-1-mac.png';
import shotOneWin from '@client/assets/images/shot/shot-1-win.png';
import { GuideRPO } from '@common/modules/guide/guide.rpo';

export class DataConfig {
  static readonly GITHUB_REPO = 'https://github.com/algoux/algo-bootstrap';

  static readonly GITHUB_RELEASES_API = 'https://api.github.com/repos/Algobootstrap/algobootstrap/releases';

  static readonly GITHUB_RELEASES = 'https://github.com/algoux/algo-bootstrap/releases';

  static readonly DOCS_LINK = 'https://docs.of.ab.algoux.cn/?utm_source=algo-bootstrap';

  static readonly FAQ_LINK = 'https://github.com/algoux/algo-bootstrap/issues';

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

export class GuideConfig {
  platfrom!: string;
  constructor(p: string) {
    this.platfrom = p
  }

  macGuideConfig: GuideRPO[] = [
    { id: 1,  title: '喵喵喵喵喵', description: "喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵", guideURL: "#", imageURL: shotOneMac},
    { id: 2,  title: '喵喵喵喵喵', description: "喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵", guideURL: "#", imageURL: shotOneMac},
    { id: 3,  title: '喵喵喵喵喵', description: "喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵", guideURL: "#", imageURL: shotOneMac}
  ]

  winGuideConfig: GuideRPO[] = [
    { id: 1,  title: '喵喵喵喵喵', description: "喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵", guideURL: "#", imageURL: shotOneWin},
    { id: 2,  title: '喵喵喵喵喵', description: "喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵", guideURL: "#", imageURL: shotOneWin},
    { id: 3,  title: '喵喵喵喵喵', description: "喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵", guideURL: "#", imageURL: shotOneWin},
  ]

  get guideConfigGroups(): GuideRPO[] {
    console.log(this.platfrom);
    if (this.platfrom === 'windows') return this.winGuideConfig;
    else return this.macGuideConfig;
  }
}

export class ReleasesConfig {
  version!: string;
  constructor(version: string) {
    this.version = version;
  }

  public downloadSingleSystemLinks(platform: string): Array<string> {
    if (platform === 'windows') {
      return [
        `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-x64-${this.version}.exe`,
        `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-arm64-${this.version}.exe`,
      ];
    } else {
      return [
        `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-arm64-${this.version}.dmg`,
        `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-x64-${this.version}.dmg`,
      ];
    }
  }

  public downloadSingleSystemLink(platform: string, arch: string): string {
    if (platform === 'windows') {
      if (arch === 'x64') {
        return `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-x64-${this.version}.exe`;
      } else {
        return `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-arm64-${this.version}.exe`;
      }
    } else {
      if (arch === 'x64') {
        return `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-x64-${this.version}.dmg`;
      } else {
        return `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-arm64-${this.version}.dmg`;
      }
    }
  }

  public downloadAllSystemLink(): Array<string> {
    return [
      `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-x64-${this.version}.exe`,
      `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-windows-arm64-${this.version}.exe`,
      `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-arm64-${this.version}.dmg`,
      `https://cdn.algoux.cn/algo-bootstrap/release/${this.version}/AlgoBootstrap-mac-x64-${this.version}.dmg`,
    ];
  }

  public generateFileName(platform: string, arch: string, version: string): string {
    return `AlgoBootstrap-${platform}-${arch}-${version}.${platform === 'windows' ? 'exe' : 'dmg'}`;
  }
}
