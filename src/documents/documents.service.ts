import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async create(
    createDocumentDto: CreateDocumentDto,
    user: any,
  ): Promise<Document> {
    const document = this.documentsRepository.create({
      ...createDocumentDto,
      owner: { id: user.userId },
    });
    return this.documentsRepository.save(document);
  }

  async findAll(user: any): Promise<Document[]> {
    if (user.role === 'admin') {
      return this.documentsRepository.find();
    }
    return this.documentsRepository.find({
      where: { owner: { id: user.userId } },
    });
  }

  async findOne(id: number, user: any): Promise<Document> {
    const document = await this.documentsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (
      !document ||
      (user.role !== 'admin' && document.owner.id !== user.userId)
    ) {
      throw new ForbiddenException('Access denied');
    }
    return document;
  }

  async update(
    id: number,
    updateDocumentDto: CreateDocumentDto,
    user: any,
  ): Promise<Document> {
    const document = await this.findOne(id, user);
    Object.assign(document, updateDocumentDto);
    return this.documentsRepository.save(document);
  }

  async remove(id: number, user: any): Promise<void> {
    const document = await this.findOne(id, user);
    await this.documentsRepository.remove(document);
  }
}
