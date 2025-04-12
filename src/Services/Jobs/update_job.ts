import { toast } from "sonner";
import api from "../../Utils/create_api";
import TableColumns from "../../Interface/TableColumns";

export const updateJob = async (
  updatedJob: TableColumns
): Promise<TableColumns | undefined> => {
  try {
    console.log("Updating job sl number :", updatedJob.slNo);
    const response = await api.patch(
      `/job/update-job/${updatedJob.slNo}`,
      updatedJob
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
    console.error("Error updating job:", error);
    toast.error("Failed to update job");
    return undefined;
  }
};
