import { InjectCtx, RequestContext, Get, Contract } from 'bwcx-ljsm';
import { ApiController } from '@server/decorators';
import fetch from 'node-fetch';
import { Api } from 'bwcx-api';
import { GetReleasesDTO } from '@common/modules/releases/releases.dto';

@ApiController()
export default class ReleasesController {
  public constructor(
    @InjectCtx()
    private readonly ctx: RequestContext,
  ) {}

  /** routes */
  @Api.Summary('获取发布信息')
  @Get('/getReleases')
  @Contract(null, GetReleasesDTO)
  public getReleases() {
    const data = fetch('https://cdn.algoux.cn/algo-bootstrap/version.json')
      .then((response) => response.json())
      .then((data: GetReleasesDTO) => {
        return data;
      })
      .catch((error) => {
        console.error('Error fetching releases:', error);
      });
    return data;
  }
}
