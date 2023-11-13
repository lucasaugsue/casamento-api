import koa from 'koa';
import moment from 'moment';
import Router from 'koa-router';
import body from 'koa-body';
import http from 'http';
import Knex from 'knex';
import ActionLogMiddleware from './middlewares/ActionLog';
import { DefaultJobs } from './jobs/DefaultJobs';
import { DefaultEvents } from './events/DefaultEvents';
import { Model } from "objection";

const koaServer = new koa();

require('dotenv').config()

const server = http.createServer(koaServer.callback())
server.setTimeout(0);

const io = require('socket.io')(server, { serveClient: false })

const knex = Knex(require('./knexfile'))
Model.knex(knex)

server.listen(process.env.PORT || 8111)
console.log('Server running in http://localhost:' + (process.env.PORT || 8111))

koaServer.use(body())
koaServer.use(async (ctx, next) => {
	const lang = ctx.request.header['language'] || ""
	ctx.started_at = moment()

	ctx.logs = {
		send_mail_error: false,
		save_db: true,
	}
    if(ctx.method === "GET") ctx.data = {...require('url').parse(ctx.request.url, true).query, ...ctx.params};
    else ctx.data = {...ctx.request.body};

    console.log(ctx.method, ctx.url)

	ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin || '*')
	ctx.set('Access-Control-Allow-Headers', ctx.request.header['access-control-request-headers'] || '*')
	ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')
	ctx.set('Access-Control-Allow-Credentials', 'true')
	ctx.set('Allow', 'POST, GET, OPTIONS, PUT, PATCH, DELETE')
	ctx.set('Server', 'ApiServer')
	if (ctx.method === 'OPTIONS') {
		ctx.body = ''
		return
	}
	await next();
})

io.on('connection', (socket) => {
	DefaultEvents(socket)
})

DefaultJobs({io})

koaServer.use(ActionLogMiddleware)

const checkRouter = new Router({ prefix: '/check' })
import { Check } from './lib/general/Check'
Check(checkRouter)
koaServer.use(checkRouter.routes())

const presentesRouter = new Router({ prefix: '/presentes' })
import { Presentes } from './lib/general/Presentes'
Presentes(presentesRouter)
koaServer.use(presentesRouter.routes())
