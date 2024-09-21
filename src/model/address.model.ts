export class AddressRes {
  id: number;
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postal_code: string;
}

export class CreateAddressReq {
  contact_id: number;
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postal_code: string;
}

export class GetAddressReq {
  contact_id: number;
  address_id: number;
}

export class UpdateAddressReq {
  id: number;
  contact_id: number;
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postal_code: string;
}

export class RemoveAddressReq {
  contact_id: number;
  address_id: number;
}
