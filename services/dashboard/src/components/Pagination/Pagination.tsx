import React from "react";
import clsx from "clsx";
import { usePagination } from "react-use-pagination";

interface PaginationProps {
  className: string;
  total: number;
  currentPage: number;
  totalPages: number;
  setNextPage: () => void;
  setPreviousPage: () => void;
  setPage: (page: number) => void;
  nextEnabled: boolean;
  previousEnabled: boolean;
  startIndex: number;
  endIndex: number;
}

const ACTIVE_STYLE = "text-white border-sky-500 bg-sky-500";
const DISABLE_STYLE = "border-sky-200 text-white bg-sky-200";

export default function Pagination({
  className,
  total = 0,
  currentPage = 1,
  totalPages,
  setNextPage,
  setPreviousPage,
  setPage,
  nextEnabled,
  previousEnabled,
  startIndex,
  endIndex,
}: PaginationProps) {
  return (
    <div className={clsx("py-1", className)}>
      <nav className="flex justify-between px-4 py-2">
        <span className="text-md">Total: {total} items</span>
        <ul className="flex pl-0 rounded list-none flex-wrap">
          <li>
            <button
              onClick={() => setPage(0)}
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-sky-500 bg-white text-sky-500">
              <i className="fas fa-chevron-left -ml-px"></i>
              <i className="fas fa-chevron-left -ml-px"></i>
            </button>
          </li>
          <li>
            <button
              disabled={!previousEnabled}
              onClick={setPreviousPage}
              className={clsx(
                "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-sky-500 bg-white text-sky-500",
                !previousEnabled && DISABLE_STYLE,
              )}>
              <i className="fas fa-chevron-left -ml-px"></i>
            </button>
          </li>
          {/* number */}
          <li>
            <button
              className={clsx(
                "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-sky-500 bg-white",
                ACTIVE_STYLE,
              )}>
              {currentPage + 1}
            </button>
          </li>
          {/*  */}
          <li>
            <button
              disabled={!nextEnabled}
              onClick={setNextPage}
              className={clsx(
                "first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-sky-500 bg-white text-sky-500",
                !nextEnabled && DISABLE_STYLE,
              )}>
              <i className="fas fa-chevron-right -mr-px"></i>
            </button>
          </li>
          <li>
            <button
              onClick={() => setPage(totalPages - 1)}
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-sky-500 bg-white text-sky-500">
              <i className="fas fa-chevron-right -mr-px"></i>
              <i className="fas fa-chevron-right -mr-px"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
