import React from "react";
import { useSelector } from "react-redux";
import { Card } from "@/components/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { name: "Jan", users: 30 },
  { name: "Feb", users: 45 },
  { name: "Mar", users: 60 },
  { name: "Apr", users: 50 },
  { name: "May", users: 75 },
  { name: "Jun", users: 90 },
];

export default function Dashboard() {
  const darkMode = useSelector((state) => state.settings.darkMode);

  const textColor = darkMode ? "#f3f4f6" : "#111827";
  const axisColor = darkMode ? "#9ca3af" : "#374151";
  const lineColor = darkMode ? "#60a5fa" : "#3b82f6";
  const chartBg = darkMode ? "#1f2937" : "#f9fafb";

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <h2
        className={`text-3xl font-bold ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Dashboard
      </h2>
      <p className={`text-gray-600 dark:text-gray-300`}>
        Welcome to the dashboard. Use the sidebar to navigate.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-blue-600 text-white">
          <div>
            <p className="text-sm">Total Users</p>
            <p className="text-2xl font-bold">1,245</p>
          </div>
        </Card>
        <Card className="p-4 bg-green-600 text-white">
          <div>
            <p className="text-sm">New Signups</p>
            <p className="text-2xl font-bold">128</p>
          </div>
        </Card>
        <Card className="p-4 bg-yellow-500 text-white">
          <div>
            <p className="text-sm">Settings Updates</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </Card>
      </div>

      {/* Users Growth Chart */}
      <div
        className="p-4 rounded-xl shadow"
        style={{ backgroundColor: chartBg }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: textColor }}>
          Users Growth (Last 6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sampleData}>
            <XAxis dataKey="name" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#fff",
                borderRadius: 6,
              }}
              itemStyle={{ color: textColor }}
              labelStyle={{ color: textColor }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke={lineColor}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
