
import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Goal } from '@/types/Goal';

interface GoalListProps {
  goals: Goal[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const GoalList: React.FC<GoalListProps> = ({ goals, onToggleComplete, onDelete }) => {
  if (goals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg mb-2">No goals yet!</p>
        <p className="text-sm">Add your first goal to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
            goal.completed
              ? 'bg-green-50 border-green-200'
              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => onToggleComplete(goal.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                goal.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-400'
              }`}
            >
              {goal.completed && <Check size={14} />}
            </button>
            <span
              className={`font-medium transition-all duration-200 ${
                goal.completed
                  ? 'text-green-700 line-through'
                  : 'text-gray-800'
              }`}
            >
              {goal.name}
            </span>
          </div>
          
          <Button
            onClick={() => onDelete(goal.id)}
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default GoalList;
