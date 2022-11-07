import { Model } from "objection"
import moment from "moment"

export class ActionLog extends Model {
    static tableName = "action_logs";
}

export function log(ctx, next){
    return new Promise(async (resolve, reject) => {
        try{
            let clearData = {}
            for(let key in ctx.data){
                let security = (
                    key.indexOf("password") > -1
                )
                clearData[key] = security ? '[security]' : ctx.data[key]
            }
            console.log(`duration`, moment().diff(moment(ctx.started_at), "miliseconds") + "ms")
            let data = {
                error: ctx.body ? ctx.body.error : null,
                user_id: ctx.userInfo && ctx.userInfo.id,
                data: JSON.stringify(clearData),
                datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
                method: ctx.method,
                url: ctx.url,
                action: 'request-api',
            }

            let res = await Promise.all([
                // Salva o log no banco de dados
                {
                    key: 'db',
                    func: () => {
                        return new Promise(async (resolve, reject) => {
                            if(ctx.logs.save_db){
                                try{
                                    let log = await ActionLog.query().insertAndFetch(data)
                                    resolve(log)
                                }catch(err){
                                    resolve({error: err.message})
                                }
                            }else{
                                resolve(null)
                            }
                        })
                    },
                },
                // Envia email para responsáveis monitorarem o log
                {
                    key: 'mail',
                    func: () => {
                        return new Promise((resolve, reject) => { 
                            if(ctx.error && ctx.logs.send_mail_error){
                                try{
                                    // TODO enviar email

                                    
                                    resolve("Não implementado")
                                }catch(err){
                                    resolve({error: err.message})
                                }
                            }else{
                                resolve(null)   
                            }
                        })
                    }
                }
            ].map(async item => { return {key: item.key, res: await item.func()} }))
        
            // console.log(res)
            resolve(res)
        }catch(err){
            resolve({error: err.message})
        }
    })
}