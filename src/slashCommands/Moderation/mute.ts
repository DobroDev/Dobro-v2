import { slashCommand } from '../../structures';
import { GuildMember, SnowflakeUtil } from 'discord.js';
import infractions from '../../lib/models/infractions';
import Guild from '../../lib/models/guild';
import { Duration } from '@sapphire/time-utilities';
import pms from 'pretty-ms';

export default new slashCommand({
	name: 'mute',
	description: 'Mutes a user.',
	permsneeded: ['MANAGE_MESSAGES'],
	Development: true,
	options: [
		{
			name: 'user',
			description: 'The user you want to mute.',
			type: 'USER',
			required: true,
		},
		{
			name: 'duration',
			description: 'The duration of the mute.',
			type: 'STRING',
			required: false,
		},
		{
			name: 'reason',
			description: 'The reason for muting this user.',
			type: 'STRING',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const { Embed } = client.utils;
		const member = interaction.options.getMember('user') as GuildMember;
		const duration = interaction.options.getString('duration');
		const reason =
			interaction.options.getString('reason') || 'No reason provided.';

		const { member: staffMember, guild } = interaction;

		const data = await Guild.findOne({ Id: guild.id });

		const muteRole = guild.roles.cache.get(data.muteRole);

		if (!muteRole) {
			interaction.reply({
				embeds: [
					client.utils.Embed({
						presets: 'ERROR',
						description:
							'There is currently no mute role set for this guild. You can configure it by running `/settings muterole_set`',
					}),
				],
				ephemeral: true,
			});

			return;
		}

		if (member.id === staffMember.id) {
			return interaction.reply({
				embeds: [
					Embed({ presets: 'ERROR', description: 'You cannot mute yourself!' }),
				],
				ephemeral: true,
			});
		}

		if (
			((await guild.fetchOwner()).id !== staffMember.id &&
				member.roles.highest.position > staffMember.roles.highest.position) ||
			member.roles.highest.position === staffMember.roles.highest.position
		) {
			return interaction.reply({
				embeds: [
					Embed({
						presets: 'ERROR',
						description: 'You cannot mute that user.',
					}),
				],
				ephemeral: true,
			});
		}

		const time = new Duration(duration).fromNow || null;
		const expires =
			!isNaN(time.getTime()) && time.getTime() > Date.now()
				? new Date(time)
				: null;

		if (member.roles.cache.has(muteRole.id)) {
			interaction.reply({
				embeds: [
					Embed({
						presets: 'ERROR',
						description: 'That user is already muted!',
					}),
				],
				ephemeral: true,
			});

			return;
		}

		const ID = SnowflakeUtil.generate().toString();

		try {
			await member.roles.add(
				muteRole,
				`Muted by: ${staffMember.user.tag}. Reason: ${reason}`
			);

			await new infractions({
				guildId: guild.id,
				infractionId: ID,
				userId: member.id,
				moderatorId: staffMember.id,
				type: 'mute',
				reason: reason,
				timestamp: new Date(),
				expires: expires,
				active: true,
			}).save();
		} catch (e) {
			interaction.reply({
				embeds: [
					Embed({
						presets: 'ERROR',
						description: 'I could not mute that user.',
					}),
				],
				ephemeral: true,
			});
			return;
		}

		interaction.reply({
			embeds: [
				Embed({
					description: `<@!${member.user.id}> was **muted**`,
					color: client.config.embedColors.success,
				}),
			],
		});

		member.user
			.send({
				embeds: [
					Embed({
						description: `You were muted in ${
							guild.name
						} | Reason: ${reason}\n\n__**Expires:**__ ${
							expires
								? `<t:${Math.round(expires.getTime() / 1000)}> (<t:${Math.round(
										expires.getTime() / 1000
								  )}:R>)`
								: `Never`
						}`,
						footer: `ID: ${ID}`,
						color: 'RED',
						timestamp: true,
					}),
				],
			})
			.catch((e) => {});
	},
});
