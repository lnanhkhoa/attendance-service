import { Open_Sans } from "next/font/google";
import { useRouter } from "next/router";
import Head from "next/head";
import Router from "next/router";

import { ToastContainer } from "react-toastify";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql";

//
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/tailwind.css";
import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";

const roboto = Open_Sans({
  weight: "400",
  subsets: ["latin"],
});

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
      <main className={roboto.className}>
        <Component {...pageProps} />
        <ToastContainer />
      </main>
    </ApolloProvider>
  );
}
