
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (name: string, deadline: Date, estimatedTime: number) => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAddGoal }) => {
  const [goalName, setGoalName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goalName.trim() && deadline && estimatedTime) {
      onAddGoal(
        goalName.trim(), 
        new Date(deadline), 
        parseInt(estimatedTime)
      );
      setGoalName('');
      setDeadline('');
      setEstimatedTime('');
      onClose();
    }
  };

  const handleClose = () => {
    setGoalName('');
    setDeadline('');
    setEstimatedTime('');
    onClose();
  };

  // Set default deadline to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add New Daily Goal
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="goalName" className="block text-sm font-medium text-gray-700 mb-2">
              Goal Name
            </Label>
            <Input
              id="goalName"
              type="text"
              placeholder="Enter your daily goal..."
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="w-full"
              autoFocus
            />
          </div>

          <div>
            <Label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
              Deadline
            </Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full"
              min={today}
            />
          </div>

          <div>
            <Label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Time (minutes)
            </Label>
            <Input
              id="estimatedTime"
              type="number"
              placeholder="e.g., 30"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              className="w-full"
              min="1"
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              disabled={!goalName.trim() || !deadline || !estimatedTime}
            >
              Add Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalModal;
