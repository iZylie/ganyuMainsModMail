const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class ReplyCommand extends Command {
	constructor() {
		super('reply', {
			aliases: ['reply'],
			ownerOnly: false,
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: (message) => {
							const whoEmbed = new Discord.MessageEmbed()
								.setColor(29128)
								.setDescription('Who do you want to reply?');
							message.channel.send(whoEmbed);
						},
						retry: (message) => {
							const noUserEmbed = new Discord.MessageEmbed()
								.setDescription(
									"I couldn't find that user, please try again. (Do not run the command again.)",
								)
								.setColor(29128);
							message.channel.send(noUserEmbed);
						},
					},
				},
				{
					id: 'message',
					type: 'string',
					prompt: {
						start: (message) => {
							const replyEmbed = new Discord.MessageEmbed()
								.setColor(29128)
								.setDescription('What do you want to say to them?');
							message.channel.send(replyEmbed);
						},
					},
				},
			],
		});
	}

	async exec(message, args) {
		const noPermsEmbed = new Discord.MessageEmbed()
			.setColor(29128)
			.setDescription(`Check your permissions.`);
		if (!message.member.hasPermission('KICK_MEMBERS'))
			return message.channel.send(noPermsEmbed);
		const messageSentEmbed = new Discord.MessageEmbed()
			.setColor(29128)
			.setDescription(`Your reply is sent to ${args.member}`);
		const replyEmbed = new Discord.MessageEmbed()
			.setColor(29128)
			.setTitle(`Your feedback/suggestion has been read and being replied!`)
			.setDescription(`**${message.author.tag}** replies with: ${args.message}`)
			.setTimestamp();
		await args.member.send(replyEmbed);
		message.channel.send(messageSentEmbed);
	}
}

module.exports = ReplyCommand;
