import { ApiController } from "@server/decorators";
import { Get, Contract } from "bwcx-ljsm";

@ApiController()
export default class MiscController {
  public constructor(
  ) {}

  @Get()
  @Contract(null, null)
  async checkHealth(): Promise<void> {
  }
}
