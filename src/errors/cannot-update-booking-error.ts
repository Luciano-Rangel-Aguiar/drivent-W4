import { ApplicationError } from "@/protocols";

export function cannotUpdateBookingError(): ApplicationError {
  return {
    name: "cannotUpdateBookingError",
    message: "Cannot update boking!",
  };
}
