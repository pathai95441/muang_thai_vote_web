
import { Path } from '@/router/path'
import styles from './navbar.module.css'
import { AccountBalance, AccountCircle } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import MTLLogo from '../logo'

export default function Navbar() {
    const Menu = [
        { Title: "Vote Candidate", DestinationPath: Path.vote },
        { Title: "Manage Candidate", DestinationPath: Path.manageCandidate }
    ]

    return (
        <div className={styles.container}>
            <MTLLogo style={{ height: "44px", fontSize: "24px" }}/>
            <div className={styles.navbar}>
                <div className={styles.group_left}>
                    {Menu.map((e, i) => (
                        <div key={i} className={styles.menu}>
                            <h3 className={styles.menu_title}>{e.Title}</h3>
                        </div>  
                    ))}
                </div>
                <div className={styles.group_right}>
                    <Avatar style={{ height: "32px", width: "32px"}}>
                        <AccountCircle style={{ height: "32px"}} />
                    </Avatar>
                    <h3 style={{ marginLeft: "8px" }}> Pathai </h3>
                </div> 
            </div>
        </div>
    )
}
