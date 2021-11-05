const { Message } = require('discord.js');
const {
	Client,
	cleanUp,
	SetupEmbed,
	codeBlock,
	Embeds,
	Lang,
} = require('../../modules/Utils');
const { Eval } = Lang.DeveloperCommands;
const { inspect } = require('util');
const { createPaste } = require('hastebin');
const { Type } = require('@sapphire/type');
const { Stopwatch } = require('@sapphire/stopwatch');

module.exports = {
	name: 'eval',
	description: 'Evaluates any Javascript code.',
	usage: 'eval <code>',
	aliases: ['e', 'ev', 'evaluate'],
	minArgs: 1,
	devOnly: true,
	perms: ['SEND_MESSAGES'],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const time = new Stopwatch();
		const privs = [client.token, 'token'];
		const symbolRegex = /(_\.|\\|\?)/g;

		const evalRegex = new RegExp(
			`(${privs.reduce(
				(a, p = '') =>
					`${a}${a ? '|' : ''}${p.replace(
						symbolRegex,
						(capture) => '\\' + capture
					)}`,
				''
			)})`,
			'g'
		);

		try {
			const code = args.join(' ');

			let evaled = eval(code);
			if (typeof evaled !== 'string') evaled = inspect(evaled);

			const type = new Type(eval(code)).toString();
			const result = cleanUp(evaled).replace(evalRegex, 'HIDDEN VALUE');

			let url;
			if (result.length > 200) {
				url = await createPaste(result, {
					raw: true,
					contentType: 'text/bash',
					server: 'https://hastebin.com',
				});
			}

			message.channel.send({
				embeds: [
					SetupEmbed({
						author: Eval.SuccessEmbed.author,
						icon: message.author.displayAvatarURL(),
						fields: [
							{
								name: Eval.SuccessEmbed.fields[0],
								value: codeBlock(code, 'js'),
							},
							{
								name: Eval.SuccessEmbed.fields[1],
								value: result.length > 200 ? url : codeBlock(result, 'js'),
							},
						],
						footer: Eval.SuccessEmbed.footer.replace('(type)', type),
						color: Embeds.Colors.Success,
					}),
				],
				content: Eval.SuccessEmbed.time.replace(
					'(time)',
					time.stop().toString()
				),
			});
		} catch (err) {
			const input = args.join(' ');

			message.channel.send({
				embeds: [
					SetupEmbed({
						author: Eval.ErrEmbed.author,
						icon: message.author.displayAvatarURL(),
						fields: [
							{
								name: Eval.ErrEmbed.fields[0],
								value: codeBlock(input, 'js'),
							},
							{
								name: Eval.ErrEmbed.fields[1],
								value: codeBlock(cleanUp(err), 'js'),
							},
						],
						color: Embeds.Colors.Error,
					}),
				],
			});
		}
	},
};
