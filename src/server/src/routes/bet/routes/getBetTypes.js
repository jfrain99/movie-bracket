import errorHandler from "../../../utils/errorHandler.js"
import { prisma } from "../../../../prismaConnection.js"

const getBetTypes = async (req, res) => {
  try {
    const betTypes = await prisma.betTypes.findMany({
      select: {
        id: true,
        name: true,
        category: true,
      },
    })
    return res.json({
      message: "Successfully got bet types",
      data: betTypes,
    })
  } catch (err) {
    return errorHandler(res, err, "Error fetching chat counts")
  }
}

export default getBetTypes
