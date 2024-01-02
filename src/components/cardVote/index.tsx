import { Avatar, Divider } from '@mui/material'
import styles from './cardVote.module.css'
import { AccountCircle, HowToReg } from '@mui/icons-material'
import textStyles from '@/styles/Text.module.css'
import DeleteModal from '../modal/deleteModal'
import { useContext, useState } from 'react'
import { DeleteCandidateAPI } from '@/apis/candidate'
import { AppContext } from '@/pages/_app'
import EditCandidateDataModal from '../modal/editCandidateModal'
import { VoteCandidateAPI } from '@/apis/vote_candidate'
import { VOTE_CANDIDATE_ID } from '@/const'
import Cookies from 'js-cookie';

interface CardVoteProps {
  candidateID: string
  candidateName: string
  voteCount: number
  description: string
  voted: boolean
  isAdmin?: boolean
  reFetchList?: () => void
}

export default function CardVote({ candidateID, candidateName, voteCount, description, voted, isAdmin, reFetchList }: CardVoteProps): JSX.Element {
  const appState = useContext(AppContext);
  const { alertError, alertSuccess, voteCandidateID } = useContext(AppContext);

  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const isCanVote = !voteCandidateID || (voteCandidateID && voted)

  const handleDeleteCandidate = () => {
    DeleteCandidateAPI(candidateID).then(() => {
      reFetchList?.()
      alertSuccess?.("Delete Success")
    }).catch((e: any) => {
      alertError?.(JSON.stringify(e?.message), e?.response?.status)
    })
    setIsOpenDeleteModal(false)
  }

  const handleVote = () => {
    if (isCanVote) {
      VoteCandidateAPI({ candidateID, unVote: voted }).then(() => {
        Cookies.set(VOTE_CANDIDATE_ID, voted ? "" : candidateID)
        window.location.reload()
        alertSuccess?.("Vote Success")
      }).catch((e: any) => {
        alertError?.(JSON.stringify(e?.message), e?.response?.status)
      })
    }
  }

  return (
    <div className={styles.container}>
        <EditCandidateDataModal
          isOpen={isOpenEditModal} 
          data={{ 
            candidateDescription: description,
            candidateID: candidateID,
            candidateName: candidateName,
            voteScore: voteCount,
          }} onClose={() => setIsOpenEditModal(false)}
          refetch={() => reFetchList?.()}
        /> 
        <DeleteModal isOpen={isOpenDeleteModal} agree={() => handleDeleteCandidate()} disagree={() => setIsOpenDeleteModal(false)}/>
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
              <HowToReg className={voted ? styles.is_voted : styles.icon} />
            </div>
        </div> 
        <Divider />
        <div className={styles.card_content}>
          <h4 className={textStyles.text_color_gray}>
            {description}
          </h4>
        </div>
        <Divider />
        { isAdmin ? (
          <div>
            <div className={styles.card_footer}>
              <img src="/edit_icon.svg" height="40px" className={styles.icon} onClick={()=>setIsOpenEditModal(true)}/>
              <img src="/trash_icon.svg" height="24px" className={styles.icon} onClick={() => setIsOpenDeleteModal(true)}/>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.card_footer}>
              <div className={ isCanVote ? styles.vote_button : styles.vote_button_disable} onClick={() => handleVote()}>
                <h3> {voted ? "un vote" : "vote"} </h3>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
