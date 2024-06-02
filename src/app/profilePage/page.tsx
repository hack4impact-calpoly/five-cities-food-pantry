import style from "./profilePage.module.css"
import Navbar from "@components/Navbar"

export default function ProfilePage() {
    return <div>
        <Navbar></Navbar>
        <div className={style.profilePage}>
        <div className={style.icons}>
        <svg><use href="/user-icons.svg#icon-user-profile" /></svg>
        <div className={style.editButton}>
        <svg width="80px" height="40px"><use href="/user-icons.svg#icon-pencil"/></svg>
        </div>
        </div>
        <div className={style.userInfo}>
        <div className={style.nameInfo}>
            <div className={style.nameItem}>
            <p><strong>First Name</strong></p>
            <p className={style.infoBox}>First name here</p>
            </div>
            <div className={style.nameItem}>
            <p><strong>Last Name</strong></p>
            <p className={style.infoBox}>Last Name here</p>
            </div>
        </div>
        <p><strong>Email</strong></p>
        <p className={style.infoBox}>Email here</p>
        <button className={style.logout}><strong>Log out</strong></button>
        </div>
        </div>
    </div>
}