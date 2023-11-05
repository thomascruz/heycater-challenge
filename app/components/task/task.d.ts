declare enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

declare enum TaskColor {
  PINK = 'PINK',
  YELLOW = 'YELLOW',
  BLUE = 'BLUE',
  ORANGE = 'ORANGE',
  PURPLE = 'PURPLE',
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