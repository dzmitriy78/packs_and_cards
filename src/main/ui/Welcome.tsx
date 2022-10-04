import React, {useEffect} from 'react'
import {useSelector} from "react-redux"
import {AppStoreType} from "../bll/store"
import {LoginResponseType} from "../dal/authAPI"
import {useNavigate} from "react-router-dom"
import {PROFILE_PATH} from "../Routing"
import cl from "../../styles/Login.module.scss"

const Welcome = () => {
    const userData = useSelector<AppStoreType, LoginResponseType>(state => state.login.userData)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate(PROFILE_PATH)
        }, 4000)
    }, [])
    return (
        <div className={cl.back}>
            <div className={cl.welcomeTitle}>
                Hi, {userData.name}!<br/>
                Welcome to the card<br/> learning program
            </div>
        </div>
    )
}

export default Welcome