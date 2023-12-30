
import styles from '@/styles/Home.module.css'
import internalStyles from './register.module.css'
import { Button, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Path } from '@/router/path';
import { useRouter } from 'next/router';
import MTLLogo from '@/components/logo';
import InputPassword from '@/components/input/inputPassword';

export default function Register() {
  const router = useRouter()
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.card}>
            <ArrowBackIcon className={internalStyles.back_icon} onClick={() => router.push(Path.signIn)} />
            <MTLLogo />
            <div className={styles.card_content}>
              <TextField 
                id="outlined-required"
                label="Name"
                style={{ width: "100%" }}
              />
              <TextField 
                id="outlined-required"
                label="Email"
                style={{ marginTop: "12px", width: "100%" }}
              />
              <TextField 
                id="outlined-required"
                label="UserName"
                style={{ marginTop: "12px", width: "100%" }}
              />
              <InputPassword />
              <Button variant="contained" style={{ marginTop: "12px" }} className={styles.summit_button}>Register</Button>
            </div>
        </div>
      </main>
    </div>
  )
}
