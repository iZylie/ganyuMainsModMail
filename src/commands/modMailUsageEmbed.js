const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class ModMailUsageEmbed extends Command {
	constructor() {
		super('modmailusage', {
			aliases: ['mmusage', 'mmu'],
			category: 'OwnerOnly',
			ownerOnly: true,
			description: {
				description: 'Sends embed about how to use w!modmail.',
				usage: '`p!mmu`',
			},
		});
	}

	exec(message) {
		const ModMailUsageEmbed = new Discord.MessageEmbed()
			.setTitle('How to use ModMail function?')
			.setDescription(
				'You can simply do `w!modmail <message>` to submit your suggestions/feedback, but there are rules!',
			)
			.addFields(
				{ name: 'Rule 1:', value: 'Do not send meme messages.' },
				{ name: 'Rule 2:', value: 'Do not send NSFW messages.' },
				{
					name: 'Rule 3:',
					value:
						'Do not use the command to contact staff for personal issues/reporting a member.',
				},
			)
			.setColor(29128)
			.setFooter(
				'Follow the rules, any actions stated in the rules are prohibited.',
			);
		message.channel.send(ModMailUsageEmbed);
	}
}

module.exports = ModMailUsageEmbed;
