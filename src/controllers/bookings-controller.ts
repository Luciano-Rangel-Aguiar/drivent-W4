import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import bookingService from "@/services/bookings-service";

export async function getBookingByUserId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  
  try {
    const booking = await bookingService.getBookingByUserId(userId);

    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const { roomId } = req.body;

    if (!roomId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    
    await bookingService.postBooking(userId, Number(roomId));
    
    const booking = await bookingService.getBookingByUserId(userId);

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });    
  } catch (error) {
    if(error.name === "cannotBookRoomError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function updateBookingRoomBybookingId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const { bookingId } = req.params;

  const { roomId } = req.body;

  try {
    if(!bookingId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    if(!roomId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const booking = await bookingService.updateBookingRoomBybookingId( userId, Number(bookingId), Number(roomId));

    return res.sendStatus(httpStatus.OK).send(booking.id);
  } catch (error) {
    if(error.name === "cannotUpdateBookingError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }  
}

