import prisma from '../../../../prisma/db';
import { AddActorRepository } from '../../../data/protocols/actor/add-actor-repository';
import { DeleteActorRepository } from '../../../data/protocols/actor/delete-actor-repository';
import { Actor } from '../../../domain/models/actor';
import { AddActor } from '../../../domain/use-cases/actor/add-actor';
import { ActorMapper } from '../protocols/actor-mapper';

export class ActorRepository
  implements AddActorRepository, DeleteActorRepository
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
}
