import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { User } from '@prisma/client';
import { AddressRes, CreateAddressReq } from '../model/address.model';
import { AddressValidation } from './address.validation';
import { ContactService } from '../contact/contact.service';

@Injectable()
export class AddressService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private contactService: ContactService,
  ) {}

  async create(user: User, request: CreateAddressReq): Promise<AddressRes> {
    this.logger.debug(
      `AddressService.create(${JSON.stringify(user)} . ${JSON.stringify(request)})`,
    );
    const createReq: CreateAddressReq = this.validationService.validate(
      AddressValidation.CREATE,
      request,
    );

    await this.contactService.verifyContact(
      user.username,
      createReq.contact_id,
    );

    const address = await this.prismaService.address.create({
      data: createReq,
    });

    return {
      id: address.id,
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    };
  }
}
