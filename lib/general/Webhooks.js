import CasamentoService from "../../services/CasamentoService"
import { SendEmail } from "../../utils/Mailer"

export const Webhooks = (router) => {

    router.post('/teste', async (ctx, next) => {
        try{
            ctx.body = CasamentoService.teste()
            ctx.status = 201
        }catch(err){
            ctx.status = 400
            return err.message
        }
    })

    router.post('/send-email', async (ctx, next) => {
        try{
            const {to, title, text} = ctx.data
            const res = await SendEmail(to, title, text)
            if(!res.ok) throw new Error("Não foi possível enviar o email!")

            ctx.body = res
            ctx.status = 201
        }catch(err){
            ctx.status = 400
            return err.message
        }
    })
}