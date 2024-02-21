const errorHandler = (res, err, defaultMessage = "Internal Server Error") => {
    console.error(err)
    let statusCode = 500
    let errorMessage = defaultMessage
    if (err.status && err.message) {
      statusCode = err.status
      errorMessage = err.message
    }
  
    if (!res.headersSent) {
      return res
        .status(statusCode)
        .json({ message: "error", error: errorMessage })
    }
  }
  
  export default errorHandler
  