import { BadRequest } from "../../utils/errors"

export const ErrUserNotFound = new BadRequest("User not found")
export const ErrConflictData = new BadRequest("Conflict data")
