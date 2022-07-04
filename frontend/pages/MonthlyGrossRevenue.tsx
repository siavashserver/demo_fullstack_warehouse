import { Segmented, Space, Typography } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import MonthlyRevenueChart from "../components/MonthlyRevenueChart";
import {
  CachedHttpClient,
  MonthlyGrossRevenueDTO,
} from "../utility/HttpClient";

const { Paragraph, Title } = Typography;

const MonthlyGrossRevenue: NextPage = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [revenueList, setRevenueList] = useState<MonthlyGrossRevenueDTO[]>([]);

  useEffect(() => {
    const fetchRevenue = async () => {
      const result = await CachedHttpClient.getMonthlyGrossRevenueList(year);
      setRevenueList(result);
    };

    fetchRevenue();
  }, [year]);

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
      <MonthlyRevenueChart monthlyRevenue={revenueList} />
    </>
  );
};

export default MonthlyGrossRevenue;
