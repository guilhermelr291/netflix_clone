import { Actor } from '../../../domain/models/actor';
import { ActorMapper } from '../protocols/actor-mapper';
import { Actor as PrismaActor } from '../../../../generated/prisma';

export class ActorMapperImpl implements ActorMapper {
  toDomainModel(data: PrismaActor): Actor {
    return {
      id: String(data.id),
      fullName: data.fullName,
      imageUrl: data.imageUrl || undefined,
      bio: data.bio || undefined,
    };
  }

  toPersistenceModel(data: Actor): Omit<PrismaActor, 'id'> {
    return {
      fullName: data.fullName,
      imageUrl: data.imageUrl || null,
      bio: data.bio || null,
    };
  }
}
