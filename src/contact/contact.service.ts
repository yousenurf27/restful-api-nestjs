import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { Contact, User } from '@prisma/client';
import {
  ContactRes,
  CreateContactReq,
  UpdateContactReq,
} from '../model/contact.model';
import { ValidationService } from '../common/validation.service';
import { ContactValidation } from './contact.validation';

@Injectable()
export class ContactService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(user: User, request: CreateContactReq): Promise<ContactRes> {
    this.logger.debug(
      `ContactService.create(${JSON.stringify(user)} . ${JSON.stringify(request)})`,
    );

    const createReq: CreateContactReq = this.validationService.validate(
      ContactValidation.CREATE,
      request,
    );

    const contact = await this.prismaService.contact.create({
      data: {
        ...createReq,
        username: user.username,
      },
    });

    return this.toContactRes(contact);
  }

  toContactRes(contact: Contact): ContactRes {
    return {
      id: contact.id,
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    };
  }

  async verifyContact(username: string, contactId: number): Promise<Contact> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        username: username,
        id: contactId,
      },
    });

    if (!contact) {
      throw new HttpException('Contact is not found', 404);
    }

    return contact;
  }

  async get(user: User, contactId: number): Promise<ContactRes> {
    const contact = await this.verifyContact(user.username, contactId);

    return this.toContactRes(contact);
  }

  async update(user: User, request: UpdateContactReq): Promise<ContactRes> {
    const updateReq = this.validationService.validate(
      ContactValidation.UPDATE,
      request,
    );

    const contact = await this.verifyContact(user.username, updateReq.id);

    const updateContact = await this.prismaService.contact.update({
      where: {
        id: contact.id,
        username: contact.username,
      },
      data: updateReq,
    });

    return this.toContactRes(updateContact);
  }
}
