// categoryDelete.ts

import { toast } from "sonner";
import api from "../../Utils/create_api";

export const handleDeleteCategory = async (
  categoryToDelete: string,
  setCategoryOptions: React.Dispatch<React.SetStateAction<string[]>>,
  fieldName: string // New dynamic fieldName parameter
) => {
  try {
    await api.post("/fieldOption/delete", {
      fieldName, // Use the dynamic fieldName
      fieldValue: categoryToDelete,
    });
    setCategoryOptions((prev) => prev.filter((c) => c !== categoryToDelete));
  } catch (error) {
    console.error("Error deleting category:", error);
    // Optionally, you can show a toast or alert to inform the user about the error
    toast.error("Error deleting category. Please try again later.");
  }
};
