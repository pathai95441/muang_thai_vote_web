
import { instance } from "./http";

export interface IRegisterRequest {
    UserName: string
    Password: string
    Email: string
    RoleID: Number
}

export const RegisterAPI = async (req: IRegisterRequest): Promise<void>  => {
  try {
    await instance.post(`/user`, { ...req });
  } catch (err) {
    throw err
  }
};
