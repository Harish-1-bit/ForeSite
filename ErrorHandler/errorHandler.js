const errorhandler = async (err,req,res,next) => {
    const statusCode = res.statusCode <= 200 ? 500:res.statusCode
    console.log(err)
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV==='development'?err.stack:"null"
    })
}

export default errorhandler