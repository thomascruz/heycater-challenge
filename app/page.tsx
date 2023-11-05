import classNames from 'classnames';

import Task from './components/task';
import { TaskStatus, TaskColor } from './components/task/constants';

import s from './page.module.scss'

export default function Home() {
  const tasks: TaskI[] = [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: TaskStatus.OPEN,
      color: TaskColor.PURPLE,
      title: 'Aspernatur mollitia? Assumenda',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut accusantium, suscipit voluptatum quae rem dolore iusto fugiat similique laboriosam nam, exercitationem laborum officia nobis error eaque dolorum, aspernatur mollitia? Assumenda.'
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: TaskStatus.OPEN,
      color: TaskColor.PINK,
      title: 'Ut accusantium, suscipit',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut accusantium, suscipit voluptatum quae rem dolore iusto fugiat similique laboriosam nam, exercitationem laborum officia nobis error eaque dolorum, aspernatur mollitia? Assumenda.'
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: TaskStatus.OPEN,
      color: TaskColor.YELLOW,
      title: 'Buy milk',
    },
  ];

  return (
    <main className={s.main}>
      <section className={s.openTasksSection}>
        <div className={s.tasksList}>
          <div className={s.tasksListHeader}>
            <h2>Open Tasks</h2>
            <button className={s.addTaskButton}>Add Task</button>
          </div>
          <div className={s.tasksListBody}>
            {tasks.map((task) => (
              <div className={s.taskWrapper}>
                <Task task={task} variant='outlined'/>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
