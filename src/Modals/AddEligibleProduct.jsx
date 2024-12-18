import React, { useEffect, useState } from "react";
import { INSTANCE, makeApiRequest, METHODS } from "../api/apiFunctions";
import { CATEGORIES_ENDPOINT, GET_PRODUCT_ENDPOINT } from "../api/endpoints";
import basketImg from "../assets/images/cookie_img.png";
import CommonButton from "../Components/Common/CommonButton";

function AddEligibleProduct({ onClose, onSelect, formConfig }) {
  const [productDetails, setProductDetails] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const [sideBarOptions, setSideBarOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  console.log(formConfig, "kdjfkjdfjdfkfdjfformconfig");
  const { watch } = formConfig;
  console.log(watch(), "watchhshhdhdkhdhf");

  // const dummyCategories = [
  //   { id: 1, name: "Fruits" },
  //   { id: 2, name: "Vegetables" },
  //   { id: 3, name: "Dairy" },
  //   { id: 4, name: "Bakery" },
  // ];

  // const dummyProducts = [
  //   { id: 1, name: "Apple", category: "milk", price: 5, unit: "kg" },
  //   { id: 2, name: "Banana", category: "Fruits", price: 2, unit: "kg" },
  //   { id: 3, name: "Carrot", category: "Vegetables", price: 3, unit: "unit" },
  //   { id: 4, name: "Milk", category: "Dairy", price: 4, unit: "kg" },
  //   { id: 5, name: "Cheese", category: "Dairy", price: 8, unit: "unit" },
  //   { id: 6, name: "Bread", category: "Bakery", price: 3, unit: "kg" },
  //   { id: 7, name: "Cake", category: "Bakery", price: 10, unit: "unit" },
  // ];

  // useEffect(() => {
  // Set dummy data for categories and products
  // setProductDetails(dummyProducts);
  // }, []);

  const handleAllCategories = () => {
    setSideBar((prev) => !prev); // Toggle sidebar state
  };

  const handleCategorySelection = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Filter products based on selected categories

  console.log(selectedCategories, "sdkfjskdjfkdsljfkldsf");

  const filteredProducts =
    selectedCategories.length > 0
      ? productDetails.filter((product) =>
          selectedCategories.some((category) =>
            product.category.some((item) => item.name === category)
          )
        )
      : productDetails;

  useEffect(() => {
    // Fetch products
    makeApiRequest({
      endPoint: GET_PRODUCT_ENDPOINT,
      method: METHODS.get,
    })
      .then((res) => {
        console.log(res, "ddmkdskdskdsksdewaresponse------------");
        setProductDetails(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Fetch categories
    makeApiRequest({
      endPoint: CATEGORIES_ENDPOINT,
      method: METHODS.get,
    })
      .then((res) => {
        console.log(res, "ddmkdskdskdsksdewaresponse");
        setSideBarOptions(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // const handleAllCategories = () => {
  //   setSideBar((prev) => !prev); // Toggle sidebar state
  // };

  // const handleSideBar = (category) => {
  //   setSelectedCategory(category);

  //   if (category === "All") {
  //     makeApiRequest({
  //       endPoint: GET_PRODUCT_ENDPOINT,
  //       method: METHODS.get,
  //       instanceType: INSTANCE.authorized,
  //     })
  //       .then((res) => {
  //         setProductDetails(res.data.results);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } else {
  //     makeApiRequest({
  //       endPoint: "/products/categories-products/",
  //       method: METHODS.get,
  //       instanceType: INSTANCE.authorized,
  //       params: {
  //         page: "1",
  //         category: category.name,
  //       },
  //     })
  //       .then((res) => {
  //         setProductDetails(res.data.results);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // };

  return (
    <div>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto relative">
          {/* Modal Header */}
          <div className="flex justify-end mb-4">
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

          {/* Search and Filter */}
          <div className="flex justify-evenly gap-10 items-center">
            <CommonButton
              // text={sideBar ? "Close Sidebar" : "All Categories"}
              text="All Categories"
              onClick={handleAllCategories}
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            />

            <div className="flex-1">
              <input
                type="text"
                placeholder="Search Product"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="bg-[#FFF6EE] w-48 flex justify-between py-1 px-3 rounded-full items-center">
              <div className="text-nowrap">Available Space</div>
              <div className="bg-[#F97316] rounded-full py-1 px-2">13</div>
            </div>
          </div>

          {/* Sidebar */}
          {/* {sideBar && ( */}
          <div
            className={`absolute top-0 left-0 h-full w-60 bg-white shadow-lg transform ${
              sideBar ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 z-40`}
          >
            <div
              className="flex justify-end pr-2 font-medium cursor-pointer"
              onClick={handleAllCategories}
            >
              x
            </div>
            <div className="py-4 flex justify-center">Categories</div>
            <ul className="space-y-2 text-black">
              {sideBarOptions?.map((category) => (
                <li
                  key={category.id}
                  className={`cursor-pointer text-left border-b py-4 pl-4 font-medium !mt-0 ${
                    selectedCategories.includes(category.name)
                      ? "bg-[#DFFFDC]"
                      : "hover:text-green-600"
                  }`}
                  onClick={() => handleCategorySelection(category.name)}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    readOnly
                    className="mr-2"
                  />
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          {/* )} */}

          {/* Products Grid */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer shadow-md p-4 relative bg-white"
              >
                {/* Container for image and checkbox */}
                <div className="relative">
                  <img
                    src={basketImg}
                    alt={product.name}
                    className="w-full h-32 rounded-md"
                  />
                  {/* Checkbox in the top-left corner */}
                  <div className="absolute top-0 left-0">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      // checked={selectedCategories.includes(product.category)}
                      // onChange={() => handleCategorySelection(product.category)}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-center">
                    <div className="font-medium text-sm">{product.name}</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-sm text-gray-600">
                      ${product.price}.00 {product.unit}
                    </div>
                  </div>
                  {/* <div className="bg-[#F2FFEC] w-full flex justify-between py-1 px-3 rounded-full items-center">
                    <div className="text-nowrap text-xs">Space Occupy</div>
                    <div className="bg-[#4BAF50] rounded-full py-1 px-2 text-xs">
                      1
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <button className="orange_btn" type="button">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEligibleProduct;
