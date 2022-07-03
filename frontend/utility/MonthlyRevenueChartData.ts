import { MonthlyGrossRevenueDTO } from "./HttpClient";

export class MonthlyRevenueChartData {
  monthColors = [
    "#5C461B",
    "#E1C285",
    "#DBA740",
    "#5C4F36",
    "#A88031",
    "#5C1638",
    "#E17AAC",
    "#5C5811",
    "#E1DC6E",
    "#DBD12A",
    "#5C592D",
    "#A8A120",
  ];

  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(private monthlyRevenue: MonthlyGrossRevenueDTO[]) {}

  getMonthLabels() {
    const labels = this.monthlyRevenue.map((revenue) => {
      return this.monthNames[revenue.month];
    });
    return labels;
  }

  getMonthColors() {
    const colors = this.monthlyRevenue.map((revenue) => {
      return this.monthColors[revenue.month];
    });
    return colors;
  }

  getRevenues() {
    const revenues = this.monthlyRevenue.map((revenue) => {
      return revenue.grossRevenue;
    });
    return revenues;
  }
}
