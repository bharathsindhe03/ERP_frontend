import { toast } from "sonner";
import api from "../../Utils/create_api";

export default async function handleAddJob(
  customerName: string,
  date: string,
  category: string,
  sellingPrice: Number,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setShowModal: (show: boolean) => void
) {
  setLoading(true);
  setError(null);

  try {
    const response = await api.post("/crm/create-job", {
      customerName,
      date,
      category,
      sellingPrice,
    });

    if (response.status === 200) {
      toast.success(response.data);
    }

    console.log("CRM ADD JOB", response);
    setShowModal(false);
  } catch (err) {
    console.error("Error adding job:", err);
    setError("Failed to add job. Please try again.");
  } finally {
    setLoading(false);
  }
}
