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
  RemoveAddressReq,
  UpdateAddressReq,
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

  async verifyAddress(contactId: number, addressId: number): Promise<Address> {
    const address = await this.prismaService.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new HttpException('Address not found.', 404);
    }

    return address;
  }

  async get(user: User, request: GetAddressReq): Promise<AddressRes> {
    const getReq: GetAddressReq = this.validationService.validate(
      AddressValidation.GET,
      request,
    );

    await this.contactService.verifyContact(user.username, getReq.contact_id);

    const address = await this.verifyAddress(
      getReq.contact_id,
      getReq.address_id,
    );

    return this.toAddressRes(address);
  }

  async update(user: User, request: UpdateAddressReq): Promise<AddressRes> {
    const updateReq: UpdateAddressReq = this.validationService.validate(
      AddressValidation.UPDATE,
      request,
    );

    await this.contactService.verifyContact(
      user.username,
      updateReq.contact_id,
    );

    const address = await this.verifyAddress(
      updateReq.contact_id,
      updateReq.id,
    );

    const updateAddress = await this.prismaService.address.update({
      where: {
        id: address.id,
        contact_id: address.contact_id,
      },
      data: updateReq,
    });

    return this.toAddressRes(updateAddress);
  }

  async remove(user: User, request: RemoveAddressReq): Promise<AddressRes> {
    const removeReq: RemoveAddressReq = this.validationService.validate(
      AddressValidation.REMOVE,
      request,
    );

    await this.contactService.verifyContact(
      user.username,
      removeReq.contact_id,
    );

    await this.verifyAddress(removeReq.contact_id, removeReq.address_id);

    const address = await this.prismaService.address.delete({
      where: {
        id: removeReq.address_id,
        contact_id: removeReq.contact_id,
      },
    });

    return this.toAddressRes(address);
  }

  async list(user: User, contactId: number): Promise<AddressRes[]> {
    await this.contactService.verifyContact(user.username, contactId);

    const addresses = await this.prismaService.address.findMany({
      where: {
        contact_id: contactId,
      },
    });

    return addresses.map((a) => this.toAddressRes(a));
  }
}
