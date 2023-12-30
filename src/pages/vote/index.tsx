import CardVote from "@/components/cardVote";
import styles from './vote.module.css'
import { Grid, MenuItem, TextField } from "@mui/material";
import SearchInput from "@/components/input/searchInput";

export default function Register() {
  const mockList = [
    {
      candidateName: "Pathai Laoatthaphong",
      voteCount: 23,
      description: "Looking for some already great color combinations? Our color chart features flat design colors, Google's Material design scheme and the classic web safe color palette, all with Hex color codes."
    },
    {
      candidateName: "Bill Gate",
      voteCount: 42,
      description: "Looking for some already great color combinations? Our color chart features flat design colors, Google's Material design scheme and the classic web safe color palette, all with Hex color codes."
    },
    {
      candidateName: "Steve Job",
      voteCount: 52,
      description: "Looking for some already great color combinations? Our color chart features flat design colors, Google's Material design scheme and the classic web safe color palette, all with Hex color codes."
    },
    {
      candidateName: "Mark Zekerberk",
      voteCount: 69,
      description: "Looking for some already great color combinations? Our color chart features flat design colors, Google's Material design scheme and the classic web safe color palette, all with Hex color codes."
    },
  ]

  const sortBy = [
    {
      value: 'lowToHigh',
      label: 'Vote Count: lowest to highest',
    },
    {
      value: 'highToLow',
      label: 'Vote Count: highest to lowest',
    },
    {
      value: 'byName',
      label: 'Candidate Name',
    },
  ];

  return (
    <div className={styles.container}>
      <div style={{ maxWidth: "1124px"}}>
        <div className={styles.tools}>
          <SearchInput />
          <TextField
            id="outlined-select-currency"
            select
            label="Sort By"
            style={{ backgroundColor: "white", minWidth: "200px" }}
          >
            {sortBy.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Grid container spacing={1}>
          {mockList.map((e, i) => (
            <Grid key={i} item className={styles.card_space}>
              <CardVote key={i} candidateName={e.candidateName} voteCount={e.voteCount} description={e.description} voted={i==0} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}
