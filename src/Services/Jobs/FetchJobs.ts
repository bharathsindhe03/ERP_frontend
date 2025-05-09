import TableColumns from "../../Interface/TableColumns";
import api from "../Utils/create_api";

export default async function handleFetchJob(setJobs: (jobs: TableColumns[]) => void, setLoading: (loading: boolean) => void, setError: (error: string | null) => void) {
  setLoading(true);
  setError(null);

  try {
    const response = await api.get("/job/get-all-jobs");
    console.log("Fetch Jobs: ", response);
    setJobs(Array.isArray(response.data) ? response.data : []);
  } catch (err) {
    console.error(err);
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
}
