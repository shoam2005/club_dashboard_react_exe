// FilterBar - the toggle "Show only active members" + the "List" / "Grid" switch.
// It has no state of its own: App owns the state and passes it down as props.
import styles from './FilterBar.module.css'

/**
 * @param {object} props
 * @param {boolean} props.showOnlyActive - is the checkbox checked?
 * @param {() => void} props.onToggleActive - call it when the checkbox is clicked
 * @param {"list" | "grid"} props.layout - the current layout. Its button gets the class styles.active
 * @param {(layout: "list" | "grid") => void} props.onLayoutChange - call it with "list" or "grid"
 */
export default function FilterBar({
  showOnlyActive,
  onToggleActive,
  layout,
  onLayoutChange,
}) {
  return (
    <div className={styles.filterBar}>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={showOnlyActive}
          onChange={onToggleActive}
        />
        Show only active members
      </label>

      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.layoutSwitch} ${layout === 'list' ? styles.active : ''}`}
          onClick={() => onLayoutChange('list')}
        >
          List
        </button>
        <button
          type="button"
          className={`${styles.layoutSwitch} ${layout === 'grid' ? styles.active : ''}`}
          onClick={() => onLayoutChange('grid')}
        >
          Grid
        </button>
      </div>
    </div>
  )
}