import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('ingestion')
@UseGuards(AuthGuard('jwt'))
export class IngestionController {
  constructor(private ingestionService: IngestionService) {}

  @Post(':id')
  async triggerIngestion(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin' && req.user.role !== 'editor') {
      throw new ForbiddenException(
        'Only admins or editors can trigger ingestion',
      );
    }
    return this.ingestionService.triggerIngestion(+id);
  }

  @Get('status/:id')
  async getIngestionStatus(@Param('id') id: string) {
    return this.ingestionService.getIngestionStatus(+id);
  }
}
