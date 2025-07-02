
import React from 'react';
import { Check, Trash2, Clock, Calendar } from 'lucide-react';
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
        <p className="text-lg mb-2">No daily goals yet!</p>
        <p className="text-sm">Add your first goal to get started</p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const isOverdue = (deadline: Date) => {
    return new Date() > deadline && !goals.find(g => g.deadline === deadline)?.completed;
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  return (
    <div className="space-y-3">
      {goals.map((goal) => {
        const overdue = isOverdue(goal.deadline);
        
        return (
          <div
            key={goal.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              goal.completed
                ? 'bg-green-50 border-green-200'
                : overdue
                ? 'bg-red-50 border-red-200'
                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <button
                  onClick={() => onToggleComplete(goal.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-1 ${
                    goal.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {goal.completed && <Check size={14} />}
                </button>
                
                <div className="flex-1">
                  <span
                    className={`font-medium transition-all duration-200 block ${
                      goal.completed
                        ? 'text-green-700 line-through'
                        : overdue
                        ? 'text-red-700'
                        : 'text-gray-800'
                    }`}
                  >
                    {goal.name}
                  </span>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span className={overdue ? 'text-red-600 font-medium' : ''}>
                        {formatDate(goal.deadline)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{formatTime(goal.estimatedTime)}</span>
                    </div>
                  </div>
                </div>
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
          </div>
        );
      })}
    </div>
  );
};

export default GoalList;
