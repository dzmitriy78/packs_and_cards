import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType, DispatchType} from "../../main/bll/store";
import {LOGIN_PATH, REGISTER_PATH} from "../../main/Routing";
import {NavLink} from "react-router-dom";
import {updateUserTC} from "../../main/bll/profileReducer";
import Loader from "../../main/ui/Loader";
import {RequestLoadingType, setIsLoadingAC} from "../../main/bll/appReducer";
import {UserDataType} from "../../main/dal/authAPI";
import cl from "./../../styles/Profile.module.scss"
import moment from "moment";
import {InputText} from "primereact/inputtext";
import defaultAva from "./../../Assets/user.png"
import Message from "../../main/ui/Messages";
import UploadFileInput from "../../utils/UploadFileInput";


const Profile = () => {
    const isAuth = useSelector<AppStoreType, boolean>((state) => state.login.isAuth)
    const userData = useSelector<AppStoreType, UserDataType>((state) => state.login.userData)
    const isLoading = useSelector<AppStoreType, RequestLoadingType>((state) => state.app.isLoading)
    const dispatch = useDispatch<DispatchType>()

    const [editName, setEditName] = useState(false)
    const [newName, setNewName] = useState<string>(userData.name)
    const [ava, setAva] = useState<string>(userData.avatar)

    const changeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewName(e.currentTarget.value)
    }
    const setUpdateUser = () => {
        setEditName(false)
        if (newName !== userData.name)
            dispatch(updateUserTC(newName, ""))
    }

    const dispatchHandler = (file64: string) => {
        dispatch(updateUserTC("", file64))
    }

    const errorImgHandler = () => {
        dispatch(setIsLoadingAC("failed"))
        setAva(defaultAva)
    }

    return (
        <>
            {ava === defaultAva && <Message message={'Image is corrupted, choose another'}/>}
            {isLoading === 'loading' && <Loader/>}
            {isAuth
                ? <div className={cl.rootProfile}>
                    <div>
                        <img style={{maxWidth: "150px"}}
                             onError={errorImgHandler}
                             src={ava}
                             alt={"avatar"}/>
                        <UploadFileInput icon={"pi pi-upload"}
                                         className={"p-button-outlined"}
                                         dispatch={dispatchHandler}
                                         label={"Change"}
                                         callback={setAva}/>
                    </div>
                    <div className={cl.profile}
                         title={"double click to edit"}
                         onBlur={setUpdateUser}>
                        <div className={cl.name}
                             onDoubleClick={() => setEditName(true)}>
                            {userData.name}
                        </div>
                        <div>
                            {editName && <InputText placeholder={"enter image url"}
                                                    autoFocus={true}
                                                    onChange={changeName}
                                                    defaultValue={userData.name}
                            />}
                        </div>
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
        </>)
}

export default Profile