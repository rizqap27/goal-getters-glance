
export interface Goal {
  id: string;
  name: string;
  completed: boolean;
  createdAt: Date;
  deadline: Date;
  estimatedTime: number; // in minutes
}
