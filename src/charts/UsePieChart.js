import React from "react";
import { Pie } from "react-chartjs-2";

const UseChart = (props) => {
  const { data, labels } = props;

  const pieData = {
    labels: labels,
    datasets: [
      {
        label: "Expired drugs",
        data: data,
        backgroundColor: [
          "rgba(74, 98, 135, 0.5)",
          "rgba(7, 98, 30, 0.5)",
          "rgba(74, 98, 35, 0.5)",
          "rgba(80, 10, 10, 0.5)",
          "rgba(90, 98, 10, 0.5)",
        ],
      },
    ],
  };

  return (
    <Pie
      data={pieData}
      height={400}
      width={200}
      options={{ maintainAspectRatio: false }}
    />
  );
};

export default UseChart;
