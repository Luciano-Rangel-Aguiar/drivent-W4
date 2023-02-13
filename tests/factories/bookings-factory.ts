
import { Room, User, } from "@prisma/client";

import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createBooking( room: Room, user: User,) {
  return await prisma.booking.create({
    data: {
      userId: user.id,
      roomId: room.id,
    }
  });
}

export async function createPostValidBody() {
  return {
    roomId: faker.datatype.number
  };
}
