"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

type Props = {
  placeholder?: string;
  onChange: (date: Date | null) => void;
  value: Date | null;
};

const CustomDatePicker: React.FC<Props> = ({
  placeholder = "Lead Date",
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block w-full">
      <DatePicker
        selected={value}
        onChange={onChange}
        onCalendarOpen={() => setIsOpen(true)}
        onCalendarClose={() => setIsOpen(false)}
        dateFormat="MMMM d, yyyy"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:none outline-none"
        placeholderText={placeholder}
        popperPlacement="bottom-start"
        calendarClassName="rounded-md shadow-lg"
        customInput={
          <button type="button" className="btn-datepicker-input">
            <span className={value ? "" : "text-gray-500"}>
              {value ? format(value, "MM/dd/yyyy") : placeholder}
            </span>
            {isOpen ? (
              <GoChevronDown size={16} className="ml-2" />
            ) : (
              <GoChevronUp size={16} className="ml-2" />
            )}
          </button>
        }
      />
    </div>
  );
};

export default CustomDatePicker;
