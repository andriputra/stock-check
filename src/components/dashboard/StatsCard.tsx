// components/StatsCard.tsx
interface StatsCardProps {
    title: string;
    value: number | string;
    description: string;
    color: string;
  }
  
  const StatsCard = ({ title, value, description, color }: StatsCardProps) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
  
  export default StatsCard;
  