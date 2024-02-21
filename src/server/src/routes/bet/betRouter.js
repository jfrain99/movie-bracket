import express from "express"
import createBet from "./routes/createBet.js"
import getBets from "./routes/getBets.js"
import getBetTypes from "./routes/getBetTypes.js"

const betRouter = express.Router({ mergeParams: true })

// GET
betRouter.get("/", getBets)

betRouter.get("/types", getBetTypes)

// POST
betRouter.post("/", createBet)
export default betRouter
