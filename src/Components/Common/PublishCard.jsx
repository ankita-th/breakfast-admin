import React from "react";

function PublishCard() {
  return (
    <div>
      <div className="px-4 py-3 bg-white focus:bg-transparent w-1/2 text-sm outline-[#333] rounded-sm transition-all w-full">
        <h1 className="border-b border-gray-300">Publish</h1>
        <h2>Status</h2>
        <span className="flex justify-between">
          <p>Draft </p>
          <p className="underline text-green-400">Edit</p>
        </span>
        <h2>Visibility</h2>
        <span className="flex justify-between">
          <p>Public</p>
          <p className="underline text-green-400">Edit</p>
        </span>
      </div>
    </div>
  );
}

export default PublishCard;
