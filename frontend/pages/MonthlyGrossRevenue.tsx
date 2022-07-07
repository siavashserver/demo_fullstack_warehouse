import { Alert, Segmented, Space, Typography } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import MonthlyRevenueChart from "../components/MonthlyRevenueChart";
import { HttpClientInstance } from "../utility/HttpClient";

const { Paragraph, Title } = Typography;

const MonthlyGrossRevenue: NextPage = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const { data: revenueList, error: revenueListError } = useSWR(
    ["LineItem/monthlyRevenue", year],
    (path, year) => HttpClientInstance.getMonthlyGrossRevenueList(year)
  );

  const getAvailableYears = () => {
    return ["2021", "2022"];
  };

  return (
    <>
      <Head>
        <title>Monthly Gross Revenue</title>
      </Head>
      <Title>Monthly Gross Revenue</Title>
      <Paragraph>
        <Space>
          Please pick a year to retrieve monthly gross revenue for:
          <Segmented
            options={getAvailableYears()}
            defaultValue={year.toString()}
            onChange={(value) => setYear(parseInt(value.toString()))}
          />
        </Space>
      </Paragraph>
      {revenueList && <MonthlyRevenueChart monthlyRevenue={revenueList} />}
      {revenueListError && (
        <Paragraph>
          <Alert
            message="Failed to load monthly gross revenue list."
            description={`${revenueListError}`}
            type="error"
            showIcon
          />
        </Paragraph>
      )}
    </>
  );
};

export default MonthlyGrossRevenue;
