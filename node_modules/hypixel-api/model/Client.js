const path = require('path')
const c = require('centra')

const getUUIDFromTarget = require(path.join(__dirname, '..', 'utility', 'uuidTarget.js'))

const baseURL = 'https://api.hypixel.net/'

/**
* Main Client class. API keys are used to create client instances.
*/
class Client {
	/**
	* Create a new API client.
	* @param {string} key - A valid Hypixel API key
	*/
	constructor (key) {
		this.key = key
	}

	/**
	* Get a player's data.
	* @param {string} [targetType=uuid] - Target type. 'name' or 'uuid'
	* @param {string} identifier - Identifier for the target. (Either a name or UUID, based on targetType.)
	*/
	async getPlayer(p1, p2) {
		let targetUUID = await getUUIDFromTarget(p1, p2)

		const res = await c(baseURL).path('/player').query({
			'uuid': targetUUID,
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get a session's data.
	* @param {string} [targetType=uuid] - Target type. 'name' or 'uuid'
	* @param {string} identifier - Identifier for the target. (Either a name or UUID, based on targetType.)
	*/
	async getSession(p1, p2) {
		let targetUUID = await getUUIDFromTarget(p1, p2)

		const res = await c(baseURL).path('/session').query({
			'uuid': targetUUID,
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get a player's friends.
	* @param {string} [targetType=uuid] - Target type. 'name' or 'uuid'
	* @param {string} identifier - Identifier for the target. (Either a name or UUID, based on targetType.)
	*/
	async getFriends(p1, p2) {
		let targetUUID = await getUUIDFromTarget(p1, p2)

		const res = await c(baseURL).path('/friends').query({
			'uuid': targetUUID,
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get a guild's data.
	* @param {string} guildID - ID of the guild. (Guilds can be searched with the Client.findGuild method.)
	*/
	async getGuild(guildID) {
		const res = await c(baseURL).path('/guild').query({
			'id': guildID,
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get a guild's ID.
	* @param {string} [targetType=name] - Target type. 'name' for guild name, 'member' for a member's UUID, or 'memberName' for a member's name
	* @param {string} identifier - Identifier for the target. (Either a name or player UUID, based on targetType.)
	*/
	async findGuild(targetType, identifier) {
		let targetIdentifier

		if (targetType === 'memberName') {
			targetIdentifier = await getUUIDFromTarget('name', identifier)
		}
		else {
			targetIdentifier = identifier
		}

		const query = {
			'key': this.key
		}

		if (targetType === 'name') {
			query['byName'] = targetIdentifier
		}
		else query['byUuid'] = targetIdentifier

		const res = await c(baseURL).path('/findGuild').query(query).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get Watchdog statistics.
	*/
	async getWatchdogStats() {
		const res = await c(baseURL).path('/watchdogstats').query({
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get leaderboards.
	*/
	async getLeaderboards() {
		const res = await c(baseURL).path('/leaderboards').query({
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get API key information.
	*/
	async getKey() {
		const res = await c(baseURL).path('/key').query({
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get network game boosters.
	*/
	async getBoosters() {
		const res = await c(baseURL).path('/boosters').query({
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}
}

module.exports = Client
