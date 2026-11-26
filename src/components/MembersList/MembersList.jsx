// MembersList - wraps all the MemberCards and switches between list and grid.
import MemberCard from '../MemberCard/MemberCard.jsx'
import styles from './MembersList.module.css'

/**
 * @param {object} props
 * @param {Array<{id: number, name: string, role: string, isActive: boolean}>} props.members - the members to show (already filtered)
 * @param {"list" | "grid"} props.layout - the wrapper gets styles.membersList + styles.list or styles.grid
 * @param {number | null} props.selectedMemberId
 * @param {(memberId: number) => void} props.onSelect - pass it to every MemberCard
 */
export default function MembersList({
  members,
  layout,
  selectedMemberId,
  onSelect,
}) {
  if (members.length === 0) {
    return <p className={styles.empty}>No members to show</p>
  }

  const wrapperClassName = [
    styles.membersList,
    styles[layout] ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClassName}>
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          isSelected={selectedMemberId === member.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}