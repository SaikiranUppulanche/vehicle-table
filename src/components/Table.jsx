import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Table = () => {
  const [vehicles, setVehicles] = useState([]);
  const [visibleVehicles, setVisibleVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const initialLoadCount = 10;
  const loadMoreCount = 10;

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=100`
      );
      //   console.log(response.data.results);
      if (
        response.data &&
        response.data.results &&
        Array.isArray(response.data.results)
      ) {
        setVehicles(response.data.results);
        setVisibleVehicles(response.data.results.slice(0, initialLoadCount));
      } else {
        throw new Error("Invalid data format or no data found");
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      toast.error("Error fetching vehicle data:");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    const filtered = vehicles.filter((vehicle) =>
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setVisibleVehicles(filtered.slice(0, initialLoadCount));
  }, [searchQuery, vehicles]);

  const handleScroll = (e) => {
    if (!loadMore || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = e.target.scrollingElement;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      const newVisibleCount = visibleVehicles.length + loadMoreCount;

      if (newVisibleCount >= vehicles.length) {
        setVisibleVehicles(vehicles);
        setLoadMore(false);
      } else {
        setVisibleVehicles((prev) => [
          ...prev,
          ...vehicles.slice(prev.length, newVisibleCount),
        ]);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleVehicles, loadMore, loading]);

  const handleCheckboxChange = (vehicleId) => {
    if (selectedVehicles.includes(vehicleId)) {
      setSelectedVehicles(selectedVehicles.filter((id) => id !== vehicleId));
    } else {
      setSelectedVehicles([...selectedVehicles, vehicleId]);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleSendSMS = async () => {
    if (phoneNumber.length !== 10) {
      toast.warning("Please enter a valid 10-digit phone number.");
    }

    const selectedData = visibleVehicles.filter((vehicle) =>
      selectedVehicles.includes(vehicle.id)
    );

    if (selectedData.length === 0) {
      toast.error("No vehicles selected.");
      return;
    }

    try {
      const response = await axios.post(
        "https://send-sms-1219.twil.io/send-sms",
        {
          phoneNumber: `+91${phoneNumber}`,
          vehicleData: selectedData,
        }
      );

      if (response.data.status === "success") {
        toast.success("SMS sent successfully!");
      } else {
        toast.error("Error sending SMS.");
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      toast.error("Error sending SMS:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Vehicle Data</h2>

      <input
        type="text"
        className="border border-gray-300 p-2 mb-4 w-full"
        placeholder="Search by Model"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Enter 10-Digit Phone Number:
        </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Phone Number"
          className="border border-gray-300 p-2 w-full mt-1"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={handleSendSMS}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Send SMS
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Select</th>
            <th className="border border-gray-300 px-4 py-2">Model</th>
            <th className="border border-gray-300 px-4 py-2">Make</th>
            <th className="border border-gray-300 px-4 py-2">Cylinders</th>
            <th className="border border-gray-300 px-4 py-2">
              Engine Displacement (eng_dscr)
            </th>
            <th className="border border-gray-300 px-4 py-2">Fuel Cost</th>
            <th className="border border-gray-300 px-4 py-2">Year</th>
            <th className="border border-gray-300 px-4 py-2">
              CO2 Tailpipe (co2tailpipegpm)
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Vehicle Class (vclass)
            </th>
            <th className="border border-gray-300 px-4 py-2">
              You Save/Spend (yousavespend)
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Electric Vehicle Motor (Evmotor)
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleVehicles.length > 0 ? (
            visibleVehicles.map((vehicle, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedVehicles.includes(vehicle.id)}
                    onChange={() => handleCheckboxChange(vehicle.id)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vehicle.model}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vehicle.make}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vehicle.cylinders}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vehicle.eng_dscr}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vehicle.fuelcost08 || vehicle.fuelcosta08}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vehicle.year}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vehicle.co2tailpipegpm}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vehicle.vclass}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vehicle.yousavespend}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {vehicle.Evmotor || "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td key="0" colSpan="10" className="text-center py-4">
                No matching vehicles found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {loading && <div className="text-center py-4">Loading more data...</div>}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Table;
