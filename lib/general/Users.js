import moment from 'moment'
import {Users as UsersModel} from '../models/Users'
import {Profiles as ProfilesModel} from '../models/Profiles'
import { raw } from 'objection'

export const Users = (router) => {
    
    router.get('/list', async (ctx, next) => {
        ctx.body = await UsersModel.query()
            .withGraphFetched("[address]")
            .joinEager("companyProfiles")
            .where("companyProfiles.company_id", ctx.companyProfile.company_id)
    })
    
    router.get('/profiles/list', async (ctx, next) => {
        ctx.body = await ProfilesModel.query()
    })

    router.post('/save', async (ctx, next) => {
        const {username, profile_id} = {...ctx.data}
        if(!username) throw new Error("Informe o nome de usuário, por favor");
        if(!profile_id) throw new Error("Selecione um perfil de acesso");

        let user = await UsersModel.query().findOne(raw("LOWER(username)"), username.toLowerCase())
    
        await UsersModel.query().updateAndFetchById(user.id, {profile_id, company_id: ctx.companyProfile.company_id})

        ctx.status = 201
    })

}