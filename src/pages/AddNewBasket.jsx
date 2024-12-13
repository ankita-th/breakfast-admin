import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import CommonTextField from "../Form Fields/CommonTextField";
import CommonDateField from "../Form Fields/CommonDateField";
import { TodoValidations } from "../Validations/validations";
import { useForm } from "react-hook-form";
import Checkbox from "../Components/Common/Checkbox";
import PublishCard from "../Components/Common/PublishCard";
import CommonButton from "../Components/Common/CommonButton";
import { makeApiRequest, METHODS } from "../api/apiFunctions";
import ImageUploadSection from "../Form Fields/ImageUploadSection";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASKET_ENDPOINT, PRODUCT_ENDPOINT, TODO_ENDPOINT } from "../api/endpoints";
import AddEligibleProduct from "../Modals/AddEligibleProduct";
import Select from 'react-select';
import CommonTextEditor from "../Form Fields/CommonTextEditor";

const AddNewBasket = () => {
  const [showEligibleProducts, setShowEligibleProducts] = useState(false);
  const formConfig = useForm();
  const [file, setFile] = useState();
  const [newFiles, setNewFiles] = useState();
  const [content, setContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [start_date, setStartDate] = useState();
  const [end_date, setEndDate] = useState();


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePublic = (values) => {
    console.log(values, "values");
    makeApiRequest({
      endPoint: BASKET_ENDPOINT,
      // params: apiFilters,
      method: METHODS.post,
      payload: {
        basket_name: values?.basket_name,
        product_price: values?.basket_price,
        offer: {
          offer_price: values?.offer_price,
          start_offer: start_date,
          end_offer: end_date,
        },
        content: content,
        space_left: values?.available_space,
        products: values?.eligible_products,
        basket_images: file,
      },
    })
      .then((res) => {
        console.log(res, "f");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const handleEligibleProducts = () => {
    setShowEligibleProducts(true);
  };


  return (
    <div className="w-full">
      <form onSubmit={formConfig.handleSubmit(handlePublic)}>
        <div className="flex justify-between w-full gap-6">
        <div className="w-full">
          {/* <h1 className="border-b border-gray-300">Add Basket</h1> */}
          <div className="flex gap-4 w-full">
            <div className="flex-1">
            <CommonTextField
              label="Basket Name *"
              fieldName="basket_name"
              className="px-4 py-2 bg-white focus:bg-transparent w-full text-sm outline-[#333] rounded-lg transition-all mt-2"
              placeholder={"Basket Name"}
              rules={TodoValidations["basket_name"]}
              formConfig={formConfig}
            />
            </div>
            <div className="flex-1">
            <CommonTextField
              label="Price *"
              fieldName="basket_price"
              className="px-4 py-2 bg-white focus:bg-transparent w-full text-sm outline-[#333] rounded-lg transition-all mt-2"
              formConfig={formConfig}
              placeholder={"Basket Price"}
              rules={TodoValidations["basket_price"]}
              isDecimal={true}
              isNumberOnly={true}
            />
            </div>
          </div>
          <div className="flex mt-4 gap-4 items-center mb-4">
            <input
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            Add Offer Price
          </div>
          {isChecked && (
            <div className="flex gap-2 justify-between">
              <div className="flex-1">
              <CommonTextField
                label="Offer Price*"
                fieldName="offer_price"
                className="px-4 py-3 bg-white focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
                placeholder={"Offer Price"}
                rules={TodoValidations["offer_price"]}
                formConfig={formConfig}
                isNumberOnly={true}
              />
              </div>
              <div className="flex-1">
              {/* <label>Start Offer</label>
              <DatePicker
                selected={start_date}
                onChange={(date) => setStartDate(date)}
                className="px-4 py-3 bg-white focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
              /> */}
               <CommonDateField
            label="Start offer"
            fieldName="start_offer"
            // rules={createRequiredValidation("Sale price date from")}
            formConfig={formConfig}
            className="w-full p-2 border rounded-md"
          />
              </div>
              <div className="flex-1">
              <CommonDateField
            label="End offer *"
            fieldName="end_offer"
            // rules={createRequiredValidation("Sale price date from")}
            formConfig={formConfig}
            className="w-full p-2 border rounded-md"
          />
              </div>
            </div>
          )}
          <div className="description my-4">
            <CommonTextEditor
              formConfig={formConfig}
              label="Description"
              fieldName="description"
              placeholder="Type..."
              // rules={} // for this required validation cannot be passed through rules because it has some different way to handle required validation
              requiredMessage={"Description is required"} // if this prop is not passed required validation is not applied
            />
            </div>
          <div className="rounded-lg shadow-sm border border-gray-300 p-4 bg-white w-full space-y-2 ">
            <span className="">
              <h2>Basket Configuration</h2>
            </span>
            <CommonTextField
              label="Enter Available Space In Basket*"
              fieldName="available_space"
              formConfig={formConfig}
              placeholder={"Enter available Space in basket"}
              rules={TodoValidations["basket_price"]}

            />
            {/* <CommonTextField
              label="Eligible Products*"
              fieldName="eligible_products"
              formConfig={formConfig}
              placeholder={"Select Eligible Products"}
              onChange={handleEligibleProducts}
              rules={TodoValidations["basket_price"]}
            /> */}
            <div className="px-4 py-3 bg-gray-100 w-full text-sm rounded-sm transition-all duration-200 text-opacity-40" onClick={handleEligibleProducts}>
              Select Eligible Products
            </div>
          </div>
        </div>
        <div className="grid gap-4 w-2/6">
          <div className="flex gap-4">
            <CommonButton
              type="button"
              text="Draft"
              className="bg-gray-500 rounded-md py-2 px-6 h-fit"
              // icon={}
            />
            <CommonButton
              type="submit"
              text="Public"
              onClick={handlePublic}
              className="bg-green-500 rounded-md py-2 px-6 h-fit"
              // icon={}
            />
          </div>
          <PublishCard />
          <div className="px-4 py-3 bg-white focus:bg-transparent w-1/2 text-sm outline-[#333] rounded-sm transition-all w-full">
            <ImageUploadSection
              file={file}
              setFile={setFile}
              label="Upload Features Image"
            />
          </div>
          <div className="px-4 py-3 bg-white focus:bg-transparent w-1/2 text-sm outline-[#333] rounded-sm transition-all w-full">
            <ImageUploadSection
              file={newFiles}
              setFile={setNewFiles}
              label="Add Images"
            />
          </div>
          {showEligibleProducts && <AddEligibleProduct onClose={() => setShowEligibleProducts(false)} onSelect={() => setShowEligibleProducts(false)} />}
        </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewBasket;
