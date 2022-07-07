// Import Ant Design styles
import "antd/dist/antd.css";
// Import global styles
import "../styles/global.scss";

import type { AppProps } from "next/app";
import BasePageLayout from "../layouts/BasePageLayout";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig
        value={{
          dedupingInterval: 1 * 60 * 1000,
        }}
      >
        <BasePageLayout>
          <Component {...pageProps} />
        </BasePageLayout>
      </SWRConfig>
    </>
  );
}

export default MyApp;
