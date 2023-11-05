"use client"
import classNames from 'classnames';

import Task from './components/task';
import { TaskStatus, TaskColor, TasksGroup } from './components/task/constants';

import s from './page.module.scss'
import TasksList from './components/taskslist';
import { useEffect, useState } from 'react';

export default function Home() {
  const [groupedTasks, setGroupedTasks] = useState<any>({
    TODAY: [],
    YESTERDAY: [],
    TOMORROW: [],
    LATER: [],
    DONE: [],
  });

  const tasks: TaskI[] = [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: TaskStatus.OPEN,
      color: TaskColor.GREEN,
      title: 'Aspernatur mollitia? Assumenda',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut accusantium, suscipit voluptatum quae rem dolore iusto fugiat similique laboriosam nam, exercitationem laborum officia nobis error eaque dolorum, aspernatur mollitia? Assumenda.'
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: TaskStatus.DONE,
      color: TaskColor.BEIGE,
      title: 'Ut accusantium, suscipit',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut accusantium, suscipit voluptatum quae rem dolore iusto fugiat similique laboriosam nam, exercitationem laborum officia nobis error eaque dolorum, aspernatur mollitia? Assumenda.'
    },
    {
      id: 3,
      createdAt: new Date('2023-11-04'),
      updatedAt: new Date(),
      status: TaskStatus.OPEN,
      color: TaskColor.YELLOW,
      title: 'Buy milk',
    },
    {
      id: 4,
      createdAt: new Date('2022-11-08'),
      updatedAt: new Date(),
      status: TaskStatus.DONE,
      color: TaskColor.BLUE,
      title: 'Buy milk',
    },
    {
      id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: TaskStatus.OPEN,
      color: TaskColor.RED,
      title: 'Buy milk',
    },
  ];

  const checkTaskDate = (date: Date, dateToCheck: TasksGroup) => {
    const today = new Date();
    switch (dateToCheck) {
      case TasksGroup.TODAY:
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      case TasksGroup.YESTERDAY:
        return date.getDate() === today.getDate() - 1 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      case TasksGroup.TOMORROW:
        return date.getDate() === today.getDate() + 1 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      case TasksGroup.LATER:
        return date.getDate() >= today.getDate() + 2 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      default:
        return false;
    }
  }

  const groupTasks = (tasks: TaskI[]) => {
    const groupedTasks = {
      TODAY: tasks.filter((task) => task.status === TaskStatus.OPEN && checkTaskDate(task.createdAt, TasksGroup.TODAY)),
      YESTERDAY: tasks.filter((task) => task.status === TaskStatus.OPEN && checkTaskDate(task.createdAt, TasksGroup.YESTERDAY)),
      TOMORROW: tasks.filter((task) => task.status === TaskStatus.OPEN && checkTaskDate(task.createdAt, TasksGroup.TOMORROW)),
      LATER: tasks.filter((task) => task.status === TaskStatus.OPEN && checkTaskDate(task.createdAt, TasksGroup.LATER)),
      DONE: tasks.filter((task) => task.status === TaskStatus.DONE),
    }

    setGroupedTasks(groupedTasks);
  }

  useEffect(() => {
    groupTasks(tasks);
  }, [tasks.length]);

  return (
    <main className={s.main}>
      <section className={s.openTasksSection}>
        {groupedTasks.YESTERDAY.length > 0 && <div className={s.tasksListWrapper}><TasksList title='Yesterday' tasks={groupedTasks.YESTERDAY}/></div>}
        {groupedTasks.TODAY.length > 0 && <div className={s.tasksListWrapper}><TasksList title='Today' tasks={groupedTasks.TODAY}/></div>}
        {groupedTasks.TOMORROW.length > 0 && <div className={s.tasksListWrapper}><TasksList title='Tomorrow' tasks={groupedTasks.TOMORROW}/></div>}
        {groupedTasks.LATER.length > 0 && <div className={s.tasksListWrapper}><TasksList title='Later' tasks={groupedTasks.LATER}/></div>}
      </section>

      {
        groupedTasks.DONE.length > 0 && (
          <section className={s.closedTasksSection}>
            <div className={s.tasksListWrapper}><TasksList title='Done' tasks={groupedTasks.DONE} variant='outlined'/></div>
          </section>
        )
      }
    </main>
  )
}
