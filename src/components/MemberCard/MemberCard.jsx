// MemberCard - avatar (initials), name, role badge and a small role-colored action button.
import styles from './MemberCard.module.css'

/**
 * @param {object} props
 * @param {{id: number, name: string, role: "Leader" | "Member" | "Guest", isActive: boolean}} props.member
 * @param {boolean} props.isSelected - true when this is the selected member (the card gets styles.selected)
 * @param {(memberId: number) => void} props.onSelect - call it with member.id when the card is clicked
 */
export default function MemberCard({ member, isSelected, onSelect }) {
  const parts = member.name.trim().split(/\s+/)
  const firstInitial = parts[0]?.[0] ?? ''
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : ''
  const initials = `${firstInitial}${lastInitial}`.toUpperCase()

  const cardClassName = [
    styles.card,
    !member.isActive ? styles.inactive : '',
    isSelected ? styles.selected : '',
  ]
    .filter(Boolean)
    .join(' ')

  const roleClass = styles[member.role.toLowerCase()] ?? ''
  const buttonClassName = [styles.roleButton, roleClass]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={cardClassName}
      onClick={() => onSelect(member.id)}
    >
      <div className={styles.avatar}>{initials}</div>

      <div className={styles.nameRole}>
        <div className={styles.name}>{member.name}</div>
        <span className={styles.badge}>{member.role}</span>
      </div>

      <button
        type="button"
        className={buttonClassName}
        disabled={!member.isActive}
      >
        Contact
      </button>
    </div>
  )
}