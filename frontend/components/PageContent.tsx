import React from "react";

import { Layout } from "antd";

const { Content } = Layout;

const PageContent: React.FC<React.PropsWithChildren> = (props) => {
  return <Content className="page-contents">{props.children}</Content>;
};

export default PageContent;
