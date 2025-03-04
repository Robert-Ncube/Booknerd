import React from "react";
import { IoMdClose } from "react-icons/io";

const SalesModal = ({ stats, onClose, isLoading, error }) => {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="absolute z-50 inset-0 h-96 mx-1 md:mx-6 lg:mx-28 top-12 bg-slate-200 border-2 border-black rounded-lg overflow-y-auto">
      <div className="flex items-center justify-between px-4 border-b-4 border-white my-2 py-1">
        <h2 className="text-xl font-bold font-rubik capitalize text-center md:text-start mx-6">
          Sales Stats
        </h2>
        <button
          type="button"
          className="text-sm font-medium text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <IoMdClose size={28} />
        </button>
      </div>
      <div className="p-4">
        <div>
          <h3 className="font-bold">Total Sales:</h3>
          <span className="block text-2xl font-bold">
            ${stats?.totalSales.toFixed(2)}
          </span>
        </div>
        <div>
          <h3 className="font-bold">Total Sales Last Month:</h3>
          <span className="block text-2xl font-bold">
            ${stats?.totalSalesLastMonth}
          </span>
        </div>
        <div>
          <h3 className="font-bold">Trending Books:</h3>
          <span className="block text-2xl font-bold">
            {stats?.trendingBooks}
          </span>
        </div>
        <div>
          <h3 className="font-bold">Total Books:</h3>
          <span className="block text-2xl font-bold">{stats?.totalBooks}</span>
        </div>
      </div>
    </div>
  );
};

export default SalesModal;
