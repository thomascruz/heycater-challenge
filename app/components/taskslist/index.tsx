import Task from '../task';

import s from './style.module.scss';

export default function TasksList({
  title,
  tasks,
  variant,
  onCheck,
  onDelete
}: {
  title?: string
  tasks: TaskI[]
  variant?: 'default' | 'outlined'
  onCheck?: (task: TaskI) => void,
  onDelete?: (task: TaskI) => void,
}) {
  return (
    <div className={s.tasksList}>
      <div className={s.tasksListHeader}>
        <h2 className={s.tasksListHeader}>{title || 'Tasks'}</h2>
      </div>
      <div className={s.tasksListBody}>
        {tasks.map((task, index) => (
          <div key={index} className={s.taskWrapper}>
            <Task 
              task={task} 
              variant={variant} 
              onCheck={(task) => onCheck && onCheck(task)}
              onDelete={(task) => onDelete && onDelete(task)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
