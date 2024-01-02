import styles from '@/styles/Home.module.css'
import { Avatar, Button, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Path } from '@/router/path';
import MTLLogo from '@/components/logo';
import InputPassword from '@/components/input/inputPassword';
import { useContext, useState } from 'react';
import { SignInAPI } from '@/apis/signIn';
import { AppContext } from './_app';

interface ISignInData {
    UserName: string
    Password: string
}

export default function Login() {
  const router = useRouter()
  const [validated, setValidated] = useState<boolean>(false)
  const [signInData, setSignInData] = useState<ISignInData>({UserName: "", Password: ""})
  const { alertError } = useContext(AppContext);

  const handleSignIn = () => {
    setValidated(true)
    if (signInData.UserName && signInData.Password) {
      SignInAPI(signInData).then(() => {window.location.href = Path.vote}).catch((e: any) => {alertError?.(JSON.stringify(e?.message), e?.response?.status)})
    }
  }

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.card}>
            <MTLLogo />
            <div className={styles.card_content}> 
              <TextField 
                id="outlined-required"
                label="UserName"
                error={!signInData?.UserName && validated}
                value={signInData?.UserName}
                onChange={(e)=>{ setSignInData({ ...signInData, UserName: e.target.value }) }}
                style={{ width: "100%" }}
              />
              <InputPassword 
                error={!signInData?.Password && validated}
                onChange={(e)=>{ setSignInData({ ...signInData, Password: e }) }}
                value={signInData?.Password}
              /> 
              <Button
                variant="contained" 
                style={{ marginTop: "12px" }} 
                className={styles.summit_button}
                onClick={() => handleSignIn()}
              > Sign In </Button>
            </div>
            <div className={styles.flex_center}>
              <Avatar style={{ height: "24px", width: "24px", marginRight: "8px"}}>
                <AccountCircle style={{ height: "24px"}} color='success'/>
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
