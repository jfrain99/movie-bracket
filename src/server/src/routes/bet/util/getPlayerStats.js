import axios from "axios"
import errorHandler from "../../../utils/errorHandler.js"
import { prisma } from "../../../../prismaConnection.js"

const getPlayerStats = async (req, res, bets) => {
  try {
    const betsWithStats = await Promise.all(
      bets.map(async (bet) => {
        const stat = await prisma.stat.findFirst({
          where: {
            betId: bet.id,
          },
        })
        if (stat) {
          return { ...bet, stat: stat.amount }
        }
        const options = {
          method: "GET",
          url: "https://api-american-football.p.rapidapi.com/players/statistics",
          params: {
            id: bet.Player.apiId,
            team: bet.Team.apiId,
            season: "2023",
          },
          headers: {
            "X-RapidAPI-Key":
              "46f0fdf551msh9094c4f085a134ep184946jsn689833af3b3e",
            "X-RapidAPI-Host": "api-american-football.p.rapidapi.com",
          },
        }
        console.log("Making stat call...")
        const stats = await axios
          .request(options)
          .then((res) => res.data.response)
          .catch((e) => {
            return errorHandler(res, e, "Error pulling player stats")
          })

        const currValue = stats?.[0]?.teams?.[0]?.groups
          ?.find((group) => {
            return (
              group.name.toLocaleUpperCase() ===
              bet.BetType.category.toLocaleUpperCase()
            )
          })
          ?.statistics?.find(
            (stat) => stat.name === bet.BetType.name.toLowerCase()
          )?.value

        if (currValue) {
          await prisma.stat.create({
            data: {
              betId: bet.id,
              amount: currValue,
            },
          })
        }
        return { ...bet, stat: currValue }
      })
    )
    return betsWithStats
  } catch (err) {
    return errorHandler(res, err, "Error fetching chat counts")
  }
}

export default getPlayerStats
