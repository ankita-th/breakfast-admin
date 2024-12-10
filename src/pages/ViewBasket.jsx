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

  useEffect(() => {
    makeApiRequest({
      endPoint: CATEGORIES_ENDPOINT,
      method: METHODS.get,
    })
      .then((res) => {
        console.log(res.data.results, "f");
        setCategories(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    makeApiRequest({
      endPoint: `${VIEW_BASKET_ENDPOINT}${id}`,
      method: METHODS.get,
    })
      .then((res) => {
        console.log(res.data.results, "f");
        setCategories(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return <div>ViewBasket</div>;
};

export default ViewBasket;
