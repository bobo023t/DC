const util = require('util')

const HypixelAPI = require('./')

const client = new HypixelAPI('e7aba9ba-3a2e-498f-8cd7-2ece65457a19')

;(async function() {
	console.log(util.inspect(await client.getPlayer('name', 'ethanent'), {
		'depth': Infinity
	}))

	/*console.log(util.inspect(await client.findGuild('memberName', 'ethanent'), {
		'depth': Infinity
	}))

	console.log(util.inspect(await client.getGuild('52e572a684ae6e67043aa084'), {
		'depth': Infinity
	}))

	console.log(util.inspect(await client.getFriends('name', 'ethanent'), {
		'depth': Infinity
	}))

	console.log(util.inspect(await client.getBoosters(), {
		'depth': Infinity
	}))

	console.log(util.inspect(await client.getKey(), {
		'depth': Infinity
	}))

	console.log(util.inspect(await client.getLeaderboards(), {
		'depth': Infinity
	}))

	console.log(util.inspect(await client.getSession('name', 'ethanent'), {
		'depth': Infinity
	}))

	console.log(util.inspect(await client.getWatchdogStats(), {
		'depth': Infinity
	}))*/
})()