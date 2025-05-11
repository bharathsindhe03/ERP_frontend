import { toast } from "sonner";
import api from "../Utils/create_api";

export default async function handleAddJob(
  customerName: string,
  date: string,
  category: string,
  sellingPrice: number,
  isTempID: boolean,
  setLoading: (loading: boolean) => void,
  setShowModal: (show: boolean) => void
) {
  setLoading(true);

  try {
    const response = await api.post("/crm/create-job", {
      customerName,
      date,
      category,
      sellingPrice,
      isTempID,
    });

    if (response.status === 200) {
      toast.success(response.data);
    } else {
      toast.error("Failed to add job. Please try again.");
    }

    console.log("CRM ADD JOB", response);
    setShowModal(false);
  } catch (err) {
    console.error("Error adding job:", err);
    toast.error("Failed to add job. Please try again.");
  } finally {
    setLoading(false);
  }
}
