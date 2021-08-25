import React from "react";
import { Line } from "react-chartjs-2";

const UseChart = (props) => {
  const { data, label } = props;

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: [...label],
        data: [...data],
        borderColor: ["rgba(74, 98, 135, 0.5)"],
      },
    ],
  };

  return <Line data={chartData} />;
};

export default UseChart;
