import { toast } from "sonner";
import api from "../Utils/create_api";
import { getRole } from "../Utils/LocalStorageUtils";

export default async function handleAddJob(
  customerName: string,
  date: string,
  category: string,
  sellingPrice: number,
  costPrice: number,
  isTemp: boolean,
  setLoading: (loading: boolean) => void,
  setShowModal: (show: boolean) => void
) {
  setLoading(true);
  const role = getRole();
  try {
    console.log("CRM ADD JOB", customerName, date, category, sellingPrice, costPrice, isTemp);
    let response;
    if (role === "CRM" || role === "ADMIN") {
      response = await api.post("/crm/create-job", {
        customerName,
        date,
        category,
        sellingPrice,
        costPrice,
        isTemp,
      });
    } else if (role === "OPERATIONS") {
      response = await api.post("/operations/create-job", {
        customerName,
        date,
        category,
        sellingPrice,
        costPrice,
        isTemp,
      });
    }

    if (response && response.status === 200) {
      toast.success("Job added successfully!");
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
