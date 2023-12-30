import styles from '@/styles/Home.module.css'
import { Avatar, Button, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Path } from '@/router/path';
import MTLLogo from '@/components/logo';
import InputPassword from '@/components/input/inputPassword';

export default function Login() {
  const router = useRouter()

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.card}>
            <MTLLogo />
            <div className={styles.card_content}>
              <TextField 
                id="outlined-required"
                label="UserName"
                style={{ width: "100%" }}
              />
              <InputPassword /> 
              <Button
                variant="contained" 
                style={{ marginTop: "12px" }} 
                className={styles.summit_button}
                onClick={() => router.push(Path.vote)}
              > Sign In </Button>
            </div>
            <div className={styles.flex_center}>
              <Avatar style={{ height: "24px", width: "24px", marginRight: "8px"}}>
                <AccountCircle style={{ height: "24px"}} />
              </Avatar>
              <h5 
                className={styles.register_title} 
                onClick={() => router.push(Path.register)}
              > Register </h5>
            </div>
        </div>
      </main>
    </div>
  )
}
