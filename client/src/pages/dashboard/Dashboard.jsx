import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdIncompleteCircle } from "react-icons/md";
import RevenueChart from "../../components/admin/RevenueChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../redux/features/statsSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TiDocumentAdd } from "react-icons/ti";
import { logoutUser } from "../../redux/features/authSlice";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import CreateBookForm from "./CreateBookForm";

const Dashboard = () => {
  const [salesModal, setSalesModal] = useState(false);
  const [bookForm, setBookForm] = useState(false);
  const { stats, isLoading, error } = useSelector((state) => state.stats);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  useEffect(() => {
    try {
      dispatch(fetchStats());
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }, []);

  // console.log(stats)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-4">
        <AiOutlineLoading3Quarters className="text-5xl animate-spin" />
        <h2 className="font-rubik text-sm ">Loading</h2>
      </div>
    );
  }

  const trendingPercentage = (stats?.trendingBooks / stats.totalBooks) * 100;

  return (
    <div className="flex flex-col gap-6 relative">
      <section className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 border-b">
        <div className="">
          <h2 className="text-3xl font-semibold font-rubik">Admin Dashboard</h2>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            title="add new book"
            onClick={() => setBookForm(!bookForm)}
            className="bg-gray-300 px-4 py-2 text-sm rounded-md hover:bg-gray-400"
          >
            <TiDocumentAdd size={30} />
          </button>
          <button
            title="profile"
            className="bg-tprimary px-4 py-2 text-sm rounded-md hover:bg-gray-400"
          >
            <CgProfile size={30} />
          </button>
          <button
            title="logout"
            onClick={handleLogout}
            className="bg-green-500 px-4 py-2 text-sm rounded-md hover:bg-green-600"
          >
            <IoLogOutOutline size={30} />
          </button>
        </div>
      </section>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <button
          title="All Books"
          onClick={() => navigate("/books")}
          className="flex items-center p-8 bg-white shadow shadow-slate-400 hover:shadow-black hover:bg-slate-200 rounded-lg"
        >
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {stats?.totalBooks}
            </span>
            <span className="block text-gray-500">Products</span>
          </div>
        </button>
        <button
          title="My Sales"
          onClick={() => setSalesModal(!salesModal)}
          className="flex items-center p-8 bg-white shadow  shadow-slate-400 hover:shadow-black hover:bg-slate-200 rounded-lg"
        >
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">
              ${stats?.totalSales.toFixed(2)}
            </span>
            <span className="block text-gray-500">Total Sales</span>
          </div>
        </button>
        <button className="flex items-center p-8 bg-white shadow  shadow-slate-400 hover:shadow-black hover:bg-slate-200 rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">
              {stats?.trendingBooks}
            </span>
            <span className="inline-block text-xl text-gray-500 font-semibold">
              ({trendingPercentage.toFixed(1)}%)
            </span>
            <span className="block text-gray-500">
              Trending Books in This Month
            </span>
          </div>
        </button>
        <button
          title="orders"
          onClick={() => navigate("/dashboard/orders")}
          className="flex items-center p-8 bg-white shadow shadow-slate-400 hover:shadow-black hover:bg-slate-200 rounded-lg"
        >
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdIncompleteCircle className="size-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {stats?.totalOrders}
            </span>
            <span className="block text-gray-500">Total Orders</span>
          </div>
        </button>
      </section>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            The number of orders per month
          </div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              <RevenueChart />
            </div>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                fill="#fff"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">02</span>
            <span className="block text-gray-500">Orders left</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">139</span>
            <span className="block text-gray-500">
              Website visits (last day)
            </span>
          </div>
        </div>
        <div className="row-span-3 bg-white shadow rounded-lg">
          <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>Users by average order</span>
            <button
              type="button"
              className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Descending
              <svg
                className="-mr-1 ml-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
            <ul className="p-6 space-y-6">
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/82.jpg"
                    alt="Annette Watson profile picture"
                  />
                </div>
                <span className="text-gray-600">Annette Watson</span>
                <span className="ml-auto font-semibold">9.3</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/81.jpg"
                    alt="Calvin Steward profile picture"
                  />
                </div>
                <span className="text-gray-600">Calvin Steward</span>
                <span className="ml-auto font-semibold">8.9</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/80.jpg"
                    alt="Ralph Richards profile picture"
                  />
                </div>
                <span className="text-gray-600">Ralph Richards</span>
                <span className="ml-auto font-semibold">8.7</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/79.jpg"
                    alt="Bernard Murphy profile picture"
                  />
                </div>
                <span className="text-gray-600">Bernard Murphy</span>
                <span className="ml-auto font-semibold">8.2</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/78.jpg"
                    alt="Arlene Robertson profile picture"
                  />
                </div>
                <span className="text-gray-600">Arlene Robertson</span>
                <span className="ml-auto font-semibold">8.2</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/77.jpg"
                    alt="Jane Lane profile picture"
                  />
                </div>
                <span className="text-gray-600">Jane Lane</span>
                <span className="ml-auto font-semibold">8.1</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/76.jpg"
                    alt="Pat Mckinney profile picture"
                  />
                </div>
                <span className="text-gray-600">Pat Mckinney</span>
                <span className="ml-auto font-semibold">7.9</span>
              </li>
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="Norman Walters profile picture"
                  />
                </div>
                <span className="text-gray-600">Norman Walters</span>
                <span className="ml-auto font-semibold">7.7</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            Students by type of studying
          </div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              Chart
            </div>
          </div>
        </div>
      </section>

      {/*Sales Modal */}
      {salesModal && (
        <div className="absolute z-50 inset-0 h-96 mx-1 md:mx-6 lg:mx-28 top-12 bg-slate-200 border-2 border-black rounded-lg overflow-y-auto">
          <div className="flex items-center justify-between px-4  border-b-4 border-white  my-2 py-1 ">
            <h2 className="text-xl font-bold font-rubik capitalizetext-center md:text-start mx-6">
              Your Sales
            </h2>
            <button
              type="button"
              className="text-sm font-medium text-gray-600 hover:text-gray-800"
              onClick={() => setSalesModal(false)}
            >
              <IoMdClose size={28} />
            </button>
          </div>
        </div>
      )}

      {/* Book Form Modal */}
      {bookForm && (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-50 flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <CreateBookForm closeModal={() => setBookForm(!bookForm)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
