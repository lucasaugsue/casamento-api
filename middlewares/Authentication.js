
module.exports = async (ctx, next) => {
        const User = require("../lib/models/Users").Users
        try {
                if(ctx.request.header.authorization && ctx.request.header.authorization.startsWith('Bearer')) {
                        let token = ctx.request.header.authorization
                        let url = ctx.request.url
                        let breakup = token.split('.')
                        let userDetails = Buffer.from(breakup[1], 'base64').toString()
                        let user = JSON.parse(userDetails)

                        let userInfo = user.id && await User.query().eager("companyProfiles").findById(user.id)
                        
                        if(userInfo) {
                                ctx.userInfo = userInfo
                                ctx.companyProfile = userInfo.companyProfiles.find(cp => cp.id === parseInt(ctx.request.header["companyprofileid"]))
                        }
                }
        } catch (error) {  }

        await next()
}