import { Controller, InjectCtx, RequestContext, Get, UserAgent } from 'bwcx-ljsm';
import { Inject } from 'bwcx-core';
import { ApiController } from '@server/decorators';
import { Contract } from 'bwcx-ljsm';
import PlatformService from './platform.service';
import { Api } from 'bwcx-api';
import { GetPlatformInfoDTO, GetOSDTO, GetUserAgentDTO } from '@common/modules/platform/platform.dto';

@ApiController()
export default class PlatformController {
  public constructor(
    @InjectCtx()
    private readonly ctx: RequestContext,
    @Inject()
    private readonly platformService: PlatformService,
  ) {}

  /** routes */
  @Api.Summary('获取平台信息')
  @Get('/getPlatformInfo')
  @Contract(null, GetPlatformInfoDTO)
  public async getPlatformInfo(@UserAgent() ua: string): Promise<GetPlatformInfoDTO> {
    const releases = await this.platformService.getReleases();
    return {
      os: this.platformService.getOperatingSystemFromUA(ua),
      releases,
    };
  }

  @Api.Summary('获取 ua 字符串')
  @Get('/getUserAgent')
  @Contract(null, GetUserAgentDTO)
  public getUserAgent(@UserAgent() ua: string) {
    return {
      userAgent: ua,
    };
  }

  @Api.Summary('获取操作系统')
  @Get('/getOS')
  @Contract(null, GetOSDTO)
  public getOS(@UserAgent() ua: string): { os: 'windows' | 'mac' | 'Unknown' } {
    return {
      os: this.platformService.getOperatingSystemFromUA(ua),
    };
  }
}
