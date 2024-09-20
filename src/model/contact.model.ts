export class ContactRes {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export class CreateContactReq {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export class UpdateContactReq {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
}
