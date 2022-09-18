import {setIsLoadingAC, SetIsLoadingAT} from "./appReducer";
import {
    CardPacksType,
    CreatePacksParamsType,
    CreatePacksResponseType,
    GetPacksParamsType,
    GetPacksResponseType,
    packsAPI
} from "../dal/packsAPI";
import {errorHandler} from "../../utils/errorHandler";
import {ThunkType} from "./store";


const SET_PACKS = "packsReducer/SET-PACKS"
const ADD_PACK = "packsReducer/ADD-PACK"
const SET_PACKS_PARAMS = "packsReducer/SET-PACKS-PARAMS"
const DELETE_PACK = "packsReducer/DELETE-PACK"
const UPDATE_PACK = "packsReducer/UPDATE-PACK"

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
export const removePack = (id: string) => ({
    type: DELETE_PACK,
    id
}) as const
export const updatePackName = (id: string, newName: string) => ({
    type: UPDATE_PACK,
    id, newName
}) as const

const packsInitialState: packsInitialStateType = {
    cardPacks: [],
    getPacksParams: {
        packName: "",
        min: 0,
        max: 0,
        sortPacks: "0created",
        page: 1,
        pageCount: 100,
        user_id: /*"62d013204d4a530a949a8238"*/ ""
    },
    page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: "",
    tokenDeathTime: 0
}

const packsReducer = (state = packsInitialState, action: PacksReducerAT): packsInitialStateType => {

    switch (action.type) {
        case SET_PACKS:
            return {
                ...state,
                ...action.data
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
        case DELETE_PACK:
            return {
                ...state,
                cardPacks: state.cardPacks.filter(p => p._id !== action.id)
            }
        case UPDATE_PACK:
            return {
                ...state,
                cardPacks: state.cardPacks.map(p => p._id === action.id ? {...p, name: action.newName} : p)
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
export const deletePackTC = (id: string): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        const res = await packsAPI.deletePack(id)
        if (res)
            dispatch(removePack(id))
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}
export const updatePackTC = (id: string, newName: string): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        const res = await packsAPI.updatePack({cardsPack: {_id: id, name: newName}})
        if (res) {
            dispatch(updatePackName(res.data.updatedCardsPack._id, res.data.updatedCardsPack.name))
        }
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
    getPacksParams: GetPacksParamsType,
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}
type SetPacksAT = ReturnType<typeof setPacks>
type AddPackAT = ReturnType<typeof addPack>
type RemovePackAT = ReturnType<typeof removePack>
type UpdatePackAT = ReturnType<typeof updatePackName>
type SetPacksParamsAT = ReturnType<typeof setPacksParams>

export type PacksReducerAT = SetPacksAT | SetPacksParamsAT | SetIsLoadingAT | AddPackAT | RemovePackAT | UpdatePackAT
