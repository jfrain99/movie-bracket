import express from "express"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser"
import betRouter from "./src/routes/bet/betRouter.js"
const app = express()
const PORT = 5004

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// Routers
app.use("/example", betRouter)

// ! Example Cron
// cron.schedule("0 3 * * WED", () => {
//   console.log("Deleting stats...")
//   try {
//     prisma.stat.deleteMany({}).catch((e) => console.error(e))
//   } catch (e) {
//     console.error(e)
//   }
// })
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}.`)
})
