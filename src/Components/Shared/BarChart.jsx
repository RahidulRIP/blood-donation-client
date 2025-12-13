import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const formattedValue = new Intl.NumberFormat("en-US").format(
      payload[0].value
    );

    return (
      <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-lg">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-lg font-bold" style={{ color: payload[0].fill }}>
          {`${label === "Funding" ? "Amount" : "Value"}: ${formattedValue}`}
        </p>
      </div>
    );
  }

  return null;
};

const BarChart = ({ totalUsers, totalFundsRaised, totalDonationRequests }) => {
  const data = [
    {
      name: "Users",
      value: totalUsers,
    },
    {
      name: "Funding",
      value: totalFundsRaised,
    },
    {
      name: "Blood Requests",
      value: totalDonationRequests,
    },
  ];

  const colors = ["#4C51BF", "#38A169", "#D53F8C"];

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000) {
      return `${(tickItem / 1000).toFixed(0)}k`;
    }
    return tickItem;
  };

  return (
    <div className="max-w-4xl mx-auto h-[400px] bg-white p-6 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        📊 Dashboard Key Metrics
      </h2>

      <div className="h-[350px] px-6 pb-6">
        <ResponsiveContainer width="100%" height="90%">
          <ReBarChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid
              stroke="#e0e0e0"
              strokeDasharray="5 5"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke="#333"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fontWeight: "bold" }}
              padding={{ left: 15, right: 15 }}
            />

            <YAxis
              stroke="#333"
              axisLine={false}
              tickLine={false}
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: "#f0f4f8", opacity: 0.6 }}
              content={<CustomTooltip />}
            />

            <Bar dataKey="value" radius={[10, 10, 0, 0]} minPointSize={5}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  className="transition-all duration-300 ease-in-out hover:brightness-110"
                />
              ))}
            </Bar>
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
    
  );
};

export default BarChart;
