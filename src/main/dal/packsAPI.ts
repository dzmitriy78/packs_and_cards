import {AxiosResponse} from "axios"
import {instance} from "./authAPI";

const getCardsParams = {
    cardAnswer: "",
    cardQuestion: "",
    cardsPack_id: "630b326c08095407487d7a75",
    min: 0,
    max: 100,
    sortCards: "0grade",
    page: 1,
    pageCount: 7
}


export const packsAPI = {
    getPacks(params: GetPacksParamsType) {
        return instance.get<GetPacksResponseType>('cards/pack', {
            params
        })
    },
    createPacks(data: CreatePacksParamsType) {
        return instance.post<CreatePacksParamsType, AxiosResponse<CreatePacksResponseType>>('cards/pack', data)
    },
    deletePack(id: string) {
        return instance.delete<AxiosResponse<DeletePackResponseType>>(`cards/pack?${id}`)
    },
    updatePack(data: UpdatePacksParamsType) {
        return instance.put<AxiosResponse<UpdatePackResponseType>>(`cards/pack`, data)
    }
}

export const cardsAPI = {
    getCards() {
        return instance.get<AxiosResponse<GetCardsResponseType>>("cards/card", {
            params: getCardsParams
        })
    },
    createCard(data: CreateCardsType) {
        return instance.post<AxiosResponse<CreateCardResponseType>>('cards/card', data)
    },
    deleteCard(id: string) {
        return instance.delete<AxiosResponse<DeleteCardResponseType>>(`cards/card?${id}`)
    },
    updateCard(data: UpdateCardParamsType) {
        return instance.put<AxiosResponse<UpdateCardsResponseType>>("cards/card", data)
    }
}

export type CardPacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string,
    more_id: string
    __v: number
}

export type GetPacksParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}
export type GetPacksResponseType = {
    cardPacks: [CardPacksType]
}
export type CreatePacksResponseType = {
    newCardsPack: CardPacksType
    token: string
    tokenDeathTime: number
}
export type CreatePacksParamsType = {
    cardsPack: {
        name: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}
type DeletePackResponseType = {
    deletedCardsPack: CardPacksType
    token: string
    tokenDeathTime: number
}
type UpdatePacksParamsType = {
    cardsPack: {
        _id: string
        name: string
    }
}
type UpdatePackResponseType = {
    updatedCardsPack: CardPacksType,
    token: string
    tokenDeathTime: number
}

type CardsType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    questionImg: string
    answerImg: string
    answerVideo: string
    questionVideo: string
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
}
type GetCardsResponseType = {
    cards: [CardsType]
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}
type CreateCardsType = {
    card: {
        cardsPack_id: string
        question: string
        answer: string
        grade: number
        shots: number
        rating: number
        answerImg: string
        questionImg: string
        questionVideo: string
        answerVideo: string
        type: string
    }
}
type CreateCardResponseType = {
    newCard: CardsType
    token: string
    tokenDeathTime: number
}
type DeleteCardResponseType = {
    deletedCard: CardsType
    token: string
    tokenDeathTime: number
}
type UpdateCardParamsType = {
    card: {
        _id: string
        question: string
        comments: string
    }
}
type UpdateCardsResponseType = {
    updatedCard: CardsType
    token: string
    tokenDeathTime: number
}