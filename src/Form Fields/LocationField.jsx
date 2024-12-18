import React from "react";
import Autocomplete from "react-google-autocomplete";
import ErrorMessage from "../Components/Common/ErrorMessage";
// add this inside env
const GOOGLE_MAP_API_KEY = "AIzaSyCA-pKaniZ4oeXOpk34WX5CMZ116zBvy-g";
const LocationField = ({
  fieldName,
  options,
  formConfig,
  type = "text",
  label,
  className = "commonInput",
  placeholder,
  rules,
}) => {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = formConfig;
  const address = watch(fieldName);

  return (
    <div>
      <div className="label">{label}</div>
      <Autocomplete
        {...register(fieldName, {
          ...rules,
          onChange: (e) => {
            setValue(fieldName, e.target.value);
            clearErrors(fieldName);
          },
        })}
        apiKey={GOOGLE_MAP_API_KEY}
        onPlaceSelected={(place) => {
          setValue(fieldName, place);
        }}
        value={address?.formatted_address || address} //in case of create/post the value will contain formatted_address key but a normal string in case of edit
        options={options}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className={className}
      />
      <ErrorMessage fieldName={fieldName} errors={errors} />
    </div>
  );
};

export default LocationField;
