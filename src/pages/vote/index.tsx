import CardVote from "@/components/cardVote";
import styles from './vote.module.css'
import { Grid, MenuItem, TextField } from "@mui/material";
import SearchInput from "@/components/input/searchInput";
import { useContext, useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { GetCandidatesAPI, ICandidateInfo } from "@/apis/candidate";
import { AppContext } from "../_app";

export default function VotePage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [candidates, setCandidates] = useState<ICandidateInfo[]>([])
  const [orderBy, setOrderBy] = useState<string>()
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

  const fetchCandidates = (overWriteSearch?: boolean) => {
    setCandidates([])
    GetCandidatesAPI(orderBy, overWriteSearch ? "" : search).then((e) => {
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
        <div style={{ width: "1124px"}}>
          <div className={styles.tools}>
            <SearchInput value={search} onChange={(e) => {
              setSearch(e)
              if (!e) {
                fetchCandidates(true)
              }
            }} onSubmit={() => fetchCandidates()} />
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
          <Grid container spacing={1}>
            {candidates.map((e, i) => (
              <Grid key={i} item className={styles.card_space}>
                <CardVote candidateID={e.candidateID} candidateName={e.candidateName} voteCount={e.voteScore} description={e.candidateDescription} voted={voteCandidateID == e.candidateID} reFetchList={() => fetchCandidates()}/>
              </Grid>
            ))}
          </Grid>
        </div>
        )}
    </div>
  )
}
