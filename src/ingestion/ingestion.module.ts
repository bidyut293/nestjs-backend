import { Module, HttpModule } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';

@Module({
  imports: [HttpModule],
  controllers: [IngestionController],
  providers: [IngestionService],
})
export class IngestionModule {}
