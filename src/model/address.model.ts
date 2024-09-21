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
