import React, { useState } from "react";
import CommonButton from "./CommonButton";
import CommonTextField from "../../Form Fields/CommonTextField";
import { createRequiredValidation } from "../../utils/helpers";
import FormWrapper from "../../Wrappers/FormWrapper";
import { useForm } from "react-hook-form";
import AddEditSectionHeading from "../AddEditSectionHeading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { INSTANCE, makeApiRequest, METHODS } from "../../api/apiFunctions";
import { HOLIDAYS_ENDPOINT } from "../../api/endpoints";
import moment from "moment";
import { successType, toastMessage } from "../../utils/toastMessage";
import { DEFAULT_ERROR_MESSAGE } from "../../constant";

function AddEditHoliday({ formConfig, onClose }) {
  const [startDate, setStartDate] = useState();
  const Holi_date = moment(startDate).format("YYYY-MM-DD");
  const [loader, setLoader] = useState(false);
  
  const onSubmit = (data) => {
    if (!startDate) {
        setError('Date is required');
        return;
      }
    setLoader(true);
    makeApiRequest({
      endPoint: HOLIDAYS_ENDPOINT,
      method: METHODS.post,
      instanceType: INSTANCE.authorized,
      payload: {
        date: Holi_date,
        holiday: data.holiday_name,
      },
    })
      .then((res) => {
        setLoader(false);
        console.log(res,"res");
        toastMessage("Holiday added successfuly", successType);
        onClose()
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(err?.response?.data?.error || DEFAULT_ERROR_MESSAGE);
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="category-section">
          <AddEditSectionHeading onClose={onClose} text={"Add Holiday"} />
          {/* <CommonButton text="fill form" type="button" onClick={fillForm} /> */}
          <FormWrapper
            onSubmit={onSubmit}
            formConfig={formConfig}
            className="orange_btn"
            isCustomButtons={true}
          >
            <div>
              <label className="block text-gray-700 mb-2">
                Select Holiday Date <span className="text-red-500">*</span>
              </label>
              <div className="relative ">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="absolute right-3 top-2.5 pointer-events-none">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <CommonTextField
              label="Holiday Name"
              fieldName="holiday_name"
              formConfig={formConfig}
              rules={createRequiredValidation("holiday_name")}
              placeholder="Enter Stock Name"
            />
            <div className="button-section">
              <CommonButton
                type="submit"
                text="Add Holiday"
                className="flex-1 bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors duration-200"
                loader={loader}
                disabled={loader}
             />
              <CommonButton
                type="button"
                text={"Cancel"}
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              />
            </div>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}

export default AddEditHoliday;
