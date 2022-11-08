
module.exports = async (ctx, next) => {
        try {
                console.log("entrou aqui")
                if(ctx.userInfo) {
                        await next()
                } else {
                        ctx.status = 401
                }
        } catch (error) { ctx.body = { error: error.message } }
}
