import React from "react";
import { editIcon, eyeIcon, trashIcon } from "../assets/Icons/Svg";
import { formatDate, listCategories, renderSerialNumber } from "../utils/helpers";
import { ITEMS_PER_PAGE } from "../constant";
import Checkbox from "./Common/Checkbox";
import moment from "moment";

const SingleProductTableRow = ({
  data,
  currentPage,
  index,
  handleActions,
  page,
}) => {
  // updates required: price published status in date,date are not given and also category is in number
  // const { id, name, product_detail, category, status } = data;
  // const {id , basket_name,space_left,products_detail,price, offer ,date}

  console.log(data, "datayyyyyyyyyyyyyyy");

  return (
    <tr className=" border border-gray-400 ">
      <td className="text-center rounded-tl-[10px] rounded-bl-[10px] bg-white ">
        <Checkbox />
      </td>
      <td className="py-2 px-4 border-0 bg-white ">
        {renderSerialNumber(currentPage, ITEMS_PER_PAGE, index)}
      </td>
      <td className="py-2 px-4 border-0 bg-white ">
        {page === "basket" ? data.basket_name : data.name}
      </td>
      <td className="py-2 px-4 border-0 bg-white ">
        {page === "basket"
          ? data.space_left
          : data.products_detail?.inventory?.sku}
      </td>
      {page === "basket" ? (
        <td className="py-2 px-4 border-0 bg-white text-nowrap">
          {data?.products_detail?.length > 0 ? `${data?.products_detail?.length} Products` : "Not Added"}
        </td>
      ) : null}
      {/* <td
        className={`py-2 px-4 border-0 bg-white  ${
          data.status === "available" ? "text-green-500" : "text-red-500"
        }`}
      >
        {status}
      </td> */}
      <td className="py-2 px-4 border-0 bg-white">
        $
        {page === "basket"
          ? data.price
          : data.product_detail?.inventory?.regular_price}
      </td>
      <td className="py-2 px-4 border-0 bg-white">
        {/* {listCategories(data.category)} */}
        <div>
          {
            data.offer ? 
            <div>
              <div>${data?.offer?.offer_price}</div>
              <div className="text-nowrap">{`${formatDate(data?.offer?.start_offer,"DD-MM-YY")} to ${formatDate(data?.offer?.end_offer,"DD-MM-YY")}`}</div>
              
            </div> : 
            <div>No offer</div>
          }
        </div>
      </td>
      <td className="py-2 px-4 border-0 bg-white text-nowrap">{data?.date}</td>
      <td
        className={`py-2 px-4 border-0 bg-white  ${
          data.status === "available" ? "text-green-500" : "text-gray-500"
        }`}
      >
        {data.status}
      </td>
      <td className="py-2 px-4 border-0 space-x-2 bg-white rounded-tr-[10px] rounded-br-[10px] text-nowrap">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleActions("view",data.id)}
        >
          {eyeIcon}
        </button>
        <button
          onClick={() => handleActions("edit", data.id)}
          className="text-blue-500 hover:text-blue-700"
        >
          {editIcon}
        </button>
        <button
          onClick={() => handleActions("delete", data.id)}
          className="text-red-500 hover:text-red-700"
        >
          {trashIcon}
        </button>
      </td>
    </tr>
  );
};

export default SingleProductTableRow;
