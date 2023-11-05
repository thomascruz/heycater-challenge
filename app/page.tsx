"use client"
import { useEffect, useState } from 'react';

import Button from './components/button';
import TaskEdit from './components/taskEdit';
import TasksList from './components/taskslist';
import { TaskStatus, TaskColor, TasksGroup } from './components/task/constants';

import s from './page.module.scss'

export default function Home() {
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [tasks, setTasks] = useState<TaskI[]>([
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
  ]);
  const [groupedTasks, setGroupedTasks] = useState<any>({
    TODAY: [],
    YESTERDAY: [],
    OLDER: [],
    TOMORROW: [],
    LATER: [],
    DONE: [],
  });

  const checkTaskDate = (date: Date, dateToCheck: TasksGroup) => {
    const today = new Date();
    switch (dateToCheck) {
      case TasksGroup.TODAY:
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      case TasksGroup.YESTERDAY:
        return date.getDate() === today.getDate() - 1 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      case TasksGroup.OLDER:
        today.setDate(today.getDate() - 2);
        return date.getTime() <= today.getTime();
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
      OLDER: tasks.filter((task) => task.status === TaskStatus.OPEN && checkTaskDate(task.createdAt, TasksGroup.OLDER)),
      TOMORROW: tasks.filter((task) => task.status === TaskStatus.OPEN && checkTaskDate(task.createdAt, TasksGroup.TOMORROW)),
      LATER: tasks.filter((task) => task.status === TaskStatus.OPEN && checkTaskDate(task.createdAt, TasksGroup.LATER)),
      DONE: tasks.filter((task) => task.status === TaskStatus.DONE),
    }

    setGroupedTasks(groupedTasks);
  };

  const addTask = (task: TaskI) => {
    setTasks([...tasks, task]);
    groupTasks(tasks);
    setIsAddingTask(false);
    sendTasks();
  };

  const checkTask = (task: TaskI) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        t.status = t.status === TaskStatus.OPEN ? TaskStatus.DONE : TaskStatus.OPEN;
        t.updatedAt = new Date();
      }

      return t;
    });

    setTasks(updatedTasks);
    groupTasks(updatedTasks);
    sendTasks();
  };

  const sendTasks = async () => {
    if (isFetching) {
      return;
    }
    setIsFetching(true);

    const tasksResponse = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(tasks),
    });

    setIsFetching(false);
  }

  const getTasks = async () => {
    if (isFetching) {
      return;
    }
    setIsFetching(true);

    const tasksResponse = await fetch('/api/tasks', {
      method: 'GET',
    });
    const tasksObjectResponse = await tasksResponse.json();
    const tempTasks: TaskI[] = [];

    for (const key in tasksObjectResponse) {
      const element: any = tasksObjectResponse[key];
      const task: TaskI = {
        id: element.id,
        createdAt: new Date(element.createdAt),
        updatedAt: new Date(element.updatedAt),
        status: element.status,
        color: element.color,
        title: element.title,
        description: element.description,
      };
      tempTasks.push(task);
    }

    setTasks(tempTasks);
    groupTasks(tempTasks);

    setIsFetching(false);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <main className={s.main}>
      {
        tasks.length === 0 && (
          <div className={s.emptyList}>No tasks around here...</div>
        )
      }

      <section className={s.openTasksSection}>
        {groupedTasks.OLDER.length > 0 && <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} title='Older' tasks={groupedTasks.OLDER}/></div>}
        {groupedTasks.YESTERDAY.length > 0 && <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} title='Yesterday' tasks={groupedTasks.YESTERDAY}/></div>}
        {groupedTasks.TODAY.length > 0 && <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} title='Today' tasks={groupedTasks.TODAY}/></div>}
        {groupedTasks.TOMORROW.length > 0 && <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} title='Tomorrow' tasks={groupedTasks.TOMORROW}/></div>}
        {groupedTasks.LATER.length > 0 && <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} title='Later' tasks={groupedTasks.LATER}/></div>}
      </section>

      {
        groupedTasks.DONE.length > 0 && (
          <section className={s.closedTasksSection}>
            <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} title='Done' tasks={groupedTasks.DONE} variant='outlined'/></div>
          </section>
        )
      }

      <div className={s.pageActions}>
        {
          !isAddingTask && (
            <Button
              text="New task"
              title="Add new task"
              onClick={() => setIsAddingTask(true)}
            />
          )
        }
      </div>

      {
        isAddingTask && (
          <div className={s.addTaskOverlay}>
            <div className={s.addTaskWrapper}>
              <TaskEdit
                onCancel={() => setIsAddingTask(false)}
                onSubmit={(task: TaskI) => addTask(task)}
              />
            </div>
          </div>
        )
      }
    </main>
  )
}
