
import { Goal } from '@/types/Goal';

const STORAGE_KEY = 'simple-goal-tracker-goals';

export const loadGoals = (): Goal[] => {
  try {
    const storedGoals = localStorage.getItem(STORAGE_KEY);
    if (storedGoals) {
      const parsed = JSON.parse(storedGoals);
      return parsed.map((goal: any) => ({
        ...goal,
        createdAt: new Date(goal.createdAt)
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading goals:', error);
    return [];
  }
};

export const saveGoals = (goals: Goal[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error('Error saving goals:', error);
  }
};
