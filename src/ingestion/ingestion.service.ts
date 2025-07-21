import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IngestionService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async triggerIngestion(documentId: number): Promise<any> {
    const pythonBackendUrl = this.configService.get('PYTHON_BACKEND_URL');
    return this.httpService
      .post(`${pythonBackendUrl}/ingest`, { documentId })
      .toPromise();
  }

  async getIngestionStatus(documentId: number): Promise<any> {
    const pythonBackendUrl = this.configService.get('PYTHON_BACKEND_URL');
    return this.httpService
      .get(`${pythonBackendUrl}/ingestion-status/${documentId}`)
      .toPromise();
  }
}
