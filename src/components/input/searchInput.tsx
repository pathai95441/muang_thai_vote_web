import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface ISearchInputProps {
  value?: string
  onChange: (e: string) => void
  onSubmit: () => void
}

export default function SearchInput({ value, onChange, onSubmit }: ISearchInputProps) {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Candidate"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        inputProps={{ 'aria-label': 'search Candidate' }}
        onKeyDown={(e) => { 
          if(e.keyCode == 13){ 
            e.preventDefault();
         }
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit()
          }
        }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {onSubmit()}} >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}