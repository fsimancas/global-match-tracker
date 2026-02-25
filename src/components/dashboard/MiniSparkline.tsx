import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MiniSparklineProps {
  data: number[];
  color?: string;
}

const MiniSparkline = ({ data, color = "hsl(var(--cyan-glow))" }: MiniSparklineProps) => {
  const chartData = data.map((v, i) => ({ v, i }));

  return (
    <div className="h-8 w-20">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniSparkline;
