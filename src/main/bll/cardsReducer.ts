import {SetIsLoadingAT} from "./appReducer";


const GET_CARDS = "packsReducer/GET-CARDS"

export const getCards = (data: cardsInitialStateType) => ({
    type: GET_CARDS,
    payload: {data}
}) as const

const cardsInitialState: cardsInitialStateType = {}

const cardsReducer = (state = cardsInitialState, action: CardsReducerAT): cardsInitialStateType => {

    switch (action.type) {
        case GET_CARDS:
            return {
                ...state,
                ...action.payload.data
            }
        default: {
            return state
        }
    }
}

export default cardsReducer;


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

export type cardsInitialStateType = {}
type getCardsAT = ReturnType<typeof getCards>
export type CardsReducerAT = getCardsAT | SetIsLoadingAT
