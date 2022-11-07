import { log } from '../lib/models/ActionLog'

module.exports = async (ctx, next) => {
	try {
		await next()
	} catch (error) { ctx.body = { error: error.message } }
	log(ctx)
}