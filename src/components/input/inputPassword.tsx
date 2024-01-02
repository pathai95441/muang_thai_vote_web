import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { CSSProperties, useState } from "react";

interface InputPasswordProps {
    style?: CSSProperties
    error?: boolean
    onChange: (e: string) => void
    value?: string
}

export default function InputPassword({ style, error, onChange, value }: InputPasswordProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{ ...style, width: "100%" }}>
            <InputLabel htmlFor="outlined-adornment-password" error={error} >Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                error={error}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
            }
            label="Password"
            />
        </FormControl>
    )
}
