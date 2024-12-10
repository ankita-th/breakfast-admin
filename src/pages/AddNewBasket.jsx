import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import CommonTextField from "../Form Fields/CommonTextField";
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
    <div className="flex">
      <form onSubmit={formConfig.handleSubmit(handlePublic)}>
        <div>
          <h1 className="border-b border-gray-300">Add Basket</h1>
          <div className="flex gap-4">
            <CommonTextField
              label="Basket Name *"
              fieldName="basket_name"
              className="px-4 py-3 bg-white focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
              placeholder={"Basket Name"}
              rules={TodoValidations["basket_name"]}
              formConfig={formConfig}
            />
            <CommonTextField
              label="Price *"
              fieldName="basket_price"
              className="px-4 py-3 bg-white focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
              formConfig={formConfig}
              placeholder={"Basket Price"}
              rules={TodoValidations["basket_price"]}
              isDecimal={true}
            />
          </div>
          <h3>
            <input
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            Add Offer Price
          </h3>
          {isChecked && (
            <div className="flex gap-4">
              <CommonTextField
                label="Offer Price*"
                fieldName="offer_price"
                className="px-4 py-3 bg-white focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"
                placeholder={"Offer Price"}
                rules={TodoValidations["offer_price"]}
                formConfig={formConfig}
              />
              <label>Start Offer</label><br></br>
              <DatePicker
                selected={start_date}
                onChange={(date) => setStartDate(date)}
              />
              <label>End Offer</label><br></br>
              <DatePicker
                selected={end_date}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          )}
          <div className="rounded-lg shadow-sm border border-gray-300 p-8 bg-white max-w-screen-md w-full">
            <ReactQuill value={content} onChange={setContent} />
          </div>
          <div className="rounded-lg shadow-sm border border-gray-300 p-8 bg-white max-w-screen-md w-full">
            <span className="p-2">
              <h2>Basket Configuration</h2>
            </span>
            <CommonTextField
              label="Enter Available Space In Basket*"
              fieldName="available_space"
              formConfig={formConfig}
              placeholder={"Enter available Space in basket"}
              rules={TodoValidations["basket_price"]}
            />
            <CommonTextField
              label="Eligible Products*"
              fieldName="eligible_products"
              formConfig={formConfig}
              placeholder={"Select Eligible Products"}
              onChange={handleEligibleProducts}
              rules={TodoValidations["basket_price"]}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <CommonButton
              type="button"
              text="Draft"
              className="bg-gray-500 rounded-md p-2"
              // icon={}
            />
            <CommonButton
              type="submit"
              text="Public"
              onClick={handlePublic}
              className="bg-green-500 rounded-md p-2"
              // icon={}
            />
          </div>
          <PublishCard />
          <div className="px-4 py-3 bg-white focus:bg-transparent w-1/2 text-sm outline-[#333] rounded-sm transition-all">
            <ImageUploadSection
              file={file}
              setFile={setFile}
              label="Upload Features Image"
            />
          </div>
          <div className="px-4 py-3 bg-white focus:bg-transparent w-1/2 text-sm outline-[#333] rounded-sm transition-all">
            <ImageUploadSection
              file={newFiles}
              setFile={setNewFiles}
              label="Add Images"
            />
          </div>
          {showEligibleProducts && <AddEligibleProduct onClose={() => setShowEligibleProducts(false)} onSelect={() => setShowEligibleProducts(false)} />}
        </div>
      </form>
    </div>
  );
};

export default AddNewBasket;