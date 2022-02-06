import { GenericResponse } from "./genericResponse";

export type UserResponse = GenericResponse & { token?: string };
