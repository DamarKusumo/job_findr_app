import axios from "axios";

const API_GET_JOB = ``;

export const getJobData = async (params: string) => {
  try {
    const response = await axios.get(`${API_GET_JOB}?${params}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
