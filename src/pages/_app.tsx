import Navbar from '@/components/ืnavbar'
import { Path } from '@/router/path';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Sarabun } from 'next/font/google';
import { useRouter } from 'next/router';

const sarabun = Sarabun({
    weight: '400',
    subsets: ['latin']
  });


export default function App({ Component, pageProps }: AppProps) { 
  const router = useRouter()
  const isShownNavbar = (router.asPath != Path.signIn && router.asPath != Path.register)
  return (
    <div className={sarabun.className}>
      {isShownNavbar && <Navbar />}  
      <Component {...pageProps} />
    </div>
  )
}
