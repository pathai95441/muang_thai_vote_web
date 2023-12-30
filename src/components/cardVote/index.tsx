import { Avatar, Divider } from '@mui/material'
import styles from './cardVote.module.css'
import { AccountCircle, HowToReg } from '@mui/icons-material'
import textStyles from '@/styles/Text.module.css'

interface CardVoteProps {
  key: string | number
  candidateName: string
  voteCount: number
  description: string
  voted: boolean
}

export default function CardVote({ candidateName, voteCount, description, voted }: CardVoteProps): JSX.Element {
  return (
    <div className={styles.container}> 
        <div className={styles.card_header}> 
            <div className={styles.label_candidate}>
                <Avatar style={{ height: "32px", width: "32px"}}>
                    <AccountCircle style={{ height: "32px"}} />
                </Avatar>
                <h3 style={{ marginLeft: "8px" }}>
                  {candidateName}
                </h3>
            </div>
            <div className={styles.count_vote}>
              <h3>
                {voteCount}
              </h3>
              <HowToReg className={voted ? styles.is_voted : styles.icon_vote} />
            </div>
        </div> 
        <Divider />
        <div className={styles.card_content}>
          <h4 className={textStyles.text_color_gray}>
            {description}
          </h4>
        </div>
    </div>
  )
}
