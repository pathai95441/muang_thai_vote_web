import {  instance } from "./http";
import { AxiosResponse } from 'axios';


interface ICandidateResponse {
    data: ICandidateInfo[]
}

export interface ICandidateInfo {
    candidateDescription: string
    candidateID: string
    candidateName: string
    voteScore: number
}

export const GetCandidatesAPI = async (sortBy?: string, search?: string): Promise<ICandidateInfo[]>  => {
  try {
    const response: AxiosResponse<ICandidateResponse> = await instance.get(`/candidates?sortBy=${sortBy || ""}&search=${search || ""}`);
    
    return response.data.data
  } catch (err) {
    throw err
  }
};

export const DeleteCandidateAPI = async (id: string): Promise<void>  => {
  try {
    await instance.delete(`/candidate/${id}`);
  } catch (err) {
    throw err
  }
};

export const UpdateCandidateDataAPI = async (req: ICandidateInfo): Promise<void>  => {
  try {
    await instance.put(`/candidate`, { candidateDescription: req.candidateDescription, candidateName: req.candidateName, candidateID: req.candidateID });
  } catch (err) {
    throw err
  }
};

export const CreateCandidateDataAPI = async (req: ICandidateInfo): Promise<void>  => {
  try {
    await instance.post(`/candidate`, { candidateDescription: req.candidateDescription, candidateName: req.candidateName });
  } catch (err) {
    throw err
  }
};