import CardVote from "@/components/cardVote";
import styles from './manageCandidate.module.css'
import { Grid, MenuItem, TextField } from "@mui/material";
import SearchInput from "@/components/input/searchInput";
import { useContext, useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { GetCandidatesAPI, ICandidateInfo } from "@/apis/candidate";
import { AppContext } from "../_app";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateCandidateDataModal from "@/components/modal/createCandidateModal";

export default function VotePage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [candidates, setCandidates] = useState<ICandidateInfo[]>([])
  const [orderBy, setOrderBy] = useState<string>()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [search, setSearch] = useState<string>()
  const { alertError, voteCandidateID } = useContext(AppContext);
  const sortBy = [
    {
      value: 'ASC',
      label: 'Vote Count: lowest to highest',
    },
    {
      value: 'DESC',
      label: 'Vote Count: highest to lowest',
    }
  ];

  const fetchCandidates = () => {
    setCandidates([])
    GetCandidatesAPI(orderBy, search).then((e) => {
      setCandidates(e ? [...e] : [])
      setTimeout(() => {
        setLoading(false)
      }, 200);
    }).catch((e: any) => {
      alertError?.(JSON.stringify(e?.message), e?.response?.status)
    })
  }

  useEffect(() => {
    fetchCandidates()
  }, [orderBy])

  return (
    <div className={loading ? styles.container_loading : styles.container}>
      { loading ? (
        <CircularProgress />
      ) : (
        <div style={{ width: "1124px" }}>
          <CreateCandidateDataModal 
            isOpen={isOpenModal} 
            onClose={() => setIsOpenModal(false)}
            refetch={() => fetchCandidates()}
          /> 
          <div className={styles.tools}>
            <SearchInput value={search} onChange={(e) => setSearch(e)} onSubmit={() => fetchCandidates()}/>
            <TextField
              id="outlined-select-currency"
              select
              label="Sort By"
              style={{ backgroundColor: "white", minWidth: "200px" }}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              {sortBy.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={styles.create_button} onClick={() => setIsOpenModal(true)}>
            <AddCircleOutlineIcon fontSize={"large"} color="primary" />
            <h3> Create New Candidate </h3>
          </div>
          <Grid container spacing={1}>
            {candidates.map((e, i) => (
              <Grid key={i} item className={styles.card_space}>
                <CardVote 
                    candidateID={e.candidateID} 
                    candidateName={e.candidateName} 
                    voteCount={e.voteScore} 
                    description={e.candidateDescription} 
                    voted={voteCandidateID == e.candidateID} 
                    isAdmin={true} 
                    reFetchList={() => fetchCandidates()} 
                />
              </Grid>
            ))}
          </Grid>
        </div>
        )}
    </div>
  )
}
