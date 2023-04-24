import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Colors,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Colors);
const LineChart = ({ currentUserData }) => {
  const [loading, setLoading] = useState(true);
  const [averageData, setAverageData] = useState([]);
  const [startWeightData, setStartWeightData] = useState([]);
  const [goalWeightData, setGoalWeightData] = useState([]);
  const [labelData, setLabelData] = useState([]);
  useEffect(() => {
    const currentDate = new Date().getDate();
    if (currentUserData !== null) {
      const daysleftInCurrentMonth =
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0,
        ).getDate() - currentDate;
      const daysInCurrentMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      ).getDate();

      let arr = [];
      for (let i = currentDate; i <= daysInCurrentMonth; i++) {
        arr.push(i);
      }
      setStartWeightData(
        new Array(daysleftInCurrentMonth + 1).fill(
          Number(currentUserData?.startWeight),
        ),
      );
      setGoalWeightData(
        new Array(daysleftInCurrentMonth + 1).fill(currentUserData?.weightGoal),
      );
      setLabelData([...arr]);
      if (currentUserData) {
        setAverageData([...currentUserData.currentWeight]);
      }
    }
    setLoading(false);
    // eslint-disable-next-line
  }, [currentUserData]);
  const data = {
    labels: [...labelData],
    datasets: [
      {
        data: [...averageData],
        borderColor: "#53b982",
        backgroundColor: "#53b982",
      },
      {
        data: [...startWeightData],
        borderColor: "#4f46e5",
        backgroundColor: "#4f46e5",
        pointRadius: 0,
      },
      {
        data: [...goalWeightData],
        borderColor: "#ed4344",
        backgroundColor: "#ed4344",
        pointRadius: 0,
      },
    ],
  };
  const options = {
    colors: {
      enabled: true,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 5,
        },
      },
      y: {
        ticks: {
          stepSize: 9,
        },
      },
    },
  };
  return (
    <>
      {!loading && (
        <div className="w-full h-[45vh] flex grow justify-center items-center">
          <Line
            data={{ ...data }}
            options={{ ...options }}
            className="object-cover"
          ></Line>
        </div>
      )}
    </>
  );
};

export default LineChart;
