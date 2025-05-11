"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { getPagination, PAGE_SIZE } from "@/helper/filter";
import { PiDotsThree } from "react-icons/pi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Contact } from "@/types/interface";
import { addDays, format } from "date-fns";
import { DatePickerRange } from "@/components/DatePickerRange";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { RangeKeyDict } from "react-date-range";

const ContactPage: React.FC = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [isFilteredDate, setIsFilteredDate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const dataToPaginate = isFilteredDate ? filteredContacts : contacts;

  const totalPages = Math.ceil(dataToPaginate.length / PAGE_SIZE);
  const pages = getPagination(currentPage, totalPages);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const currentData = dataToPaginate.slice(startIdx, startIdx + PAGE_SIZE);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const placeholder = "Customer Date";

  const applyDateFilter = () => {
    if (!isFilteredDate) return;
    setIsOpen(false);
    const { startDate, endDate } = dateRange[0];

    const filtered = contacts.filter((c) => {
      const customerDate = new Date(c.properties.hs_v2_date_entered_customer);
      return (
        startDate &&
        endDate &&
        customerDate >= startDate &&
        customerDate <= endDate
      );
    });

    setFilteredContacts(filtered);
    setIsFilteredDate(true);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`)
      .then(async (res) => {
        if (res.status === 401) {
          // Handle unauthorized (token missing/expired)
          console.warn("Unauthorized: Please authenticate via HubSpot OAuth.");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === 401) {
          router.push("/");
        }
        if (data && data.results) {
          setContacts(data.results);
        } else {
          setContacts([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  const handlePickDate = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeDateRange = (item: RangeKeyDict) => {
    setIsFilteredDate(true);
    setDateRange([
      {
        startDate: item.selection.startDate || new Date(),
        endDate: item.selection.endDate || new Date(),
        key: item.selection.key || "selection",
      },
    ]);
  };

  const TableData = () => (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="table-th">Email</th>
          <th className="table-th">First Name</th>
          <th className="table-th">Last Name</th>
          <th className="table-th">Customer Date</th>
          <th className="table-th">Lead Date</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800">
        {currentData.map((c) => (
          <tr key={c.id}>
            <td className="table-td">{c.properties.email}</td>
            <td className="table-td">{c.properties.firstname}</td>
            <td className="table-td">{c.properties.lastname}</td>
            <td className="table-td">
              {c.properties.hs_v2_date_entered_customer &&
                format(
                  new Date(c.properties.hs_v2_date_entered_customer),
                  "MM/dd/yyyy"
                )}
            </td>
            <td className="table-td">
              {c.properties.hs_v2_date_entered_lead &&
                format(
                  new Date(c.properties.hs_v2_date_entered_lead),
                  "MM/dd/yyyy"
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 ml-auto">
          <div className="w-xs relative">
            <button
              type="button"
              className="btn-datepicker-input cursor-pointer"
              onClick={handlePickDate}
            >
              <span className={isFilteredDate ? "" : "text-gray-500"}>
                {isFilteredDate
                  ? format(dateRange[0].startDate, "MM/dd/yyyy") +
                    " - " +
                    format(dateRange[0].endDate, "MM/dd/yyyy")
                  : placeholder}
              </span>
              {isOpen ? (
                <GoChevronDown size={16} className="ml-2" />
              ) : (
                <GoChevronUp size={16} className="ml-2" />
              )}
            </button>
            <div
              className={`absolute top-full mt-2 border border-gray-200 right-0 ${
                isOpen ? "" : "hidden"
              }`}
            >
              <DatePickerRange
                onChangeDateRange={handleChangeDateRange}
                state={dateRange}
              />
            </div>
          </div>
          <button
            className="btn-primary ml-auto cursor-pointer"
            onClick={() => applyDateFilter()}
          >
            Connect
          </button>
        </div>
      </div>

      {contacts.length > 0 ? (
        <TableData />
      ) : (
        <div className="flex items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin" size={40} />
        </div>
      )}

      <div className="flex items-center justify-between mt-4 py-4">
        <button
          className="btn-paginate disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          <FiArrowLeft size={20} />
          <span>Previous</span>
        </button>

        <div className="flex gap-1 items-end">
          {pages.map((page, idx) =>
            typeof page === "string" ? (
              <span key={idx} className="px-2 py-1">
                <PiDotsThree size={20} />
              </span>
            ) : (
              <button
                key={idx}
                className={`btn-paginate p-2 border-none ${
                  currentPage === page
                    ? "bg-gray-50 text-white font-semibold"
                    : "font-medium"
                }`}
                onClick={() => setCurrentPage(page as number)}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          className="btn-paginate disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          <span>Next</span>
          <FiArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
