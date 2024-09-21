import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { User } from '@prisma/client';
import { Auth } from '../common/auth.decorator';
import {
  AddressRes,
  CreateAddressReq,
  GetAddressReq,
  UpdateAddressReq,
} from '../model/address.model';
import { WebResponse } from '../model/web.model';

@Controller('/api/contacts/:contactId/addresses')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Body() request: CreateAddressReq,
  ): Promise<WebResponse<AddressRes>> {
    request.contact_id = contactId;
    const result = await this.addressService.create(user, request);

    return {
      data: result,
    };
  }

  @Get('/:addressId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
  ): Promise<WebResponse<AddressRes>> {
    const request: GetAddressReq = {
      address_id: addressId,
      contact_id: contactId,
    };
    const result = await this.addressService.get(user, request);

    return {
      data: result,
    };
  }

  @Put('/:addressId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() request: UpdateAddressReq,
  ): Promise<WebResponse<AddressRes>> {
    request.contact_id = contactId;
    request.id = addressId;
    const result = await this.addressService.update(user, request);

    return {
      data: result,
    };
  }
}
