import { Actor as PrismaActor } from '../../../../generated/prisma';
import { Actor } from '../../../domain/models/actor';
export interface ActorMapper {
  toDomainModel(data: PrismaActor): Actor;
  toPersistenceModel(data: Actor): Omit<PrismaActor, 'id'>;
}
