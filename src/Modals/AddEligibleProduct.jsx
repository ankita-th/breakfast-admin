import React, { useEffect, useState } from "react";
import { INSTANCE, makeApiRequest, METHODS } from "../api/apiFunctions";
import { CATEGORIES_ENDPOINT, PRODUCT_ENDPOINT } from "../api/endpoints";
import { baseURL } from "../api/apiConfig";
import basketImg from "../assets/images/cookie_img.png";
import CommonButton from "../Components/Common/CommonButton";

function AddEligibleProduct({ onClose, onSelect }) {
  const [productDetails, setProductDetails] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const [sideBarOptions, setSideBarOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // console.log(products, "products");
  console.log(sideBarOptions, "sideBarOptions");
  console.log(sideBar, "sideBar");
  console.log(selectedCategory, "selectedCategory");
  useEffect(() => {
    makeApiRequest({
      endPoint: PRODUCT_ENDPOINT,
      method: METHODS.get,
    })
      .then((res) => {
        console.log(res.data.results, "f");
        setProductDetails(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
    makeApiRequest({
      endPoint: CATEGORIES_ENDPOINT,
      method: METHODS.get,
    })
      .then((res) => {
        console.log(res.data.results, "f");
        setSideBarOptions(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  const handleAllCategories = () => {
    console.log("All Categories");
    setSideBar(true);
  };
  // const handleSideBar = (category) => {
  //   // setSideBar(true)
  //   console.log("here")
  //   setSelectedCategory(category)
  // }

  const handleSideBar = (category) => {
    console.log(category, "category");
    setSelectedCategory(category);
    if (category === "All") {
      makeApiRequest({
        endPoint: PRODUCT_ENDPOINT,
        method: METHODS.get,
        instanceType: INSTANCE.authorized,
      })
        .then((res) => {
          console.log(res.data.results, "response");
          setProductDetails(res.data.results);
        })
        .catch((err) => {
          console.log(err, "err");
          // toastMessages(err.message || DEFAULT_ERROR_MESSAGE);
        });
    } else {
      makeApiRequest({
        endPoint: "/products/categories-products/",
        method: METHODS.get,
        instanceType: INSTANCE.authorized,
        params: {
          page: "1",
          category: category.name,
        },
      })
        .then((res) => {
          console.log(res.data.results, "response");
          setProductDetails(res.data.results);
        })
        .catch((err) => {
          console.log(err, "err");
          // toastMessages(err.message || DEFAULT_ERROR_MESSAGE);
        });
    }
  };

  console.log(productDetails, "productDetails");


  return (
    <div>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
          {/* Modal Header */}

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Select Eligible Products</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Product"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Filter Button */}
          {/* <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md" >
            All Categories
          </button> */}

          <CommonButton
            text="All Categories"
            onClick={handleAllCategories}
            type="button"
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
          />

          {sideBar && (
            <aside className="w-[15rem] bg-[#ffffff] text-center rounded-lg mob-product-category flex-none">
              <ul className="space-y-2 text-black border border-gray-300">
                <li
              className={
                selectedCategory === "All"
                  ? "bg-[#DFFFDC] text-left py-[10px] pl-[40px] text-[16px] font-medium"
                  : "hover:text-green-600 cursor-pointer text-left py-[10px] pl-[40px] text-[16px] font-medium border border-[#C1C1C1] !mt-0"
              }
              onClick={() => handleSideBar("All")}
            >
              All
            </li>
                {sideBarOptions?.map((category) => (
                  <li
                    key={category.id}
                    className={
                      selectedCategory?.name &&   selectedCategory?.name == category?.name
                        ? "bg-[#DFFFDC] text-left py-[10px] pl-[40px] text-[16px] font-medium"
                        : "hover:text-green-600 cursor-pointer text-left py-[10px] pl-[40px] text-[16px] font-medium border border-[#C1C1C1] !mt-0"
                    }
                    onClick={() => handleSideBar(category)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {productDetails?.map((product) => (
              <div
                key={product.id}
                // onClick={() => handleProductSelect(product)}
                //   className={`cursor-pointer rounded-lg border p-2 relative ${
                //     selectedProducts.find(p => p.id === product.id)
                //       ? 'border-green-500 bg-green-50'
                //       : 'border-gray-200'
                //   }`}
              >
                <img
                  // src={product.featured_image ? `${baseURL}${product.featured_image}` : basketImg}
                  src={basketImg}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="mt-2">
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${product?.product_detail?.variants[0]?.regular_price}kg
                  </p>
                </div>
                {/* {selectedProducts.find(p => p.id === product.id) && ( */}
                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
                {/* )} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEligibleProduct;
