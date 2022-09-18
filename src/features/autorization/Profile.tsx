import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {LOGIN_PATH, REGISTER_PATH} from "../../main/Routing";
import {NavLink} from "react-router-dom";
import {updateUserTC} from "../../main/bll/profileReducer";
import Loader from "../../main/ui/Loader";
import {RequestLoadingType} from "../../main/bll/appReducer";
import {UserDataType} from "../../main/dal/authAPI";
import cl from "./../../styles/Profile.module.scss"
import moment from "moment";

const Profile = () => {
    const isAuth = useSelector<AppStoreType, boolean>((state) => state.login.isAuth)
    const userData = useSelector<AppStoreType, UserDataType>((state) => state.login.userData)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>((state) => state.app.isLoading)
    const dispatch = useDispatch<DispatchType>()

    const [editName, setEditName] = useState(false)
    const [editAvatar, setEditAvatar] = useState(false)
    const [newName, setNewName] = useState<string>(userData.name)
    const [newAvatar, setNewAvatar] = useState<string>("")

    const changeAvatar: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        setNewAvatar(e.currentTarget.value)
    }
    const changeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewName(e.currentTarget.value)
    }
    const setUpdateUser = async () => {
        await setEditAvatar(false)
        setEditName(false)

        dispatch(updateUserTC(newName, newAvatar))
    }

    return (
        <>
            {isLoading === 'loading' && <Loader/>}
            {isAuth
                ? <div className={cl.rootProfile}>
                    <div onBlur={setUpdateUser}>
                        <div onDoubleClick={() => setEditAvatar(true)}>
                            <img style={{maxWidth: "150px"}}
                                 src={userData.avatar}
                                 alt={"avatar"}/>
                        </div>
                        {editAvatar && <input placeholder={"insert avatar"}
                                              autoFocus={true}
                                              onChange={changeAvatar}
                                              defaultValue={userData.avatar}
                        />}
                    </div>
                    <div className={cl.profile} onBlur={setUpdateUser}>
                        <div className={cl.name}
                             onDoubleClick={() => setEditName(true)}>
                            {userData.name}
                        </div>
                        {editName && <input placeholder={"enter image url"}
                                            autoFocus={true}
                                            onChange={changeName}
                                            defaultValue={userData.name}
                        />}
                        <span>e-mail: </span>
                        <div className={cl.value}>{userData.email}</div>
                        <span>created: </span>
                        <div className={cl.value}>
                            {moment(userData.created).format("DD.MM.YYYY  HH:mm")}
                        </div>
                        <span>packs count: </span>
                        <div className={cl.value}>{userData.publicCardPacksCount}</div>
                    </div>
                </div>
                : <div>Profile is empty.<br/> <span>Please </span>
                    <NavLink to={LOGIN_PATH}>Log in</NavLink> <span>or </span>
                    <NavLink to={REGISTER_PATH}>Register</NavLink>
                </div>
            }
        </>);
};

export default Profile;