import { toast } from "sonner";
import api from "../Utils/create_api";
import { getRole } from "../Utils/LocalStorageUtils";

export default async function handleUpdateJobStatus(slNo: string, status: string) {
  try {
    const role = getRole();
    if (!role) {
      toast.error("Role not found in local storage");
      console.error("Role not found in local storage");
      return;
    }

    // Construct request body dynamically based on role
    let payload: Record<string, string> = {};

    if (role === "CRM") {
      payload = { crmStatus: status };
    } else if (role === "BILLING") {
      payload = { billingStatus: status };
    } else if (role === "OPERATIONS") {
      payload = { operationsStatus: status };
    } else {
      console.error("Invalid role:", role);
      return;
    }

    const response = await api.patch(`/jobStatus/update-job/${slNo}`, payload);
    console.log("Job status updated successfully:", response);
    if (response.status === 200) {
      toast.success("Job status updated successfully!");
    } else {
      toast.error("Failed to update job status.");
    }
  } catch (error) {
    console.error("Error updating job status:", error);
    toast.error("Failed to update job status. Please try again.");
  }
}
