import React from "react";
import { Chart } from "react-google-charts";

const PortfolioChart = ({ portfolioData, title }) => {
  console.log("portfolioData", portfolioData);
  const data = [
    ["Aktie", "Antal aktier"],
    ...portfolioData.map(stock => [stock.symbol, stock.quantity]),
  ];
  console.log("data", data);

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
    //  options={{ title }}
    />
  );
};

export default PortfolioChart;