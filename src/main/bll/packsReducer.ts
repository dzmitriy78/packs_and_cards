import {setIsLoadingAC, SetIsLoadingAT} from "./appReducer";
import {
    CardPacksType,
    CreatePacksParamsType, CreatePacksResponseType,
    GetPacksParamsType,
    GetPacksResponseType,
    packsAPI
} from "../dal/packsAPI";
import {errorHandler} from "../../utils/errorHandler";
import {ThunkType} from "./store";


const SET_PACKS = "packsReducer/SET-PACKS"
const ADD_PACK = "packsReducer/ADD-PACK"
const SET_PACKS_PARAMS = "packsReducer/SET-PACKS-PARAMS"

export const setPacks = (data: GetPacksResponseType) => ({
    type: SET_PACKS,
    data
}) as const
export const setPacksParams = (data: GetPacksParamsType) => ({
    type: SET_PACKS_PARAMS,
    data
}) as const
export const addPack = (data: CreatePacksResponseType) => ({
    type: ADD_PACK,
    data
}) as const

const packsInitialState: packsInitialStateType = {
    cardPacks: [],
    getPacksParams: {
        packName: "",
        min: 0,
        max: 200,
        sortPacks: "0created",
        page: 1,
        pageCount: 50,
        user_id: /*"62d013204d4a530a949a8238"*/ ""
    }
}

const packsReducer = (state = packsInitialState, action: PacksReducerAT): packsInitialStateType => {

    switch (action.type) {
        case SET_PACKS:
            return {
                ...state,
                cardPacks: action.data.cardPacks
            }
        case SET_PACKS_PARAMS:
            return {
                ...state,
                getPacksParams: action.data
            }
        case ADD_PACK:
            return {
                ...state,
                cardPacks: [action.data.newCardsPack, ...state.cardPacks]
            }
        default: {
            return state
        }
    }
}

export default packsReducer;

export const getPacksTC = (params: GetPacksParamsType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        const res = await packsAPI.getPacks(params)
        if (res)
            dispatch(setPacks(res.data))
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}
export const addPackTC = (data: CreatePacksParamsType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        const res = await packsAPI.createPacks(data)
        if (res)
            dispatch(addPack(res.data))
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}


export const setPacksParamsTC = (data: GetPacksParamsType): ThunkType => (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        dispatch(setPacksParams(data))
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}

export type packsInitialStateType = {
    cardPacks: CardPacksType[],
    getPacksParams: GetPacksParamsType
}
type setPacksAT = ReturnType<typeof setPacks>
type addPackAT = ReturnType<typeof addPack>
type setPacksParamsAT = ReturnType<typeof setPacksParams>

export type PacksReducerAT = setPacksAT | setPacksParamsAT | SetIsLoadingAT | addPackAT
