import React, { useCallback } from "react";
import Link from "next/link";

// layout for page

import Auth from "@/layouts/auth";
import { useMutation } from "@apollo/client";
import { MUTATION_SIGN_IN } from "@/graphql/gql";
import { zodPageSchema } from "@/utils/form-validate";
import { DEV_SYSTEM_PASS, DEV_SYSTEM_USER } from "@/utils/constants";
import { Field, Form } from "react-final-form";
import { debounce, get } from "lodash";
import { toast } from "react-toastify";
import MyTextInput from "@/components/Form/MyTextInput";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

const initialValues = {
  email: DEV_SYSTEM_USER,
  password: DEV_SYSTEM_PASS,
};

export default function Login() {
  const router = useRouter();
  const { login } = useAuthStore();
  const validate = useCallback((values: typeof initialValues) => zodPageSchema(values, "login"), []);
  const [loginMutate, { called, loading, error }] = useMutation(MUTATION_SIGN_IN, {
    onCompleted(data) {
      const accessToken = get(data, ["authenticateUserWithPassword", "sessionToken"], "");
      login(accessToken);
      const isSystemAdmin = get(data, ["authenticateUserWithPassword", "item", "isSystemAdmin"], false);
      if (isSystemAdmin) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/attendance");
      }
      return true;
    },
    onError: (err) => toast(err.message, { type: "error" }),
  });

  function onSubmit(values: typeof initialValues) {
    return debounce(() => {
      return loginMutate({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    }, 1000)();
  }

  return (
    <>
      <Auth>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-slate-500 text-sm font-bold">Sign in with</h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <button
                      className="bg-white active:bg-slate-50 text-slate-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button">
                      <Image alt="github" width={36} height={36} className="w-5 mr-1" src="/img/github.svg" />
                      Github
                    </button>
                    <button
                      className="bg-white active:bg-slate-50 text-slate-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button">
                      <Image alt="google" width={36} height={36} className="w-5 mr-1" src="/img/google.svg" />
                      Google
                    </button>
                  </div>
                  <hr className="mt-6 border-b-1 border-slate-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-slate-400 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                  </div>
                  <Form
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validate={validate}
                    render={({ handleSubmit, form, submitting, pristine, values, errors }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3">
                          <MyTextInput name="email" placeholder="email" type="email" label="Email" />
                        </div>
                        <div className="relative w-full mb-3">
                          <MyTextInput name="password" placeholder="email" type="password" label="Password" />
                        </div>
                        <div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              id="customCheckLogin"
                              type="checkbox"
                              className="form-checkbox border-0 rounded text-slate-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            />
                            <span className="ml-2 text-sm font-semibold text-slate-600">Remember me</span>
                          </label>
                        </div>

                        <div className="text-center mt-6">
                          <button
                            disabled={submitting || loading}
                            className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit">
                            {submitting || loading ? <i className="fas fa-spinner mr-2"></i> : null}
                            Sign In
                          </button>
                        </div>
                      </form>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <Link href="#" onClick={(e) => e.preventDefault()}>
                    <small className="text-slate-200">Forgot password?</small>
                  </Link>
                </div>
                <div className="w-1/2 text-right">
                  <Link href="/auth/register">
                    <small className="text-slate-200">Create new account</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Auth>
    </>
  );
}
