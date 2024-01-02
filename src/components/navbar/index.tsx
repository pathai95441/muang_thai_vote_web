
import { Path } from '@/router/path'
import styles from './navbar.module.css'
import {  AccountCircle } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import MTLLogo from '../logo'
import { useRouter } from 'next/router'
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_COOKIE, ROLE_ID, USER_NAME } from '@/const'
import { useContext, useState } from 'react'
import { AppContext } from '@/pages/_app'

export default function Navbar() {
    const router = useRouter()
    const { roleID, userName } = useContext(AppContext);
    const MenuGuest = [
        { Title: "Vote Candidate", DestinationPath: Path.vote, goto: Path.vote }
    ]

    const MenuAdmin = [
        { Title: "Vote Candidate", DestinationPath: Path.vote, goto: Path.vote },
        { Title: "Manage Candidate", DestinationPath: Path.manageCandidate, goto: Path.manageCandidate }
    ]

    let Menu = roleID == "1" ? MenuAdmin : MenuGuest

    const handleLogout = () => {
        Cookies.remove(ACCESS_TOKEN_COOKIE)
        router.push(Path.signIn)
    }

    return (
        <div className={styles.container}>
            <MTLLogo style={{ height: "44px", fontSize: "24px" }}/>
            <div className={styles.navbar}>
                <div className={styles.group_left}>
                    {Menu.map((e, i) => (
                        <div key={i} className={styles.menu} onClick={() => router.push(e.goto)}>
                            <h3 className={styles.menu_title}>{e.Title}</h3>
                        </div>  
                    ))}
                </div>
                <div className={styles.group_right}>
                    <Avatar style={{ height: "32px", width: "32px"}}>
                        <AccountCircle style={{ height: "32px"}} />
                    </Avatar>
                    <h3 style={{ marginLeft: "8px" }}> { userName } </h3>
                    <div onClick={() => handleLogout()}>
                        <LogoutIcon style={{ marginLeft: "8px", cursor: "pointer" }} fontSize='medium' color='error' /> 
                    </div>
                </div> 
            </div>
        </div>
    )
}
