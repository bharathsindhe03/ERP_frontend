import { toast } from "sonner";
import api from "../Utils/create_api";

export default async function handleDeleteJobs(slNo: number | null) {
  try {
    const response = await api.delete(`/job/delete-job/${slNo}`);
    console.log("Job deleted successfully:", response);
    if (response.status === 200) {
      toast.success("Job deleted successfully!");
    } else {
      toast.error("Failed to delete job. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting jobs:", error);
    toast.error("Failed to delete jobs. Please try again.");
  }
}
