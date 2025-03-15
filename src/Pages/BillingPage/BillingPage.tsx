import Navbar from "../../Components/Navbar";
import Searchbar from "../../Components/Searchbar";
import Taskbar from "../../Components/Taskbar";

export default function BillingPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col md:flex-row flex-grow">
        <Taskbar />
        <div className="w-full">
          <Navbar />
          <Searchbar />
          <div className="flex-grow bg-gray-100 p-4">Main Content Area</div>
        </div>
      </div>
    </div>
  );
}
