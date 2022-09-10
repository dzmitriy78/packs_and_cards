import {setIsLoadingAC, SetIsLoadingAT} from "./appReducer";
import {
    CardPacksType,
    cardsAPI,
    CardsType,
    CreateCardResponseType,
    CreateCardsType,
    GetCardsParamsType,
    GetCardsResponseType,
    UpdateCardParamsType
} from "../dal/packsAPI";
import {ThunkType} from "./store";
import {errorHandler} from "../../utils/errorHandler";

const SET_CARDS = "cardReducer/SET-CARDS"
const CREATE_CARD = "cardReducer/CREATE-CARD"
const DELETE_CARD = "cardReducer/DELETE-CARD"
const UPDATE_CARD = "cardReducer/UPDATE-CARD"
const SET_CARDS_PACK = "cardReducer/SET-CARDS-PACK"

export const setCards = (data: GetCardsResponseType) => ({type: SET_CARDS, payload: {data}}) as const
export const addCard = (data: CreateCardResponseType) => ({type: CREATE_CARD, data}) as const
export const removeCard = (cardId: string) => ({type: DELETE_CARD, cardId}) as const
export const renovationCard = (data: CardsType) => ({type: UPDATE_CARD, data}) as const
export const setCardsPack = (data: CardPacksType) => ({type: SET_CARDS_PACK, payload: {data}}) as const

const cardsInitialState: cardsInitialStateType = {
    getCardParams: {
        cardAnswer: "",
        cardQuestion: "",
        cardsPack_id: /*"630b326c08095407487d7a75"*/"",
        min: 0,
        max: 120,
        sortCards: "1grade",
        page: 1,
        pageCount: 120
    },
    cards: [],
    currentCardsPack: {
        _id: "",
        user_id: "",
        user_name: "",
        private: false,
        name: "",
        path: "",
        grade: 0,
        shots: 0,
        deckCover: "",
        cardsCount: 0,
        type: "",
        rating: 0,
        created: "",
        updated: "",
        more_id: "",
        __v: 0
    },
    packUserId: "",
    page: 0,
    pageCount: 0,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    token: "",
    tokenDeathTime: 0
}

const cardsReducer = (state = cardsInitialState, action: CardsReducerAT): cardsInitialStateType => {

    switch (action.type) {
        case SET_CARDS:
            return {
                ...state,
                cards: action.payload.data.cards
            }
        case CREATE_CARD:
            return {
                ...state,
                cards: [action.data.newCard, ...state.cards]
            }
        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(c => c._id !== action.cardId)
            }
        case UPDATE_CARD:
            return {
                ...state,
                cards: state.cards.map(c => c._id === action.data._id
                    ? {...c, question: action.data.question, answer: action.data.answer}
                    : c)
            }
        case SET_CARDS_PACK:
            return {
                ...state,
                currentCardsPack: action.payload.data
            }
        default: {
            return state
        }
    }
}

export default cardsReducer;

export const getCardsTC = (data: GetCardsParamsType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        const res = await cardsAPI.getCards(data)
        dispatch(setCards(res.data))
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e) {
        errorHandler(e, dispatch)
    }
}
export const createCardTC = (data: CreateCardsType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        const res = await cardsAPI.createCard(data)
        dispatch(addCard(res.data))
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e) {
        errorHandler(e, dispatch)
    }
}
export const deleteCardTC = (id: string): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        await cardsAPI.deleteCard(id)
        dispatch(removeCard(id))
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e) {
        errorHandler(e, dispatch)
    }
}
export const updateCardTC = (data: UpdateCardParamsType): ThunkType => async (dispatch) => {
    dispatch(setIsLoadingAC('loading'))
    try {
        const res = await cardsAPI.updateCard(data)
        if (res.data)
            dispatch(renovationCard(res.data.updatedCard))
        dispatch(setIsLoadingAC('succeeded'))
    } catch (e) {
        errorHandler(e, dispatch)
    }
}

export type cardsInitialStateType = {
    getCardParams: GetCardsParamsType
    cards: CardsType[] | []
    currentCardsPack: CardPacksType
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}
type setCardsAT = ReturnType<typeof setCards>
type createCardsAT = ReturnType<typeof addCard>
type deleteCardsAT = ReturnType<typeof removeCard>
type renovationCardAT = ReturnType<typeof renovationCard>
type setCardsPackAT = ReturnType<typeof setCardsPack>

export type CardsReducerAT =
    setCardsAT
    | SetIsLoadingAT
    | createCardsAT
    | deleteCardsAT
    | renovationCardAT
    | setCardsPackAT
