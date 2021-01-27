const {
	AkairoClient,
	CommandHandler,
	ListenerHandler,
} = require('discord-akairo');
require('dotenv').config();
class MyClient extends AkairoClient {
	constructor() {
		super(
			{
				ownerID: '488699894023061516', // or ['123992700587343872', '86890631690977280']
			},
			{
				disableMentions: 'everyone',
				allowedMentions: true,
			},
		);
		this.commandHandler = new CommandHandler(this, {
			directory: './src/commands',
			prefix: 'p!', // or ['?', '!']
			allowMention: true,
			blockBots: true,
			blockClient: true,
		});
		this.listenerHandler = new ListenerHandler(this, {
			directory: './src/listeners/',
		});
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
		});
		this.commandHandler.loadAll();
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.loadAll();
	}
}

const client = new MyClient();
client.login();
