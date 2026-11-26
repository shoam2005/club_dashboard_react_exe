// TasksPanel - the tasks of the selected member, with messages for the empty states.
import styles from './TasksPanel.module.css'

/**
 * @param {object} props
 * @param {{id: number, name: string, role: string, isActive: boolean} | null} props.member - the selected member, or null
 * @param {Array<{id: number, title: string, done: boolean, assignedTo: number}>} props.tasks - the tasks of the selected member
 * @param {(taskId: number) => void} props.onToggleTask - call it with task.id when a task checkbox is clicked
 */
export default function TasksPanel({ member, tasks, onToggleTask }) {
  if (!member) {
    return (
      <section className={styles.panel}>
        <p className={styles.empty}>Select a member to see their tasks</p>
      </section>
    )
  }

  if (tasks.length === 0) {
    return (
      <section className={styles.panel}>
        <h2 className={styles.title}>{member.name}</h2>
        <p className={styles.empty}>No tasks yet</p>
      </section>
    )
  }

  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>{member.name}</h2>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.item}>
            <label className={styles.taskLabel}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => onToggleTask(task.id)}
              />
              <span className={task.done ? styles.done : ''}>{task.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}