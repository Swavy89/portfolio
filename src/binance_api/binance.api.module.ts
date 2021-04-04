import { BinanceApiService } from './binance.api.service';
import { Module, HttpModule } from '@nestjs/common';



@Module({
    imports: [HttpModule],
    providers: [BinanceApiService],
    exports: [BinanceApiService]
  })
  export class BinanceApiModule {}
  