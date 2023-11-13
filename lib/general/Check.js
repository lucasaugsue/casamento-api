export const Check = (router) => {
    router.get('/ping', async (ctx, next) => {
        ctx.status = 200
        ctx.body = "pong"
    })
}