import { cannotBookRoomError, cannotUpdateBookingError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/bookings-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import roomRepository from "@/repositories/room-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBookingByUserId(userId: number) {
  const booking = await bookingRepository.findBookingByUserId(userId);
  
  if (!booking) {
    throw notFoundError();
  }

  return booking;
}

async function getBookingByRoomId(roomId: number) {
  const booking = await bookingRepository.findBookingByRoomId(roomId);

  if(!booking) {
    throw notFoundError();
  }
  
  return booking;
}

async function postBooking(userId: number, roomId: number ) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotBookRoomError();
  }

  const room = await roomRepository.findRoomById(roomId);

  if (!room) {
    throw notFoundError();
  }

  const booking = await bookingRepository.findBookingByRoomId(room.id);
  if(room.capacity <= booking.length) {
    throw cannotBookRoomError();
  }

  return bookingRepository.createBooking({ roomId, userId });
}

async function updateBookingRoomBybookingId(userId: number, bookingId: number, roomId: number) {
  const userBooking = await bookingRepository.findBookingByUserId(userId);
  
  if (!userBooking || userBooking.id !== bookingId) {
    throw cannotUpdateBookingError();    
  }

  const room = await roomRepository.findRoomById(roomId);

  if(!room) {
    throw notFoundError();
  }

  const roomBooking = await bookingRepository.findBookingByRoomId(roomId);

  if(room.capacity <= roomBooking.length) {
    throw cannotBookRoomError();
  }

  return bookingRepository.updateBooking({
    id: bookingId,
    userId: userId,
    roomId: roomId,
  });
}

const bookingService = {
  getBookingByUserId,
  getBookingByRoomId,
  postBooking,
  updateBookingRoomBybookingId,
};

export default bookingService;
