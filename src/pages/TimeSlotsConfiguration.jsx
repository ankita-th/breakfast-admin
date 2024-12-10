import React from "react";

function TimeSlotsConfiguration() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Time Slots Configuration</h1>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">No Time Slot Configured</h1>
        <p className="text-sm text-gray-500">
          There are currently no available time slots setup. Please configure a
          time slot to proceed.
        </p>
      </div>
    </div>
  );
}

export default TimeSlotsConfiguration;
