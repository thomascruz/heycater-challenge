import Task from '../../components/task';

import s from './style.module.scss';

export default function TasksList({
  title,
  tasks,
  variant,
}: {
  title?: string
  tasks: TaskI[]
  variant?: 'default' | 'outlined'
}) {
  return (
    <div className={s.tasksList}>
      <div className={s.tasksListHeader}>
        <h2 className={s.tasksListHeader}>{title || 'Tasks'}</h2>
      </div>
      <div className={s.tasksListBody}>
        {tasks.map((task, index) => (
          <div key={index} className={s.taskWrapper}>
            <Task task={task} variant={variant}/>
          </div>
        ))}
      </div>
    </div>
  )
}
