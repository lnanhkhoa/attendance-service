import { useRouter } from "next/router";
import Head from "next/head";
import Router from "next/router";

import { ToastContainer } from "react-toastify";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql";

//
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
// import "@/styles/global.css";
import "@/styles/tailwind.css";
import "@/styles/loader.css";
import LoadingOverlay from "@/layouts/loading-overlay";

export default function CustomApp({ Component, pageProps }) {
  const router = useRouter();
  const path = (/#!(\/.*)$/.exec(router.asPath) || [])[1];
  if (path) {
    router.replace(path);
  }

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Attendance System</title>
        <link rel="icon" type="image/png" href="/favicon.png"></link>
      </Head>
      <main>
        <Component {...pageProps} />
        <ToastContainer />
      </main>
    </ApolloProvider>
  );
}
