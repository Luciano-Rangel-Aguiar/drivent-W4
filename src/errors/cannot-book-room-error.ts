import { ApplicationError } from "@/protocols";

export function cannotBookRoomError(): ApplicationError {
  return {
    name: "cannotBookRoomError",
    message: "Cannot book room!",
  };
}
