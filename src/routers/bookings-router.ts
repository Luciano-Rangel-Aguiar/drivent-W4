import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookingByUserId, postBooking, updateBookingRoomBybookingId } from "@/controllers";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBookingByUserId)
  .post("/", postBooking)
  .put("/:bookingId", updateBookingRoomBybookingId);

export { bookingsRouter };
