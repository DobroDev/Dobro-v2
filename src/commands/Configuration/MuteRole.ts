import { Command } from '../../lib/structures/Command';
import Guild from '../../lib/models/Guild';

export default new Command({
	name: 'muterole',
	description: 'Configures the muterole for this guild.',
	aliases: ['mr', 'muter'],
	usage: 'muterole <set|remove|view> [role]',
	minArgs: 1,
	examples: ['muterole set @role', 'muterole remove', 'muterole view'],
	userPerms: ['MANAGE_GUILD'],
	run: async ({ client, message, args }) => {
		const { guild: g } = message;
		const chosenAction = args[0];
		const allowedActions = ['set', 'remove', 'view'];
		if (!allowedActions.includes(chosenAction)) {
			message.channel.send({
				embeds: [
					client.embeds.globalErr(
						`Please choose a valid action. You can choose from ${allowedActions
							.map((a) => `\`${a}\``)
							.join(', ')}.`
					),
				],
			});
			return;
		}

		switch (chosenAction) {
			case 'set': {
				const chosenRole =
					message.mentions.roles.first() ||
					g.roles.cache.find((r) => r.id === args[1]);

				if (!chosenRole) {
					message.channel.send({
						embeds: [
							client.embeds.globalErr(
								'Please mention a role or provide a valid role ID to be set.'
							),
						],
					});
					return;
				}

				await client.db
					.updateGuild(g.id, {
						$set: {
							muteRole: chosenRole.id,
						},
					})
					.catch((err: any) => {
						console.log(err);
						message.channel.send({
							embeds: [
								client.embeds.globalErr(
									'Encountered an internal error with the database... Please contact a developer!'
								),
							],
						});
					});

				message.channel.send({
					embeds: [
						client.embeds.globalSuccess(
							`Mute role has been set to ${chosenRole}`
						),
					],
				});

				break;
			}

			case 'remove': {
				await client.db
					.updateGuild(g.id, {
						$unset: {
							muteRole: '',
						},
					})
					.catch((err: any) => {
						client.logger.error(err);
						message.channel.send({
							embeds: [
								client.embeds.globalErr(
									'Encountered an internal error with the database... Please contact a developer!'
								),
							],
						});
					});

				message.channel.send({
					embeds: [
						client.embeds.globalSuccess(
							'Successfully removed the mute role for this guild.'
						),
					],
				});

				break;
			}

			case 'view': {
				const guild = await client.db.getGuild(g.id);

				const muteRole = g.roles.cache.find((r) => r.id === guild.muteRole);

				if (!muteRole) {
					message.channel.send({
						embeds: [
							client.embeds.globalErr(
								'There is currently no mute role set for this guild.'
							),
						],
					});
					return;
				}

				message.channel.send({
					embeds: [
						client.embeds.create({
							description: `The current muterole set for this guild is <@&${muteRole.id}>.`,
						}),
					],
				});

				break;
			}
		}
	},
});
