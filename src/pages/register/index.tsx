
import styles from '@/styles/Home.module.css'
import internalStyles from './register.module.css'
import { Button, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Path } from '@/router/path';
import { useRouter } from 'next/router';
import MTLLogo from '@/components/logo';
import InputPassword from '@/components/input/inputPassword';
import { useContext, useState } from 'react';
import { IRegisterRequest, RegisterAPI } from '@/apis/user';
import { AppContext } from '../_app';

export default function Register() {
  const router = useRouter()
  const { alertError, alertSuccess } = useContext(AppContext);

  const [validated, setValidated] = useState<boolean>(false)
  const [registerData, setRegisterData] = useState<IRegisterRequest>({ UserName: "", Password: "", Email: "", RoleID: 2 })

  const handleRegister = () => {
    setValidated(true)
    if (registerData.UserName && registerData.Password && registerData.Email) {
      RegisterAPI(registerData).then(() => {alertSuccess?.("Register Success");router.push(Path.signIn)}).catch((e: any) => {alertError?.(JSON.stringify(e?.message), e?.response?.status)})
    }
  }

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.card}>
            <ArrowBackIcon className={internalStyles.back_icon} onClick={() => router.push(Path.signIn)} />
            <MTLLogo />
            <div className={styles.card_content}>
              <TextField 
                id="outlined-required"
                label="Email"
                error={!registerData?.Email && validated}
                onChange={(e)=>{ setRegisterData({ ...registerData, Email: e.target.value }) }}
                style={{ marginTop: "12px", width: "100%" }}
              />
              <TextField 
                id="outlined-required"
                label="UserName"
                error={!registerData?.UserName && validated}
                onChange={(e)=>{ setRegisterData({ ...registerData, UserName: e.target.value }) }}
                style={{ marginTop: "12px", width: "100%" }}
              />
              <InputPassword 
                error={!registerData?.Password && validated}
                onChange={(e)=>{ setRegisterData({ ...registerData, Password: e }) }}
                value={registerData?.Password}
              />
              <Button variant="contained" style={{ marginTop: "12px" }} className={styles.summit_button} onClick={() => handleRegister()}>Register</Button>
            </div>
        </div>
      </main>
    </div>
  )
}
