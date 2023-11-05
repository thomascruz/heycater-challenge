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

  const [tasks, setTasks] = useState<TaskI[]>([]);
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
    console.log(tasks);
    const tempTasks = [...tasks, task];

    setTasks(tempTasks);
    groupTasks(tempTasks);
    setIsAddingTask(false);
    sendTasks(tempTasks);
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
    sendTasks(updatedTasks);
  };

  const deleteTask = async (task: TaskI) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);

    const taskDeleteResponse = await fetch('/api/tasks', {
      method: 'DELETE',
      body: JSON.stringify(task),
    });

    setTasks(updatedTasks);
    groupTasks(updatedTasks);
    sendTasks(updatedTasks);
  };

  const sendTasks = async (tasks: TaskI[]) => {
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
        id: parseInt(key, 10),
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
        {groupedTasks.OLDER.length > 0 && <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} onDelete={deleteTask} title='Older' tasks={groupedTasks.OLDER}/></div>}
        {groupedTasks.YESTERDAY.length > 0 && <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} onDelete={deleteTask} title='Yesterday' tasks={groupedTasks.YESTERDAY}/></div>}
        {groupedTasks.TODAY.length > 0 && <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} onDelete={deleteTask} title='Today' tasks={groupedTasks.TODAY}/></div>}
        {groupedTasks.TOMORROW.length > 0 && <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} onDelete={deleteTask} title='Tomorrow' tasks={groupedTasks.TOMORROW}/></div>}
        {groupedTasks.LATER.length > 0 && <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} onDelete={deleteTask} title='Later' tasks={groupedTasks.LATER}/></div>}
      </section>

      {
        groupedTasks.DONE.length > 0 && (
          <section className={s.closedTasksSection}>
            <div className={s.tasksListWrapper}><TasksList onCheck={checkTask} onDelete={deleteTask} title='Done' tasks={groupedTasks.DONE} variant='outlined'/></div>
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
