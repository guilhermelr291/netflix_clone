import { Actor } from '../../../domain/models/actor';

export const mockActor = (): Actor => ({
  id: 'any_id',
  fullName: 'any_full_name',
  imageUrl: 'any_image_url',
  bio: 'any_bio',
});
