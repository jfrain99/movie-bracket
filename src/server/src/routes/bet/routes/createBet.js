import errorHandler from "../../../utils/errorHandler.js"
import { prisma } from "../../../../prismaConnection.js"

const createBet = async (req, res) => {
  try {
    const { stat: _stat, code, ...rest } = req.body
    let codeId = await prisma.code.findFirst({
      where: {
        name: code,
      },
      select: {
        id: true,
      },
    })
    if (!codeId?.id) {
      codeId = await prisma.code.create({
        data: {
          name: code,
        },
      })
    }
    const bet = await prisma.bet.create({
      data: {
        typeId: req.body.stat.id,
        codeId: codeId.id,
        ...rest,
      },
    })
    return res.json({
      message: "Successfully created bet",
      data: bet,
    })
  } catch (err) {
    return errorHandler(res, err, "Error fetching chat counts")
  }
}

export default createBet
