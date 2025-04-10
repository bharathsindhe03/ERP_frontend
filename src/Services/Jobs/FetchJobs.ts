import CRMJob from "../../Interface/TableColumns";
import api from "../../Utils/create_api";

export default async function handleFetchJob(
  setJobs: (jobs: CRMJob[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) {
  setLoading(true);
  setError(null);

  try {
    const response = await api.get("/job/get-all-jobs");

    console.log(response);
    setJobs(response.data);
  } catch (err) {
    console.error(err);
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
}
