import { HttpResponse } from '../protocols/http';

export const created = (data: any): HttpResponse => {
  return { status: 201, body: data };
};
export const ok = (data: any): HttpResponse => {
  return { status: 200, body: data };
};
