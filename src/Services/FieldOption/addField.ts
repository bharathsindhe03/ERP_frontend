// categoryAdd.ts

import api from "../../Utils/create_api";

export const handleAddNewCategory = async (
  e: React.KeyboardEvent<HTMLInputElement>,
  newCategory: string,
  categoryOptions: string[],
  setCategoryOptions: React.Dispatch<React.SetStateAction<string[]>>,
  setCategory: (value: string) => void,
  setNewCategory: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  fieldName: string // New dynamic fieldName parameter
) => {
  e.stopPropagation();
  if (e.key === "Enter" && newCategory.trim()) {
    const trimmedCategory = newCategory.trim();
    try {
      setLoading(true);
      await api.post("/fieldOption/add", {
        fieldName, // Use the dynamic fieldName
        fieldValue: trimmedCategory,
      });

      if (!categoryOptions.includes(trimmedCategory)) {
        setCategoryOptions((prev) => [...prev, trimmedCategory]);
      }
      setCategory(trimmedCategory);
      setNewCategory("");
      e.preventDefault();
    } catch (error) {
      setError("Error adding category. Please try again later.");
    } finally {
      setLoading(false);
    }
  }
};
