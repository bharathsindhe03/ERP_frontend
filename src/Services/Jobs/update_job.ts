import { toast } from "sonner";
import api from "../Utils/create_api";
import TableColumns from "../../Interface/TableColumns";

export const updateJob = async (
  updatedJob: Partial<TableColumns>
): Promise<TableColumns | undefined> => {
  try {
    console.log("Updating job ", updatedJob);
    console.log("payment status", updatedJob.paymentStatus);
    console.log("type", typeof updatedJob.paymentStatus);

    const response = await api.patch(
      "/job/update-job",
      JSON.stringify(updatedJob),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      toast.success("Job updated successfully");
      return response.data as TableColumns;
    } else if (response.status === 400) {
      toast.error("Error updating job");
    } else {
      toast.error(`Failed to update job. Status: ${response.status}`);
    }
    console.log("Update response:", response);
    return undefined;
  } catch (error) {
    console.log("Error updating job:", error);
    toast.error("Failed to update job");
    return undefined;
  }
};
