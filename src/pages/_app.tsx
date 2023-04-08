import { type AppType } from "next/dist/shared/lib/utils";
import { Roboto } from "next/font/google";

import "~/styles/globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
