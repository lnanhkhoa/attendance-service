import React, { useEffect, useState } from "react";

import Admin from "@/layouts/admin";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ATTENDANCES, GET_SCHOOL } from "@/graphql/gql/school";
import { useRouter } from "next/router";
import { usePagination } from "react-use-pagination";
import Pagination from "@/components/Pagination/Pagination";
import CardTableAttendance from "@/components/Cards/CardTableAttendance";

import { School, Attendance } from "@/graphql/types";

const mappingTitles = [
  { id: "1", label: "ID", mapKey: "id" },
  { id: "2", label: "User", mapKey: "userName" },
  { id: "3", label: "Email", mapKey: "userEmail" },
  { id: "4", label: "Check Type", mapKey: "type" },
  { id: "5", label: "Image", mapKey: "capturePhotoUrl" },
  { id: "5", label: "Temperature", mapKey: "temperature" },
];

export default function SchoolDetail() {
  const router = useRouter();
  const id = router.query.id;
  const [getSchool] = useLazyQuery(GET_SCHOOL);
  const [getAttendances] = useLazyQuery(GET_ATTENDANCES);

  // school
  const [schoolData, setSchoolData] = useState<School | null>(null);
  const schoolImage =
    schoolData?.schoolPhotoUrl ||
    "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80";
  const schoolName = schoolData?.schoolName;
  const schoolLocation = String(schoolData?.city) + ", " + String(schoolData?.country);

  // attendances
  const [attendances, setAttendances] = useState<Attendance[] | null>(null);
  const mappingAttendances = attendances?.map((i) => {
    return {
      id: i.id,
      userName: i.user?.firstName + " " + i.user?.lastName,
      userEmail: i.user?.email,
      userPhotoUrl: i.user?.userPhotoUrl,
      type: i.type,
      capturePhotoUrl: i.capturePhotoUrl,
      temperature: i.temperature,
    };
  });

  const attendVariables = {
    where: {
      school: {
        id: {
          equals: id,
        },
      },
    },
    take: 10,
    skip: 0,
    orderBy: [],
  };

  const { currentPage, totalPages, setNextPage, setPreviousPage, nextEnabled, previousEnabled, startIndex, endIndex } =
    usePagination({ totalItems: 10, initialPage: 1, initialPageSize: 10 });

  useEffect(() => {
    if (id) {
      getSchool({ variables: { where: { id } } }).then((res: any) => {
        setSchoolData(res?.data?.school);
        getAttendances({ variables: attendVariables }).then((attendRes: any) => {
          setAttendances(attendRes.data.attendances);
        });
      });
    }
    return () => {};
  }, [id, getSchool, getAttendances]);

  return (
    <Admin hideHeader>
      <section className="relative block h-350-px">
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
              <div className="mt-10 py-10 border-t border-slate-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-slate-700">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                      also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                  </div>
                </div>
              </div>
              <CardTableAttendance title="Attendance" data={mappingAttendances} mapping={mappingTitles} color="dark">
                <Pagination className="" total={10} nextEnabled={nextEnabled} previousEnabled={previousEnabled} />
              </CardTableAttendance>
            </div>
          </div>
        </div>
      </section>
    </Admin>
  );
}
