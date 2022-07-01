// Import Ant Design styles
import "antd/dist/antd.css";
// Import global styles
import "../styles/global.scss";

import type { AppProps } from "next/app";
import BasePageLayout from "../layouts/BasePageLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BasePageLayout>
        <Component {...pageProps} />
      </BasePageLayout>
    </>
  );
}

export default MyApp;
