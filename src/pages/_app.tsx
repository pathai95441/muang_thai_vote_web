import CustomizedSnackBars, { SeverityEnum } from '@/components/snackBar';
import Navbar from '@/components/navbar'
import { Path } from '@/router/path';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Sarabun } from 'next/font/google';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { ACCESS_TOKEN_COOKIE, ROLE_ID, USER_NAME, VOTE_CANDIDATE_ID } from '@/const';

const sarabun = Sarabun({
    weight: '400',
    subsets: ['latin']
  });

interface IAppContext {
  userID?: string
  roleID?: string
  userName?: string
  voteCandidateID?: string
  alert: boolean
  alertMessage?: string
  alertType?: SeverityEnum
  setAppState?: Dispatch<SetStateAction<IAppContext>>
  alertError?: (message: string, status?: number) => void
  alertSuccess?: (message: string) => void
}

// context
export const AppContext = createContext<IAppContext>({ alert: false });
export default function App({ Component, pageProps }: AppProps) { 
  const [appState, setAppState] = useState<IAppContext>({ alert: false });
  const router = useRouter()

  const alertError = (message: string, status?: number) => {
    setAppState({ ...appState, alert: true, alertType: SeverityEnum.error, alertMessage: message })
    if(status == 401) {
      Cookies.remove(ACCESS_TOKEN_COOKIE)
      router.push(Path.signIn)
    }
    setTimeout(() => {
      setAppState({...appState, alert: false })
    }, 1500);
  }

  const alertSuccess = (message: string) => {
    setAppState({ ...appState, alert: true, alertType: SeverityEnum.success, alertMessage: message })
    setTimeout(() => {
      setAppState({...appState, alert: false })
    }, 1500);
  }

  useEffect(() => {
    setAppState({...appState, userName: Cookies.get(USER_NAME), roleID: Cookies.get(ROLE_ID), voteCandidateID: Cookies.get(VOTE_CANDIDATE_ID) })
  }, [Cookies.get(ROLE_ID), Cookies.get(USER_NAME)])


  const isShownNavbar = (router.asPath != Path.signIn && router.asPath != Path.register)
  return (
    <AppContext.Provider value={{ ...appState, setAppState, alertError, alertSuccess }}>
      <div className={sarabun.className}>
        <CustomizedSnackBars severity={appState.alertType} isOpen={appState.alert} message={appState.alertMessage} />
        {isShownNavbar && <Navbar />}  
        <Component {...pageProps} />
      </div>
    </AppContext.Provider>
  )
}
