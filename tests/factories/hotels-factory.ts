import faker from "@faker-js/faker";
import { prisma } from "@/config";

//Sabe criar objetos - Hotel do banco
export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    }
  });
}

export async function createRoomWithHotelId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.datatype.number().toString(),
      capacity: faker.datatype.number({ min: 2, max: 4 }),
      hotelId: hotelId,
    }
  });
}

export async function createRoomWithNoVacancies(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.datatype.number().toString(),
      capacity: 0,
      hotelId: hotelId,
    }
  });
}
