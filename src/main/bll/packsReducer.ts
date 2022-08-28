import {SetIsLoadingAT} from "./appReducer";


const GET_PACKS = "packsReducer/GET-PACKS"

export const getPacks = (data: packsInitialStateType) => ({
    type: GET_PACKS,
    payload: {data}
}) as const

const packsInitialState: packsInitialStateType = {}

const packsReducer = (state = packsInitialState, action: PacksReducerAT): packsInitialStateType => {

    switch (action.type) {
        case GET_PACKS:
            return {
                ...state,
                ...action.payload.data
            }
        default: {
            return state
        }
    }
}

export default packsReducer;


/*export const forgotPasswordTC = (email: string): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        const data = await registerAPI.forgot(email)
        if (data)
            dispatch(forgotPassword(data.data.data))
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    }
}*/

export type packsInitialStateType = {}
type getPacksAT = ReturnType<typeof getPacks>
export type PacksReducerAT = getPacksAT | SetIsLoadingAT
