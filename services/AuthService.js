import md5 from 'md5'
import { raw } from 'objection'
import { Users as UsersModel } from "../lib/models/Users"

class AuthService{

    static login(ctx, params){
        return new Promise(async (resolve, reject) => {
            try{
                if(!params.username) throw new Error(ctx.strings.noMail)
                if(!params.password) throw new Error(ctx.strings.noPassword)

                let user = await UsersModel.query()
                    .withGraphFetched("[address, companyProfiles]")
                    .where(build => {
                        build
                        .where(raw("LOWER(username)"), params.username.toLowerCase())
                        .orWhere("cpf", params.username.replace(/ |\.|\-|\_/g, ""))
                    })
                    .findOne("password", md5(params.password))

                if(!user) throw new Error(ctx.strings.loginFailed)
                if(!user.companyProfiles[0]) throw new Error(ctx.strings.userWithoutProfile)

                resolve(user)
            }catch(err){
                reject(err)
            }
        })
    }

}

export default AuthService