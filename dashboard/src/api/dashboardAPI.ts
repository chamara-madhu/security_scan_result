import axios, { AxiosResponse } from "axios";
import config from "../config/api";

export interface Finding {
  ruleId: string;
  description: string;
  metadata: { severity: string; description: string }
  location: {
    path: string;
    positions: {
      begin: {
        line: number
      }
    };
  }
}

export interface Result {
  id: string;
  repositoryName: string;
  status: "Queued" | "In Progress" | "Success" | "Failure";
  findings: Finding[];
  queuedAt?: Date;
  scanningAt?: Date;
  finishedAt?: Date;
}

export interface Meta {
  currentPage: number;
  itemsPerPage: number;
  sortBy: [string, "ASC" | "DESC"][]; // Array of tuples with a string and sort direction
  totalItems: number;
  totalPages: number;
}

export interface Response {
  data: Result[],
  meta: Meta
}

export const createResult = async (data: any) => {
  return axios.post(`${config.API_URL}/api/v1/results`, data);
};

export const fetchAllResults = async (page: number): Promise<AxiosResponse<Response> | undefined> => {
  return axios.get<Response>(`${config.API_URL}/api/v1/results?page=${page}`);
};

export const fetchResult = async (id: string | null) => {
  return axios.get(`${config.API_URL}/api/v1/results/${id}`);
};
