import classNames from 'classnames';
import { TaskStatus, TaskColor } from './constants';

import s from './style.module.scss'

export default function Task({
  task,
  variant
}: {
  task: TaskI
  variant?: 'default' | 'outlined'
}) {

  const formatTaskDate = (date: Date) => {
    return date.toLocaleDateString('en-US');
  }

  const getTaskColorClassName = (color: TaskColor | undefined) => {
    switch (color) {
      case TaskColor.YELLOW:
        return s.yellow;
      case TaskColor.PINK:
          return s.pink;
      case TaskColor.ORANGE:
        return s.red;
      case TaskColor.PURPLE:
        return s.purple;
      case TaskColor.BLUE:
        return s.blue;
      default:
        return s.yellow;
    }
  }

  return (
    <div className={classNames(s.task, getTaskColorClassName(task.color), variant === 'outlined' && s.outlined)}>
      <div className={s.taskHeader}>
        <h3 className={s.taskTitle}>{task.title}</h3>
        <span className={s.taskDate}>{formatTaskDate(task.createdAt)}</span>
      </div>
      <div className={s.taskBody}>
        {task.description && (<p className={s.taskDescription}>{task.description}</p>)}
      </div>
    </div>
  )
}
