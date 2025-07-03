
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GoalList from '@/components/GoalList';
import AddGoalModal from '@/components/AddGoalModal';
import ProgressChart from '@/components/ProgressChart';
import { Goal } from '@/types/Goal';
import { loadGoals, saveGoals } from '@/utils/localStorage';

const Index = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const savedGoals = loadGoals();
    setGoals(savedGoals);
  }, []);

  const addGoal = (name: string, deadline: Date, estimatedTime: number) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      name,
      completed: false,
      createdAt: new Date(),
      deadline,
      estimatedTime
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  const toggleGoalComplete = (id: string) => {
    const updatedGoals = goals.map(goal => goal.id === id ? {
      ...goal,
      completed: !goal.completed
    } : goal);
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  const deleteGoal = (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  const todayGoals = goals.filter(goal => {
    const today = new Date();
    const goalDate = new Date(goal.deadline);
    return goalDate.toDateString() === today.toDateString();
  });

  const totalEstimatedTime = todayGoals.reduce((total, goal) => total + goal.estimatedTime, 0);
  const completedTime = todayGoals.filter(goal => goal.completed).reduce((total, goal) => total + goal.estimatedTime, 0);

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8 pt-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Daily Goals</h1>
            <p className="text-gray-600">Track your daily goals with time management</p>
          </div>

          {/* Today's Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Progress</h2>
            <ProgressChart goals={todayGoals} />
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600">
                Estimated time: {formatTime(completedTime)} / {formatTime(totalEstimatedTime)}
              </div>
            </div>
          </div>

          {/* Add Goal Button */}
          <div className="mb-6">
            <Button 
              onClick={() => setIsAddModalOpen(true)} 
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Daily Goal
            </Button>
          </div>

          {/* Goals List */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">My Goals</h2>
            <GoalList 
              goals={goals.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())} 
              onToggleComplete={toggleGoalComplete} 
              onDelete={deleteGoal} 
            />
          </div>

          {/* Add Goal Modal */}
          <AddGoalModal 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
            onAddGoal={addGoal} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
