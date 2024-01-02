
import { instance } from "./http";

export interface IVoteCandidateRequest {
    candidateID: string
    unVote: boolean
}

export const VoteCandidateAPI = async (req: IVoteCandidateRequest): Promise<void>  => {
  try {
    await instance.post(`/vote_candidate`, { ...req });
    return
  } catch (err) {
    throw err
  }
};
