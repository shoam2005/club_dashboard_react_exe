// App - keeps all the state (useState) and builds the page from the components.
import { useState } from 'react'
import { initialMembers, initialTasks } from './data.js'
import styles from './App.module.css'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import FilterBar from './components/FilterBar/FilterBar.jsx'
import MembersList from './components/MembersList/MembersList.jsx'
import TasksPanel from './components/TasksPanel/TasksPanel.jsx'
import Notice from './components/Notice/Notice.jsx'

export default function App() {
  const [members, setMembers] = useState(initialMembers)
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedMemberId, setSelectedMemberId] = useState(null)
  const [showOnlyActive, setShowOnlyActive] = useState(false)
  const [layout, setLayout] = useState('list')

  function onToggleActive() {
    setShowOnlyActive((prev) => !prev)
  }

  function onLayoutChange(nextLayout) {
    setLayout(nextLayout)
  }

  function onSelect(memberId) {
    setSelectedMemberId(memberId)
  }

  function onToggleTask(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const visibleMembers = showOnlyActive
    ? members.filter((member) => member.isActive)
    : members

  const selectedMember =
    members.find((member) => member.id === selectedMemberId) ?? null

  const memberTasks = selectedMemberId
    ? tasks.filter((task) => task.assignedTo === selectedMemberId)
    : []

  return (
    <div className={styles.app}>
      <Header />

      <FilterBar
        showOnlyActive={showOnlyActive}
        onToggleActive={onToggleActive}
        layout={layout}
        onLayoutChange={onLayoutChange}
      />

      {selectedMember && !selectedMember.isActive && (
        <Notice type="warning">{selectedMember.name} is inactive.</Notice>
      )}

      <main className={styles.content}>
        <div className={styles.membersColumn}>
          <MembersList
            members={visibleMembers}
            layout={layout}
            selectedMemberId={selectedMemberId}
            onSelect={onSelect}
          />
        </div>

        <aside className={styles.tasksColumn}>
          <TasksPanel
            member={selectedMember}
            tasks={memberTasks}
            onToggleTask={onToggleTask}
          />
        </aside>
      </main>

      <Footer />
    </div>
  )
}