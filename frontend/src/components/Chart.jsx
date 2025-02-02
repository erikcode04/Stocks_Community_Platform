import React from "react";
import { Chart } from "react-google-charts";

const PortfolioChart = ({ portfolio }) => {
  const data = [
    ["Aktie", "Antal aktier"],
    ...portfolio.map(stock => [stock.name, stock.quantity]),
  ];

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={{ title: "Min Portföljfördelning" }}
    />
  );
};

export default PortfolioChart;