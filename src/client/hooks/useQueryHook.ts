// ! EXAMPLE QUERY HOOK

// import { useQuery } from "react-query"
// import BetService from "../api/Services/betService"

// const getBets = async ({code}: {code: string}) => {
//     return await BetService.get(`/?code=${code}`).then((res) => res.data.data)
// }

// const useGetBets = ({code, enabled}: {code: string, enabled: boolean}) => {
//     return useQuery(["get-bets", code], () => getBets({code}), { refetchOnWindowFocus: false, enabled})
// }

// export default useGetBets
