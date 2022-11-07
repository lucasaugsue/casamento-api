import moment from 'moment'
import { Users } from '../models/Users'
import { raw } from 'objection'
import Authenticate from '../../middlewares/Authenticate'
import md5 from 'md5'
import { Resources as ResourcesModel } from '../models/Resources'
import { ResourcesProfiles as ResourcesProfilesModel } from '../models/ResourcesProfiles'
import AuthService from '../../services/AuthService'

export const renderUserAuth = user => ({
    ...user,
    oauth: Authenticate({
        id: user.id, 
        username: user.username, 
        cpf: user.cpf,
        jwt_datetime: moment().format(),
    }),
})

export const Auth = (router) => {

    router.post('/login', async (ctx, next) => {
        let params = {...ctx.data}
        const user = await AuthService.login(ctx, params)
        ctx.status = 200
        ctx.body = renderUserAuth(user)
    })
    
    router.get('/resources', async (ctx, next) => {
        const resourcesObject = await ResourcesModel.query()
        const resourceProfiles = await ResourcesProfilesModel.query().where("profile_id", {...ctx.companyProfile}.profile_id || 10000000)
        let resources = {}

        for(let r of resourcesObject){
            const allow = !!resourceProfiles.find(rp => rp.resource_id === r.id)
            if(allow) resources[`${r.key}`] = { ...r }
        }
        
        ctx.body = resources
    })
}
