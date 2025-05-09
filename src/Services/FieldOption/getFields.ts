import { toast } from "sonner";
import api from "../Utils/create_api";

export const fetchCategories = async (
  setCategoryOptions: React.Dispatch<React.SetStateAction<string[]>>,

  field: string
) => {
  try {
    const response = await api.get(`/fieldOption/${field}`);
    if (response?.data) {
      setCategoryOptions(response.data);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);

    toast.error("Error fetching categories. Please try again later.");
  }
};
