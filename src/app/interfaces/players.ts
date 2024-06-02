import { Predictions } from "./predictions"

export interface Players {
    id: number
    name: string
    score: number
    predictions?: Predictions[]
}

