const { Client, Util } = require('discord.js');
const youTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const GOOGLE_API_KEY = process.env.API;
const client = new Client({ disableEveryone: true });
const youtube = new youTube(GOOGLE_API_KEY);

module.exports = class play {
    constructor(){
            this.name = 'play',
            this.alias = ['p'],
            this.usage = '!play'
    }
async run(bot, message, args, ops) {
const searchString = args.slice(1).join(' ');
const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
const serverQueue = ops.active.get(message.guild.id) || {};
const stream = ytdl(url, { filter: 'audioonly' });
const voiceChannel = message.member.voiceChannel;
if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
const permissions = voiceChannel.permissionsFor(message.client.user);
if (!permissions.has('CONNECT')) {
  return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
}
if (!permissions.has('SPEAK')) {
  return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
}

if (url.match( /^.*(youtu.be\/|list=)([^#\&\?]*).*/)) {
  const playlist = await youtube.getPlaylist(url);
  const videos = await playlist.getVideos();
  var video = await youtube.getVideo(url);
  handleVideo(video, message, voiceChannel);
  for (const video of Object.values(videos)) {
    const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
    await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
  }
  return message.channel.send(`Playlist: **${playlist.title}** has been added to the queue!`);
} else {
  try {
    var video = await youtube.getVideo(url);
  } catch (error) {
    try {
      var videos = await youtube.searchVideos(searchString, 10);
      let index = 0;
      message.channel.send(`
__**Song selection:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

Please provide a value to select one of the search results ranging from 1-10.
      `);
      // eslint-disable-next-line max-depth
      try {
        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
          maxMatches: 1,
          time: 10000,
          errors: ['time']
        });
      } catch (err) {
        console.error(err);
        return message.channel.send('No or invalid value entered, cancelling video selection.');
      }
      const videoIndex = parseInt(response.first().content);
      var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
    } catch (err) {
      console.error(err);
      return message.channel.send('😭 I could not obtain any search results.');
    }
  }
  return handleVideo(video, message, voiceChannel);
}
async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = ops.active.get(message.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`,
    requester: message.author.username,
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		ops.active.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			ops.active.delete(message.guild.id);
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return message.channel.send(`🎶**${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = ops.active.get(guild.id);

	if (!song) {
      serverQueue.voiceChannel.leave();
  		ops.active.delete(guild.id);
  		return;
    }
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(stream)
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶Start playing: **${song.title}**`);
}
}
}
