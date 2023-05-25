import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

// layout for page

import { useMutation } from "@apollo/client";
import { MUTATION_CHECK_IN, MUTATION_SIGN_IN } from "@/graphql/gql";
import { zodPageSchema } from "@/utils/form-validate";
import { DEV_SYSTEM_PASS, DEV_SYSTEM_USER } from "@/utils/constants";
import { Field, Form } from "react-final-form";
import { debounce, get } from "lodash";
import { toast } from "react-toastify";
import MyTextInput from "@/components/Form/MyTextInput";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/useAuthStore";
import clsx from "clsx";
import Navbar from "@/components/Navbars/AuthNavbar";

const initialValues = {
  type: "checkin",
  date: new Date().toISOString(),
};

export default function Attendance() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const [selectType, setSelectType] = useState("checkin");

  const validate = useCallback((values: typeof initialValues) => zodPageSchema(values, "checkin"), []);
  const [checkinMutate, { called, loading, error }] = useMutation(MUTATION_CHECK_IN, {
    onCompleted(data) {
      console.log(data);
      if (data.attendCheckin) {
        toast.success("Check in/ check out successfully!");
      }
    },
    onError: (err) => toast(err.message, { type: "error" }),
  });

  function onSubmit(values: typeof initialValues) {
    return debounce(() => {
      return checkinMutate({
        variables: {
          date: values.date,
          type: selectType,
        },
      });
    }, 1000)();
  }

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn]);

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}>
            <div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-10">
                      <Form
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validate={validate}
                        render={({ handleSubmit, form, submitting, pristine, values, errors }) => (
                          <form onSubmit={handleSubmit}>
                            <div className="flex">
                              <button
                                className={clsx(
                                  "text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150 m-2",
                                  selectType === "checkin"
                                    ? "bg-slate-800 text-white active:bg-slate-600"
                                    : "bg-white active:bg-slate-50 text-slate-700",
                                )}
                                onClick={() => setSelectType("checkin")}
                                type="button">
                                Check In
                              </button>
                              <button
                                className={clsx(
                                  "text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150 m-2",
                                  selectType === "checkout"
                                    ? "bg-slate-800 text-white active:bg-slate-600"
                                    : "bg-white active:bg-slate-50 text-slate-700",
                                )}
                                type="button"
                                onClick={() => setSelectType("checkout")}>
                                Check Out
                              </button>
                            </div>
                            <div className="relative w-full mb-3">
                              <MyTextInput name="date" placeholder="date" type="date" label="Date" />
                            </div>

                            <div>
                              <span className="inline-block text-xs text-red-600 dark:text-red-400">
                                {JSON.stringify(errors)}
                              </span>
                            </div>

                            <div className="text-center mt-6">
                              <button
                                disabled={submitting || loading}
                                className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                type="submit">
                                {submitting || loading ? <i className="fas fa-spinner mr-2"></i> : null}
                                Confirm
                              </button>
                            </div>
                          </form>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
