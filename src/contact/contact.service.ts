import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { Contact, User } from '@prisma/client';
import {
  ContactRes,
  CreateContactReq,
  SearchContactReq,
  UpdateContactReq,
} from '../model/contact.model';
import { ValidationService } from '../common/validation.service';
import { ContactValidation } from './contact.validation';
import { WebResponse } from '../model/web.model';

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

  async remove(user: User, contactId: number): Promise<ContactRes> {
    await this.verifyContact(user.username, contactId);

    const contact = await this.prismaService.contact.delete({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    return this.toContactRes(contact);
  }

  async search(
    user: User,
    request: SearchContactReq,
  ): Promise<WebResponse<ContactRes[]>> {
    const searchContactReq: SearchContactReq = this.validationService.validate(
      ContactValidation.SEARCH,
      request,
    );

    const filters = [];

    if (searchContactReq.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: searchContactReq.name,
            },
          },
          {
            last_name: {
              contains: searchContactReq.name,
            },
          },
        ],
      });
    }

    if (searchContactReq.email) {
      filters.push({
        email: {
          contains: searchContactReq.email,
        },
      });
    }

    if (searchContactReq.phone) {
      filters.push({
        phone: {
          contains: searchContactReq.phone,
        },
      });
    }

    const skip = (searchContactReq.page - 1) * searchContactReq.size;

    const contacts = await this.prismaService.contact.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: searchContactReq.size,
      skip: skip,
    });

    const total = await this.prismaService.contact.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    return {
      data: contacts.map((c) => this.toContactRes(c)),
      paging: {
        current_page: searchContactReq.page,
        size: searchContactReq.size,
        total_page: Math.ceil(total / searchContactReq.size),
      },
    };
  }
}
