import React, { useEffect, useState } from "react";
import FilterSection from "../Components/Common/FilterSection";
import { deleteProduct, getProducts, makeApiRequest, METHODS } from "../api/apiFunctions";
import usePagination from "../hooks/usePagination";
import Pagination from "../Components/Common/Pagination";
import {
  DEFAULT_ERROR_MESSAGE,
  ITEMS_PER_PAGE,
} from "../constant";
import CommonButton from "../Components/Common/CommonButton";
import useModalToggle from "../hooks/useModalToggle";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { trashIcon } from "../assets/Icons/Svg";
import { successType, toastMessage } from "../utils/toastMessage";
import "react-toastify/dist/ReactToastify.css";
import useLoader from "../hooks/useLoader";
import PageLoader from "../loaders/PageLoader";
import NoDataFound from "../Components/Common/NoDataFound";
import { useNavigate } from "react-router-dom";
import TableWrapper from "../Wrappers/TableWrapper";
import { deleteItemBasedOnId } from "../utils/helpers";
import SingleProductTableRow from "../Components/SingleProductTableRow";
import { DASHBOARD_ENDPOINT } from "../api/endpoints";

const OPTIONS = [
  { value: "Option1", label: "Option1" },
  { value: "Option2", label: "Option2" },
  { value: "Option3", label: "Option3" },
];

// const DUMMY_COLUMNS = [
//   { label: "S.no", key: "projectName" },
//   { label: "Name", key: "name" },
//   { label: "SKU", key: "sku" },
//   { label: "Stock", key: "status" },
//   { label: "Price", key: "" },
//   { label: "Category", key: "category" },
//   { label: "Date", key: "" },
//   { label: "Action", key: "projectStatus" },
// ];
const PRODUCT_PAGE_COLUMNS = [
  "checkbox",
  "S.no",
  "Name",
  "SKU",
  "Stock",
  "Price",
  "Category",
  "Date",
  "Action",
  // this extra space is for view ,edit  and delete actions button they do not have any column headings
  "",
];
const filterFields = [
  {
    type: "select",
    defaultOption: "All",
    options: OPTIONS,
    filterName: "type",
  },
  {
    type: "select",
    defaultOption: "Select Category",
    options: OPTIONS,
    filterName: "category",
  },
  {
    type: "select",
    defaultOption: "Select Action",
    options: OPTIONS,
    filterName: "action",
  },
  {
    type: "search",
    filterName: "name",
    placeholder: "Search Product",
  },
];
const Products = () => {
  const navigate = useNavigate();
  const { page, onPageChange } = usePagination();
  const { showModal, toggleModal } = useModalToggle();
  const { pageLoader, buttonLoader, toggleLoader } = useLoader();
  const [products, setProducts] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [totalData, setTotalData] = useState();
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [productId, setProductId] = useState(null);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    action: "",
    name: "",
  });

  useEffect(() => {
    const apiFilters = {
      ...filters,
      page: page,
    };
    toggleLoader("pageLoader");
    getProducts(apiFilters)
      .then((res) => {
        setProducts(res?.data?.results);
        setTotalData(res?.data?.count);
      })
      .catch((err) => console.log(err))
      .finally(() => toggleLoader("pageLoader"));
  }, [filters, page]);

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };
  const handleCategoryClick = () => {
    navigate("/categories");
  };

  console.log(productId, "productId");

  const handleDeleteProduct = () => {
    setDeleteLoader((prev) => true);
    // deleteProduct(itemToDelete)
    //   .then((res) => {
    //     toastMessage("Product deleted successfully", successType);
    //     setProducts(deleteItemBasedOnId(products, itemToDelete));
    //   })
    //   .catch((err) => {
    //     toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
    //   })
    //   .finally(() => {
    //     toggleModal();
    //    setItemToDelete(null);
    //     setDeleteLoader((prev) => false);
    //   });

      makeApiRequest({
        endPoint:  `/products/${productId}/delete-product`,
        method: METHODS.delete,
      })
        .then((res) => {
          console.log(res.data, "f");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
  };

  const handleActions = (action, id) => {
    console.log(action, id, "action,id");
    if (action === "view") {
    } else if (action === "edit") {
      // update required: make the route name better
      navigate("/add-edit-product", { state: id });
    } else if (action === "delete") {
      setProductId(id);
      toggleModal();
      setItemToDelete(id);
    }
  };

  return (
    <>
      {/* update required : depending on the css of the loader make sure we have to show other data or not */}
      {pageLoader ? (
        <PageLoader />
      ) : (
        <div>
          <FilterSection
            filterFields={filterFields}
            handleFilterChange={handleFilterChange}
          >
            <CommonButton
              text="Categories"
              onClick={() => navigate("/categories")}
              type="button"
              className="grey_btn"
            />
            <CommonButton
              text="Add New Product"
              onClick={() => navigate("/add-edit-product")}
              type="button"
              className="orange_btn"
            />
          </FilterSection>
          {/* product listing */}
          <TableWrapper columns={PRODUCT_PAGE_COLUMNS}>
            {products?.length ? (
              products?.map((dt, idx) => (
                <SingleProductTableRow
                  key={idx}
                  data={dt}
                  currentPage={page}
                  index={idx}
                  handleActions={handleActions}
                />
              ))
            ) : (
              // updates required:Create a better no data found component
              <NoDataFound />
            )}
          </TableWrapper>

          <Pagination
            onPageChange={onPageChange}
            itemsPerPage={ITEMS_PER_PAGE}
            totalData={totalData}
          />
        </div>
      )}
      {showModal && (
        <DeleteConfirmationModal
          icon={trashIcon}
          title="Are you sure you want to delete this product?"
          description="This action cannot be redo. Deleting this product will permanently remove it from your inventory, and it will no longer be available for purchase."
          onCancel={() => {
            setItemToDelete(null);
            toggleModal();
          }}
          onDelete={handleDeleteProduct}
          deleteLoader={deleteLoader}
        />
      )}
    </>
  );
};

export default Products;
