import React from "react";
import moment from "moment";
// components

import TableDropdown from "@/components/Dropdowns/TableDropdown";

type ColorType = "light" | "dark";
interface CardTableProps {
  title: string;
  color?: ColorType;
  data: { id: string; schoolName: string; schoolPhotoUrl: string; createdAt: string; updatedAt: string }[];
  mapping: { id: string; label: string; mapKey: string }[];
}

export default function CardTable({ color = "light", title = "Card Table", data = [], mapping = [] }: CardTableProps) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-slate-700 text-white")
        }>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg " + (color === "light" ? "text-slate-700" : "text-white")}>
                {title}
              </h3>
            </div>
          </div>
        </div>

        {!data?.length ? (
          <div className="flex justify-center py-4">
            <h2 className={"font-semibold text-2xl" + (color === "light" ? "text-slate-700" : "text-white")}>
              No Data
            </h2>
          </div>
        ) : null}

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {mapping.map((item) => (
                  <ColTitle color={color} title={item.label} key={item.id} />
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.id} className="border-b">
                    <th className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                      {item.id}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        src={item.schoolPhotoUrl}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt={`school_photo_${item.id}`}></img>{" "}
                      <span className={"ml-3 font-bold " + +(color === "light" ? "text-slate-600" : "text-white")}>
                        {item.schoolName}
                      </span>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {moment(item.createdAt).format("YYYY-MM-DD")}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-circle text-emerald-500 mr-2"></i> active
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

interface ColTitleProps {
  color?: ColorType;
  title: string;
}
function ColTitle({ color, title }: ColTitleProps) {
  return (
    <th
      className={
        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
        (color === "light"
          ? "bg-slate-50 text-slate-500 border-slate-100"
          : "bg-slate-600 text-slate-200 border-slate-500")
      }>
      {title}
    </th>
  );
}
