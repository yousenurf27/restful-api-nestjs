import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { Address, User } from '@prisma/client';
import {
  AddressRes,
  CreateAddressReq,
  GetAddressReq,
} from '../model/address.model';
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

    return this.toAddressRes(address);
  }

  toAddressRes(address: Address): AddressRes {
    return {
      id: address.id,
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    };
  }

  async get(user: User, request: GetAddressReq): Promise<AddressRes> {
    const getReq: GetAddressReq = this.validationService.validate(
      AddressValidation.GET,
      request,
    );

    await this.contactService.verifyContact(user.username, getReq.contact_id);

    const address = await this.prismaService.address.findFirst({
      where: {
        id: getReq.address_id,
        contact_id: getReq.contact_id,
      },
    });

    if (!address) {
      throw new HttpException('Address not found.', 404);
    }

    return this.toAddressRes(address);
  }
}
