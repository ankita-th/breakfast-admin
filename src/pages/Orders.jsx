import React, { useEffect, useState } from "react";
import FilterSection from "../Components/Common/FilterSection";
import {
  deleteProduct,
  getProducts,
  INSTANCE,
  makeApiRequest,
  METHODS,
} from "../api/apiFunctions";
import usePagination from "../hooks/usePagination";
import Pagination from "../Components/Common/Pagination";
import { DEFAULT_ERROR_MESSAGE, ITEMS_PER_PAGE } from "../constant";
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
import { BASKET_ENDPOINT, HOLIDAYS_ENDPOINT, ORDERS_ENDPOINT } from "../api/endpoints";

const OPTIONS = [
  { value: "Option1", label: "Option1" },
  { value: "Option2", label: "Option2" },
  { value: "Option3", label: "Option3" },
];

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
const Orders = () => {
  const navigate = useNavigate();
  const { page, onPageChange } = usePagination();
  const { showModal, toggleModal } = useModalToggle();
  const { pageLoader, buttonLoader, toggleLoader } = useLoader();
  const [products, setProducts] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [totalData, setTotalData] = useState();
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    action: "",
    name: "",
  });
  useEffect(() => {
    makeApiRequest({
      endPoint: HOLIDAYS_ENDPOINT,
      method: METHODS.get,
      instanceType: INSTANCE.authorized,
    })
      .then((res) => {
        console.log(res, "res");
        toastMessage("Holiday added successfuly", successType);
        onClose();
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
        console.log(err);
      })
      .finally(() => {
      });
  }, []);

  const handleFilterChange = (filterName, value) => {
    const temp = { ...filters };
    temp[filterName] = value;
    setFilters(temp);
  };
  const handleCategoryClick = () => {
    navigate("/categories");
  };

  const handleDeleteProduct = () => {
    setDeleteLoader((prev) => true);
    deleteProduct(itemToDelete)
      .then((res) => {
        toastMessage("Product deleted successfully", successType);
        setProducts(deleteItemBasedOnId(products, itemToDelete));
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        toggleModal();
        setItemToDelete(null);
        setDeleteLoader((prev) => false);
      });
  };

  const handleActions = (action, id) => {
    if (action === "view") {
    } else if (action === "edit") {
      // update required: make the route name better
      navigate("/add-edit-product", { state: id });
    } else if (action === "delete") {
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
              text="Add New Basket"
              onClick={() => navigate("/add-new-basket")}
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

export default Orders;
