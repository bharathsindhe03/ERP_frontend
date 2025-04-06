import { toast } from "sonner";
import api from "../../Utils/create_api"; // Assuming you have an API instance configured

interface JobUpdateData {
    slNo: number,
  jobId: number;
  jobDate?: string;
  category?: string;
  customerName?: string;
}   

export const updateJob = async (updatedJob: JobUpdateData) => {
  try { 
    console.log(updatedJob);
    const response = await api.patch("/job/update-job", updatedJob);

    if (response.status === 200) {
      toast.success("Job updated successfully");
    } else if (response.status === 400) {
      toast.error("Error updating job");
    }
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    toast.error("Failed to update job");
    
  }
};
