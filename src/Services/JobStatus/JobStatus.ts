import api from "../Utils/create_api";

interface JobStatus {
  [key: string]: string | number | boolean;
}
export default async function getJobStatus(slNo: string, setJobStatus: (status: JobStatus) => void): Promise<void> {
  try {
    const response = await api.get(`jobStatus/get-job/${slNo}`);
    if (response.status === 200) {
      console.log("Job status response:", response);
      setJobStatus(response.data as JobStatus);
    }
  } catch (error) {
    console.error("Error fetching job status:", error);
  }
}
