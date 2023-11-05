declare enum TaskStatus {
  OPEN = 'OPEN',
  DONE = 'DONE'
}

declare enum TaskColor {
  BEIGE = 'BEIGE',
  YELLOW = 'YELLOW',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  RED = 'RED',
}

declare interface TaskI {
  id: number;
  title: string;
  description?: string;
  color?: TaskColor;
  status: TaskStatus;
  createdAt: Date;
  updatedAt?: Date;
}