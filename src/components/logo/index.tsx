import { CSSProperties } from 'react'
import styles from './logo.module.css'

interface MTLLogoProps {
  style?: CSSProperties
}

export default function MTLLogo({ style }: MTLLogoProps) {
  return (
    <div className={styles.card} style={style}> 
        <img src="/MTLLogo.svg" className={styles.card_logo} style={style}/>
        <h1 className={styles.card_title} style={style}> Vote </h1> 
    </div>
  )
}
