import React, { useRef } from "react";
import { MonthlyGrossRevenueDTO } from "../utility/HttpClient";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MonthlyRevenueChartData } from "../utility/MonthlyRevenueChartData";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface MonthlyRevenueChartProps {
  monthlyRevenue: MonthlyGrossRevenueDTO[];
}

const MonthlyRevenueChart: React.FC<MonthlyRevenueChartProps> = (props) => {
  const chartDataGenerator = new MonthlyRevenueChartData(props.monthlyRevenue);

  const data = {
    labels: chartDataGenerator.getMonthLabels(),
    datasets: [
      {
        label: "Monthly Gross Revenue",
        data: chartDataGenerator.getRevenues(),
        backgroundColor: chartDataGenerator.getMonthColors(),
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <Doughnut
        data={data}
        style={{ maxWidth: 500, maxHeight: 600, padding: 5 }}
      />
    </>
  );
};

export default MonthlyRevenueChart;
