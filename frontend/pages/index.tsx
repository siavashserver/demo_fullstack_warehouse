import { Typography } from "antd";
import type { NextPage } from "next";
import Head from "next/head";

const { Paragraph, Title } = Typography;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Title>Warehouse</Title>
      <Paragraph>
        This is a Full-Stack demo, demonstrating usage of different technologies
        such as React.js on Front-End side, and ASP.NET on Back-End side.
      </Paragraph>
      <Paragraph>
        Front-End Technologies:
        <ul>
          <li>Next.js</li>
          <li>React.js</li>
          <li>Ant Design</li>
          <li>Typescript</li>
        </ul>
      </Paragraph>
      <Paragraph>
        Back-End Technologies:
        <ul>
          <li>ASP.NET Core</li>
          <li>Entity Framework Core</li>
          <li>SQLite</li>
          <li>MediatR</li>
          <li>FluentValidation</li>
        </ul>
      </Paragraph>
    </>
  );
};

export default Home;
