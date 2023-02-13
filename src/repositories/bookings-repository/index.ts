import { prisma } from "@/config";
import { Booking } from "@prisma/client";

type CreateBooking = Omit<Booking, "id" | "createdAt" | "updatedAt">;
type UpdateBooking = Omit<Booking, "createdAt" | "updatedAt">;

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: {
      Room: true
    }
  });
}

async function findBookingByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    }
  });
}

async function createBooking({ roomId, userId }: CreateBooking): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    }
  });  
}

async function updateBooking({ id, roomId }: UpdateBooking) {
  return prisma.booking.update({
    where: {
      id: id,
    },
    data: {
      roomId: roomId,
    },
  });
}

const bookingRepository ={
  findBookingByUserId,
  findBookingByRoomId,
  createBooking,
  updateBooking,
};

export default bookingRepository;
