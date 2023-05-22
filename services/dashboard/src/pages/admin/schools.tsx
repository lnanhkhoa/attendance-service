import React, { use, useEffect } from "react";

// components

import CardTable from "@/components/Cards/CardTable";
import Admin from "@/layouts/admin";
import Pagination from "@/components/Pagination/Pagination";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_SCHOOLS } from "@/graphql/gql/school";
import get from "lodash/get";
import { usePagination } from "react-use-pagination";

const mappingTitles = [
  { id: "1", label: "ID", mapKey: "id" },
  { id: "2", label: "School Name", mapKey: "schoolName" },
  { id: "3", label: "Created Date", mapKey: "createdAt" },
  { id: "4", label: "Status", mapKey: "status" },
];

export default function Schools() {
  const { called, data, loading } = useQuery(GET_SCHOOLS, {
    variables: {
      skip: 0,
      take: 10,
      orderBy: [{ createdAt: "desc" }],
      where: {},
      // orderBy: [
      //   {
      //     createdAt: null,
      //     schoolName: null,
      //     schoolPhotoUrl: null,
      //   },
      // ],
      // where: {
      //   schoolName: {
      //     contains: "",
      //   },
      // },
    },
  });

  const schools = get(data, "schools", []) || [];
  const schoolsCount = get(data, "schoolsCount", 0) || 0;

  const { currentPage, totalPages, setNextPage, setPreviousPage, nextEnabled, previousEnabled, startIndex, endIndex } =
    usePagination({ totalItems: schools.length, initialPage: 1, initialPageSize: 10 });

  return (
    <Admin>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="max-w-md mb-4">
            <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto">
              <div className="relative flex w-full flex-wrap items-stretch">
                <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search here..."
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                />
              </div>
            </form>
          </div>
          <CardTable title="School" data={schools} mapping={mappingTitles} />
          <Pagination className="" nextEnabled={nextEnabled} previousEnabled={previousEnabled} />
        </div>
      </div>
    </Admin>
  );
}
