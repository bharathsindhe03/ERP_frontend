// categoryGet.ts

import api from "../../Utils/create_api"; // Make sure the API import is correct

export const fetchCategories = async (
  setCategoryOptions: React.Dispatch<React.SetStateAction<string[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    setLoading(true);
    const response = await api.get("/fieldOption/category");
    if (response?.data) {
      setCategoryOptions(response.data); // Set categories once fetched
    }
  } catch (error) {
    setError("Error fetching categories. Please try again later.");
  } finally {
    setLoading(false);
  }
};
