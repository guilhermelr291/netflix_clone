import { HttpResponse } from '../protocols/http';

export const created = (data: any): HttpResponse => {
  return { status: 201, body: data };
};
