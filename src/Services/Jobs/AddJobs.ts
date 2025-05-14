import { toast } from "sonner";
import api from "../Utils/create_api";

export default async function handleAddJob(
  customerName: string,
  date: string,
  category: string,
  sellingPrice: number,
  isTemp: boolean,
  setLoading: (loading: boolean) => void,
  setShowModal: (show: boolean) => void
) {
  setLoading(true);

  try { 
    console.log("CRM ADD JOB", customerName, date, category, sellingPrice, isTemp);
    
    const response = await api.post("/crm/create-job", {
      customerName,
      date,
      category,
      sellingPrice,
      isTemp,
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
