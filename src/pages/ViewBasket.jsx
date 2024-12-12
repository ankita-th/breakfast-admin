import React, { useEffect, useState } from "react";
import { deleteIcon, trashIcon } from "../assets/Icons/Svg";
import CommonButton from "../Components/Common/CommonButton";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import {
  BASKET_ENDPOINT,
  CATEGORIES_ENDPOINT,
  VIEW_BASKET_ENDPOINT,
} from "../api/endpoints";

const ViewBasket = ({
  icon = trashIcon,
  title,
  description,
  onDelete,
  onCancel,
  loader,
}) => {
  // const [categories, setCategories] = useState([])

  // useEffect(() => {
  //   makeApiRequest({
  //     endPoint: CATEGORIES_ENDPOINT,
  //     method: METHODS.get,
  //   })
  //     .then((res) => {
  //       console.log(res.data.results, "f");
  //       setCategories(res.data.results);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {});
  // }, []);

  // useEffect(() => {
  //   makeApiRequest({
  //     endPoint: `${VIEW_BASKET_ENDPOINT}${id}`,
  //     method: METHODS.get,
  //   })
  //     .then((res) => {
  //       console.log(res.data.results, "f");
  //       setCategories(res.data.results);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {});
  // }, []);

  return(
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="border-b pb-4 mb-4">
        <p className="text-xs text-gray-500 mb-2">
          Our Exotic Basket features a selection of exotic fruits, artisanal cheese, and gourmet treats. Customize it by adding or removing items to suit your taste. Plus, there’s space to add 2 extra premium delights for a truly luxurious breakfast experience.
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <div>
              <p className="text-sm font-semibold">Price</p>
              <p className="text-black">$ 100.00</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Offer Price</p>
              <p className="text-green-500">$ 90.00</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Offer Start</p>
              <p className="text-black">15-10-2024</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Offer End</p>
              <p className="text-black">20-10-2024</p>
            </div> <div>
            <p className="text-sm font-semibold">Basket Space</p>
            <span className="text-white p-1 rounded-full bg-green-500">13</span>
          </div>

          </div>
        </div>
      </div>

      {/* Products Table */}
      <div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="font-semibold">Product</tr>
            <tr className="border-b">
              <th className="py-2 font-semibold">S. no.</th>
              <th className="py-2 font-semibold">Name</th>
              <th className="py-2 font-semibold">SKU</th>
              <th className="py-2 font-semibold">Quantity</th>
              <th className="py-2 font-semibold">Cost</th>
              <th className="py-2 font-semibold">Space Occupy</th>
              <th className="py-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: 'Pineapple', sku: 'KAN0123', quantity: '1 Unit', cost: '$ 80.00', space: 1 },
              { id: 2, name: 'Royal Apples', sku: 'CIN0123', quantity: '1 KG', cost: '$ 280.00', space: 1 },
              { id: 3, name: 'Tender Coconut', sku: 'BUN0123', quantity: '1 Unit', cost: '$ 80.00', space: 1 },
            ].map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-2 text-gray-600">{product.id}</td>
                <td className="p-2 font-semibold flex items-center gap-2">
                  <img
                    src={"/src/assets/images/basket_img.png"}
                    alt={product.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {product.name}
                </td>
                <td className="p-2 text-gray-600">{product.sku}</td>
                <td className="p-2 text-gray-600">{product.quantity}</td>
                <td className="p-2 text-gray-600">{product.cost}</td>
                <td className="p-2 text-gray-600">{product.space}</td>
                <td className="p-2">
                  <button className="text-red-500 hover:text-red-700 p-1 bg-[#FFECEC] rounded-md">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg> */}
                    {trashIcon}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Button */}
      <div className="mt-4">
        <button className="bg-[#F2FFEC] text-black px-4 py-2 rounded">
          Add Product
        </button>
      </div>
    </div>
  )
};

export default ViewBasket;
