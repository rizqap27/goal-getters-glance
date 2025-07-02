
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Goal } from '@/types/Goal';

interface ProgressChartProps {
  goals: Goal[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goals }) => {
  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;
  const pendingGoals = totalGoals - completedGoals;

  const data = [
    {
      name: 'Completed',
      value: completedGoals,
      color: '#10B981'
    },
    {
      name: 'Pending',
      value: pendingGoals,
      color: '#E5E7EB'
    }
  ];

  if (totalGoals === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="mb-2">No goals to track yet</p>
        <p className="text-sm">Add some goals to see your progress</p>
      </div>
    );
  }

  const completionPercentage = Math.round((completedGoals / totalGoals) * 100);

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                startAngle={90}
                endAngle={450}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800 mb-2">
          {completionPercentage}% Complete
        </div>
        <div className="text-sm text-gray-600">
          {completedGoals} of {totalGoals} goals completed
        </div>
      </div>
      
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Completed ({completedGoals})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <span className="text-gray-600">Pending ({pendingGoals})</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
