// categoryDelete.ts

import api from "../../Utils/create_api";

export const handleDeleteCategory = async (
  categoryToDelete: string,
  setCategoryOptions: React.Dispatch<React.SetStateAction<string[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  fieldName: string // New dynamic fieldName parameter
) => {
  try {
    setLoading(true);
    await api.post("/fieldOption/delete", {
      fieldName, // Use the dynamic fieldName
      fieldValue: categoryToDelete,
    });
    setCategoryOptions((prev) => prev.filter((c) => c !== categoryToDelete));
  } catch (error) {
    setError("Error deleting category. Please try again later.");
  } finally {
    setLoading(false);
  }
};
