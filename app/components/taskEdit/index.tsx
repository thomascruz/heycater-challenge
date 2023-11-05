import { useState } from 'react';
import classNames from 'classnames';

import { TaskStatus, TaskColor } from './constants';
import Button from '../button';

import s from './style.module.scss';

export default function TaskEdit({
  onSubmit,
  onCancel,
}: {
  onSubmit?: (task: TaskI) => void,
  onCancel?: () => void,
}) {
  const [message, setMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [color, setColor] = useState<TaskColor>(TaskColor.YELLOW);

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

  const submitTask = () => {
    if (!title || title.length < 5) {
      setMessage('Title should be at least 5 characters long');
    }

    const task: TaskI = {
      id: new Date().getTime(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: TaskStatus.OPEN,
      color: color,
      title: title,
      description: description,
    };

    onSubmit && onSubmit(task);

    resetTask();
  }

  const resetTask = () => {
    setTitle('');
    setDescription('');
    setColor(TaskColor.YELLOW);
  }

  return (
    <div className={classNames(s.task, getTaskColorClassName(color))}>
      <div className={s.taskHeader}>
        <input 
          className={s.taskTitle}
          placeholder='Task title'
          type="text" 
          value={title} 
          onChange={(evt) => 
          setTitle(evt.target.value)}
        />
      </div>
      <div className={s.taskBody}>
        <textarea 
          className={s.taskDescription}
          placeholder='Task description'
          value={description} 
          onChange={(evt) => 
          setDescription(evt.target.value)}
        />
      </div>

      <span className={s.message}>{message}</span>

      <div className={s.taskFooter}>
        <div className={s.colorOptions}>
          <div onClick={() => setColor(TaskColor.YELLOW)} className={classNames(s.colorOption, getTaskColorClassName(TaskColor.YELLOW), color === TaskColor.YELLOW && s.selected)}/>
          <div onClick={() => setColor(TaskColor.RED)} className={classNames(s.colorOption, getTaskColorClassName(TaskColor.RED), color === TaskColor.RED && s.selected)}/>
          <div onClick={() => setColor(TaskColor.GREEN)} className={classNames(s.colorOption, getTaskColorClassName(TaskColor.GREEN), color === TaskColor.GREEN && s.selected)}/>
          <div onClick={() => setColor(TaskColor.BLUE)} className={classNames(s.colorOption, getTaskColorClassName(TaskColor.BLUE), color === TaskColor.BLUE && s.selected)}/>
          <div onClick={() => setColor(TaskColor.BEIGE)} className={classNames(s.colorOption, getTaskColorClassName(TaskColor.BEIGE), color === TaskColor.BEIGE && s.selected)}/>
        </div>

        <div className={s.taskActions}>
          <div className={s.taskAction}>
            <Button
              title='Discard changes'
              text='Discard'
              variant={color === TaskColor.BLUE ? 'white' : 'black'}
              onClick={() => {resetTask(); onCancel && onCancel()}}
            />
          </div>
          <div className={s.taskAction}>
            <Button
              title='Save task'
              text='Save task'
              variant={color === TaskColor.BLUE ? 'white' : 'black'}
              onClick={submitTask}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
