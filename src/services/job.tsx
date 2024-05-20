import axios from "axios";

const API_GET_JOB = `${process.env.NEXT_PUBLIC_BASE_URL}/api/data`

export const getJobData = async (params: string) => {
  try {
    const response = await axios.get(`${API_GET_JOB}?${params}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
