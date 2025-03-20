import Navbar from "../../Components/Navbar";
import Searchbar from "../crm_page/CRMSearchbar";
import Taskbar from "../../Components/Taskbar";

export default function AdminPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col md:flex-row flex-grow h-full">
        <Taskbar />
        <div className="w-full flex-grow">
          <Navbar />
          <Searchbar />
        </div>
      </div>
    </div>
  );
}
