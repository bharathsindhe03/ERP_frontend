import axios from "axios";
import CRMJob from "../../Interface/CRMJob";

export default async function handleFetchJob(
  setJobs: (jobs: CRMJob[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) {
  setLoading(true);
  setError(null);

  try {
    console.log(`${import.meta.env.VITE_BASE_SERVER_URL}/job/get-all-jobs`);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_SERVER_URL}/job/get-all-jobs`,
    );

    console.log(response);
    setJobs([]);
  } catch (err) {
    console.error(err);
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setLoading(false);
  }
}
