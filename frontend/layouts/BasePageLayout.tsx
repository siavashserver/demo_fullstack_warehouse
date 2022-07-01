import React from "react";

import { Layout } from "antd";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import PageContent from "../components/PageContent";

const { Footer, Content } = Layout;

const BasePageLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <>
      <Layout>
        <PageHeader />
        <PageContent>{props.children}</PageContent>
        <PageFooter />
      </Layout>
    </>
  );
};

export default BasePageLayout;
