// ! EXAMPLE MUTATION HOOK

// import { useMutation } from "react-query"

// import BetService from "../api/Services/betService"
// import { Stat } from "../types/Bet"

// interface CreateBetBody {
//     playerId: number
//     teamId: number
//     stat: Stat
//     amount: string
//     risk: string
//     win: string
//     overUnder: string
//     code: string
// }
// const createBet = async (data: CreateBetBody) => {
//     const res = await BetService.post("/", data)
//     return res
// }
// const useCreateBet = () => {
//     return useMutation(["search-players"], (data: CreateBetBody) => createBet(data))
// }

// export default useCreateBet
