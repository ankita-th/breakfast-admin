import React, { useEffect, useState } from "react";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import { HOLIDAYS_ENDPOINT } from "../api/endpoints";
import TableWrapper from "../Wrappers/TableWrapper";
import NoDataFound from "../Components/Common/NoDataFound";
import SingleProductTableRow from "../Components/SingleProductTableRow";
import { renderSerialNumber } from "../utils/helpers";
import Pagination from "../Components/Common/Pagination";
import { ITEMS_PER_PAGE } from "../constant";
import usePagination from "../hooks/usePagination";
import CommonTextField from "../Form Fields/CommonTextField";
import AddEditHoliday from "../Components/Common/AddEditHoliday";
import { useForm } from "react-hook-form";

function Holidays() {
  const [holidays, setHolidays] = useState();
  const { page, onPageChange } = usePagination();
  const [totalData, setTotalData] = useState();
  const [showAddEditHoliday, setShowAddEditHoliday] = useState(false);
  const formConfig = useForm();
  console.log(holidays, "holidays");

  const PRODUCT_PAGE_COLUMNS = [
    "S.no",
    "Date",
    "Day",
    "Holiday",
    "Restrict Holiday",
  ];
  useEffect(() => {
    makeApiRequest({
      endPoint: HOLIDAYS_ENDPOINT,
      method: METHODS.get,
    })
      .then((res) => {
        console.log(res.data.results, "f");
        setHolidays(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold">Holidays</h1>
        <div className="flex-1 flex gap-2">
          <div className="relative flex justify-end w-full ">
             <CommonTextField
              fieldName="search_holiday"
              formConfig={formConfig}
              type="text"
              className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search Holiday"
            />
            <button className="absolute right-3 top-2.5">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 transition-colors duration-200">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span onClick={() => setShowAddEditHoliday(true)}>Add Holiday</span>
        </button>
        {showAddEditHoliday && <AddEditHoliday formConfig={formConfig} onClose={() => setShowAddEditHoliday(false)} />}
      </div>
      <TableWrapper columns={PRODUCT_PAGE_COLUMNS}>
        {holidays?.length ? (
          holidays?.map((dt, idx) => (
            <tr className=" border border-gray-400 ">
              <td className="py-2 px-4 border-0 bg-white ">
                {renderSerialNumber(page, ITEMS_PER_PAGE, idx)}
              </td>
              <td className="py-2 px-4 border-0 bg-white ">{dt.date}</td>
              <td className="py-2 px-4 border-0 bg-white ">{dt.day}</td>
              <td className="py-2 px-4 border-0 bg-white">{dt.holiday}</td>
              <td className="py-2 px-4 border-0 bg-white">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" class="sr-only peer" />
                  <div className="relative w-11 h-6 bg-green-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-green-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </td>
            </tr>
          ))
        ) : (
          <NoDataFound />
        )}
      </TableWrapper>
      <Pagination
        onPageChange={onPageChange}
        itemsPerPage={ITEMS_PER_PAGE}
        totalData={totalData}
      />
    </div>
  );
}

export default Holidays;
