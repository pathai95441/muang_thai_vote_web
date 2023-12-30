
import styles from './logo.module.css'

export default function MTLLogo() {
  return (
    <div className={styles.card}> 
        <img src="/MTLLogo.svg" className={styles.card_logo} />
        <h1 className={styles.card_title}> Vote </h1> 
    </div>
  )
}
