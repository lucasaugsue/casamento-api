import PresentesService from '../../services/PresentesService'

export const Presentes = (router) => {
    
    router.get('/list', async (ctx, next) => {
        try{
            ctx.status = 200
            ctx.body = await PresentesService.getAll()

        }catch(err){
            ctx.status = 400
            ctx.body = { erro: err.message }
        }
    })

    router.get('/by/:id', async (ctx, next) => {
        try{
            const id = parseInt(ctx.params.id) 
            ctx.status = 200
            ctx.body = await PresentesService.getAllById(id)

        }catch(err){
            ctx.status = 400
            ctx.body = { erro: err.message }
        }
    })
    
    router.post('/create', async (ctx, next) => {
        try{
            const params = ctx.data
            ctx.status = 201
            ctx.body = await PresentesService.create({params})

        }catch(err){
            ctx.status = 400
            ctx.body = { erro: err.message }
        }
    })

    router.patch('/edit/:id', async (ctx, next) => {
        try{
            const params = ctx.data
            const id = parseInt(ctx.params.id) 
            ctx.status = 201
            ctx.body = await PresentesService.edit({id, params})

        }catch(err){
            ctx.status = 400
            ctx.body = { erro: err.message }
        }
    })

    router.delete('/delete/:id', async (ctx, next) => {
        try{
            const id = parseInt(ctx.params.id) 
            ctx.status = 201
            ctx.body = await PresentesService.delete({id})

        }catch(err){
            ctx.status = 400
            ctx.body = { erro: err.message }
        }
    })
}