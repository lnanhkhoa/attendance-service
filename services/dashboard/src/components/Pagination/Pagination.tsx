import React from "react";
import clsx from "clsx";

interface PaginationProps {
  className: string;
  previousEnabled: boolean;
  nextEnabled: boolean;
  total: number;
}

const ACTIVE_STYLE = "border-sky-500 text-white bg-sky-500";
const DISABLE_STYLE = "border-sky-200 text-white bg-sky-200";

export default function Pagination({ className, total, previousEnabled, nextEnabled }: PaginationProps) {
  return (
    <div className={clsx("py-1", className)}>
      <nav className="flex justify-between px-4 py-2">
        <span className="text-md">Total: {total} items</span>
        <ul className="flex pl-0 rounded list-none flex-wrap">
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-sky-500 bg-white text-sky-500">
              <i className="fas fa-chevron-left -ml-px"></i>
              <i className="fas fa-chevron-left -ml-px"></i>
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-sky-500 bg-white text-sky-500">
              <i className="fas fa-chevron-left -ml-px"></i>
            </a>
          </li>
          {/* number */}
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-sky-500 bg-white text-sky-500">
              1
            </a>
          </li>
          {/*  */}
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-sky-500 bg-white text-sky-500">
              <i className="fas fa-chevron-right -mr-px"></i>
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-sky-500 bg-white text-sky-500">
              <i className="fas fa-chevron-right -mr-px"></i>
              <i className="fas fa-chevron-right -mr-px"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
