import { toast } from "sonner";
import api from "../../Utils/create_api";

export const handleAddNewCategory = async (
  newCategory: string,
  categoryOptions: string[],
  setCategoryOptions: React.Dispatch<React.SetStateAction<string[]>>,
  setCategory: (value: string) => void,
  setNewCategory: React.Dispatch<React.SetStateAction<string>>,
  fieldName: string
) => {
  const trimmedCategory = newCategory.trim();
  if (!trimmedCategory) return;

  try {
    await api.post("/fieldOption/add", {
      fieldName,
      fieldValue: trimmedCategory,
    });

    if (!categoryOptions.includes(trimmedCategory)) {
      setCategoryOptions((prev) => [...prev, trimmedCategory]);
    }
    setCategory(trimmedCategory);
    setNewCategory("");
  } catch (error) {
    console.error("Error adding new category:", error);
    toast.error("Error adding new category. Please try again later.");
  }
};
