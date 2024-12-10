import React, { Fragment } from "react";

const ListHeadings = ({
  columns,
  rowClassName = "bg-green-50",
  columnClassName = "py-2 px-4 bg-[#E7FFE9]",
}) => {
  return (
    <thead>
      <tr className={rowClassName}>
        {columns.map((hd) => (
          <Fragment>
            {hd === "checkbox" ? (
              <th className={columnClassName}>
                <input
                  type="checkbox"
                  id="checkbox"
                  className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
            ) : (
              <th className={columnClassName}>{hd}</th>
            )}
          </Fragment>
        ))}
      </tr>
    </thead>
  );
};

export default ListHeadings;
