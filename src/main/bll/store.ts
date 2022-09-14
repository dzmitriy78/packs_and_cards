import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import loginReducer, {AuthActionType} from "./loginReducer";
import registerReducer, {RegisterActionType} from "./registerReducer";
import forgotReducer, {ForgotReducerAT} from "./forgotReducer";
import setNewPasswordReducer, {SetNewPasswordAT} from "./setNewPasswordReducer";
import profileReducer, {ProfileReducerAT} from "./profileReducer";
import appReducer, {AppReducerAT} from "./appReducer";
import packsReducer, {PacksReducerAT} from "./packsReducer";
import cardsReducer, {CardsReducerAT} from "./cardsReducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    setNewPassword: setNewPasswordReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

export type AppStoreType = ReturnType<typeof rootReducer>
type AppRootAT =
    AppReducerAT
    | AuthActionType
    | ProfileReducerAT
    | RegisterActionType
    | SetNewPasswordAT
    | ForgotReducerAT
    | PacksReducerAT
    | CardsReducerAT
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppRootAT>
export type DispatchType = ThunkDispatch<AppStoreType, unknown, AnyAction>