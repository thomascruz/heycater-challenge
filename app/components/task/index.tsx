import classNames from 'classnames';
import { TaskStatus, TaskColor } from './constants';

import s from './style.module.scss';
import Button from '../button';

export default function Task({
  task,
  variant,
  onCheck,
  onDelete,
}: {
  task: TaskI
  variant?: 'default' | 'outlined',
  onCheck?: (task: TaskI) => void,
  onDelete?: (task: TaskI) => void,
}) {

  const formatTaskDate = (date: Date) => {
    const now = new Date();

    if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
      return `${date.getUTCHours()}:${date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes()}`;
    }

    return `${date.getDate()}/${date.getUTCMonth() + 1}${date.getFullYear() !== now.getFullYear() ? `/${date.getFullYear()}` : ''}`;
  }

  const getTaskColorClassName = (color: TaskColor | undefined) => {
    switch (color) {
      case TaskColor.BEIGE:
        return s.beige;
      case TaskColor.YELLOW:
          return s.yellow;
      case TaskColor.RED:
        return s.red;
      case TaskColor.GREEN:
        return s.green;
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

      <div 
        onClick={(evt) => onCheck && onCheck(task)} 
        className={classNames(s.taskCheck, task.status === TaskStatus.DONE && s.checked)}
        title={task.status === TaskStatus.DONE ? 'Mark as undone' : 'Mark as done'}
      />

      <div className={s.deleteButtonWrapper}>
        <Button
          text='Delete'
          title='Delete'
          variant={task.color !== TaskColor.BLUE ? 'black' : 'white'}
          onClick={() => onDelete && onDelete(task)}
        />
      </div>
    </div>
  )
}
