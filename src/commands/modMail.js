const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class ModMailCommand extends Command {
	constructor() {
		super('modmail', {
			aliases: ['modmail', 'mm'],
			category: 'Help',
			ownerOnly: false,
			channel: 'guild',
			args: [
				{
					id: 'message',
					type: 'string',
					match: 'content',
				},
			],
			description: {
				description:
					'Sending given message to staffs for investigation, it can be either suggestions/feedback on the bot or on the server.',
				usage: '`p!modmail <message>`',
			},
		});
	}

	exec(message, args) {
		const modMailUsageChannel = this.client.channels.cache.get(
			'803972651831394304',
		);
		const modMailChannel = this.client.channels.cache.get('803972969796730910');
		/* EMBEDS */
		const noMessageEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag)
			.setColor(29128)
			.setDescription('You must provide a message.');
		const wrongChannelEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag)
			.setColor(29128)
			.setDescription(`You must use the command in: ${modMailUsageChannel}`);
		const modMailMessageEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag + ' Says:')
			.setColor(29128)
			.setDescription(args.message)
			.setThumbnail(message.author.displayAvatarURL())
			.setFooter(`Their ID: ${message.author.id}`);
		const modMailMessageSentEmbed = new Discord.MessageEmbed()
			.setAuthor(
				`Thank you for your feedback on the server, ${message.author.tag}!\nStaff team will look into it in no time!`,
			)
			.setColor(29128);
		if (message.channel.id != modMailUsageChannel)
			return message.channel.send(wrongChannelEmbed);

		if (!args.message) return message.channel.send(noMessageEmbed);
		message.delete();
		modMailChannel.send(modMailMessageEmbed);
		message.channel.send(modMailMessageSentEmbed).then((msg) => {
			msg.delete({ timeout: 10000 });
		});
	}
}

module.exports = ModMailCommand;
