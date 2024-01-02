import Cookies from 'js-cookie';
import { UpdateInstanceAuthorization, instance } from "./http";
import { AxiosResponse } from 'axios';
import { ACCESS_TOKEN_COOKIE, ROLE_ID, USER_NAME, VOTE_CANDIDATE_ID } from '@/const';

interface ISignInRequest {
    UserName: string
    Password: string
}

interface ISignInResponse {
    data: {
        token:            string
        roleID:           string
        userID:           string
        userName:         string
        voteCandidateID?:  string
    }
}

export const SignInAPI = async (req: ISignInRequest): Promise<void>  => {
  try {
    const response: AxiosResponse<ISignInResponse> = await instance.post(`/sign_in`, { ...req });
    UpdateInstanceAuthorization(response.data.data.token)
    Cookies.set(ACCESS_TOKEN_COOKIE, response.data.data.token)
    Cookies.set(USER_NAME, response.data.data.userName)
    Cookies.set(ROLE_ID, response.data.data.roleID)
    Cookies.set(VOTE_CANDIDATE_ID, response.data.data?.voteCandidateID || "")
  } catch (err) {
    throw err
  }
};
