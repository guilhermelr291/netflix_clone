import prisma from '../../../../prisma/db';
import { AddActorRepository } from '../../../data/protocols/actor/add-actor-repository';
import { DeleteActorRepository } from '../../../data/protocols/actor/delete-actor-repository';
import { LoadActorByIdRepository } from '../../../data/protocols/actor/load-actor-by-id-repository';
import { UpdateActorRepository } from '../../../data/protocols/actor/update-actor-repository';
import { Actor } from '../../../domain/models/actor';
import { AddActor } from '../../../domain/use-cases/actor/add-actor';
import { UpdateActor } from '../../../domain/use-cases/actor/update-actor';
import { ActorMapper } from '../protocols/actor-mapper';

export class ActorRepository
  implements
    AddActorRepository,
    DeleteActorRepository,
    LoadActorByIdRepository,
    UpdateActorRepository
{
  constructor(private readonly actorMapper: ActorMapper) {}
  async add(data: AddActor.Params): Promise<Actor> {
    const actor = await prisma.actor.create({
      data,
    });

    return this.actorMapper.toDomainModel(actor);
  }
  async delete(id: string): Promise<void> {
    await prisma.actor.delete({
      where: {
        id: Number(id),
      },
    });
  }
  async loadById(id: string): Promise<Actor | null> {
    const actor = await prisma.actor.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!actor) {
      return null;
    }

    return this.actorMapper.toDomainModel(actor);
  }
  async update(actorId: string, actorData: UpdateActor.Params): Promise<Actor> {
    const actor = await prisma.actor.update({
      where: {
        id: Number(actorId),
      },
      data: actorData,
    });

    return this.actorMapper.toDomainModel(actor);
  }
}
