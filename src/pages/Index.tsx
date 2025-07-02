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
  const addGoal = (name: string) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      name,
      completed: false,
      createdAt: new Date()
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
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Goals Kita</h1>
          <p className="text-gray-600">Track your goals and stay motivated</p>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h2>
          <ProgressChart goals={goals} />
        </div>

        {/* Add Goal Button */}
        <div className="mb-6">
          <Button onClick={() => setIsAddModalOpen(true)} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2">
            <Plus size={20} />
            Add New Goal
          </Button>
        </div>

        {/* Goals List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">My Goals</h2>
          <GoalList goals={goals} onToggleComplete={toggleGoalComplete} onDelete={deleteGoal} />
        </div>

        {/* Add Goal Modal */}
        <AddGoalModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddGoal={addGoal} />
      </div>
    </div>;
};
export default Index;