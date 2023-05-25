import React, { useEffect, useMemo, useState } from "react";

import Admin from "@/layouts/admin";
import { useLazyQuery } from "@apollo/client";
import { GET_ATTENDANCES, GET_SCHOOL } from "@/graphql/gql/school";
import { useRouter } from "next/router";
import { usePagination } from "react-use-pagination";
import Pagination from "@/components/Pagination/Pagination";
import CardTableAttendance from "@/components/Cards/CardTableAttendance";

import { School } from "@/graphql/types";
import { get } from "lodash";
import clsx from "clsx";
import { toFahrenheit, IMAGE_DEFAULT, SelectTime, getQueryTime } from "@/utils/constants";

const mappingTitles = [
  { id: "1", label: "ID", mapKey: "id" },
  { id: "2", label: "User", mapKey: "userName" },
  { id: "4", label: "Check Type", mapKey: "type" },
  { id: "5", label: "Image", mapKey: "capturePhotoUrl" },
  { id: "6", label: "Temperature", mapKey: "temperature" },
  { id: "7", label: "Created At", mapKey: "createdAt" },
];

export default function SchoolDetail() {
  const router = useRouter();
  const id = String(router.query.id);
  const [getSchool] = useLazyQuery(GET_SCHOOL);

  const [selectTime, setSelectTime] = useState(SelectTime.today);

  // school
  const [schoolData, setSchoolData] = useState<School | null>(null);
  const schoolImage = schoolData?.schoolPhotoUrl || IMAGE_DEFAULT;
  const schoolName = schoolData?.schoolName;
  const schoolLocation = String(schoolData?.city) + ", " + String(schoolData?.country);

  // attendances
  const [getAttendances, { data: attendRes, loading }] = useLazyQuery(GET_ATTENDANCES, { fetchPolicy: "no-cache" });
  const attendances = useMemo(() => get(attendRes, "attendances", []), [attendRes]);
  const [total, setTotal] = useState(0);
  const [isCelsius, setIsCelsius] = useState(true);

  const attendanceVariables = (id: string, currentPage = 0, selectTime) => {
    return {
      where: {
        school: {
          id: {
            equals: id,
          },
        },
        ...getQueryTime(selectTime),
      },
      take: 10,
      skip: currentPage * 10,
      orderBy: [{ createdAt: "desc" }],
    };
  };

  const {
    currentPage,
    totalPages,
    nextEnabled,
    previousEnabled,
    startIndex,
    endIndex,
    setNextPage,
    setPreviousPage,
    setPage,
  } = usePagination({ totalItems: total, initialPageSize: 10 });

  function onNextPage() {
    if (!nextEnabled) return;
    const nextPage = currentPage + 1;
    getAttendances({ variables: attendanceVariables(id, nextPage, selectTime) }).then((res) => {
      setNextPage();
    });
  }
  function onPreviousPage() {
    if (!previousEnabled) return;
    const previousPage = currentPage - 1;
    getAttendances({ variables: attendanceVariables(id, previousPage, selectTime) }).then((res) => {
      setPreviousPage();
    });
  }
  function onSetPage(page: number) {
    getAttendances({ variables: attendanceVariables(id, page, selectTime) }).then((res) => {
      setPage(page);
    });
  }

  useEffect(() => {
    if (!loading && attendRes?.attendancesCount > 0) {
      setTotal(attendRes?.attendancesCount);
    }
  }, [loading, attendRes]);

  useEffect(() => {
    if (selectTime) {
      getAttendances({ variables: attendanceVariables(id, currentPage, selectTime) });
    }
  }, [selectTime]);

  useEffect(() => {
    if (id) {
      getSchool({ variables: { where: { id } } }).then((res: any) => {
        if (res?.data?.school) {
          setSchoolData(res.data.school);
          getAttendances({ variables: attendanceVariables(id, 0, selectTime) });
        }
      });
    }
    return () => {};
  }, [id]);

  const mappingAttendances = attendances?.map((i) => ({
    id: i.id,
    userName: i.user?.firstName + " " + i.user?.lastName,
    userPhotoUrl: i.user?.userPhotoUrl,
    type: i.type,
    capturePhotoUrl: i.capturePhotoUrl,
    temperature: isCelsius ? i.temperature + " °C" : toFahrenheit(i.temperature) + " °F",
    createdAt: i.createdAt,
  }));

  return (
    <Admin hideHeader>
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url('${schoolImage}')` }}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
          style={{ transform: "translateZ(0)" }}>
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0">
            <polygon className="text-slate-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-slate-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-slate-700">{schoolName}</h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-slate-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-slate-400"></i> {schoolLocation}
                </div>
              </div>
              <div className="mt-6 py-6 mb-6 border-t border-slate-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-2 text-lg leading-relaxed text-slate-700">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et lobortis arcu, sodales mattis
                      ante. Integer viverra sed nunc sed iaculis. Vivamus a lacus fringilla, posuere dolor id, varius
                      risus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => setSelectTime(SelectTime.today)}
                  className={clsx(
                    "font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150",
                    selectTime === SelectTime.today
                      ? "bg-slate-800 text-white active:bg-slate-600"
                      : "bg-white active:bg-slate-50 text-slate-700",
                  )}>
                  Today
                </button>
                <button
                  onClick={() => setSelectTime(SelectTime.last7Days)}
                  className={clsx(
                    "font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150",
                    selectTime === SelectTime.last7Days
                      ? "bg-slate-800 text-white active:bg-slate-600"
                      : "bg-white active:bg-slate-50 text-slate-700",
                  )}
                  type="button">
                  Last 7 Days ago
                </button>
                <button
                  onClick={() => setSelectTime(SelectTime.currentMonth)}
                  className={clsx(
                    "font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150",
                    selectTime === SelectTime.currentMonth
                      ? "bg-slate-800 text-white active:bg-slate-600"
                      : "bg-white active:bg-slate-50 text-slate-700",
                  )}
                  type="button">
                  Current Month
                </button>
              </div>
              <div>
                <button
                  onClick={() => setIsCelsius((prev) => !prev)}
                  className={clsx(
                    "font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150",
                    "bg-slate-800 text-white active:bg-slate-600",
                  )}
                  type="button">
                  {isCelsius ? "Convert °C to °F" : "Convert °F to °C"}
                </button>
              </div>
            </div>
            <CardTableAttendance title="Attendances" data={mappingAttendances} mapping={mappingTitles}>
              <Pagination
                className=""
                total={total}
                currentPage={currentPage}
                totalPages={totalPages}
                setNextPage={onNextPage}
                setPreviousPage={onPreviousPage}
                setPage={onSetPage}
                nextEnabled={nextEnabled}
                previousEnabled={previousEnabled}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            </CardTableAttendance>
          </div>
        </div>
      </section>
    </Admin>
  );
}
