import { slashCommand } from '../../structures';

export default new slashCommand({
	name: 'avatar',
	description: "Displays a member's avatar.",
	permsneeded: ['SEND_MESSAGES'],
	Development: true,
	options: [
		{
			name: 'avatar-type',
			description: 'Choose which avatar you would like to view.',
			type: 'NUMBER',
			required: true,
			choices: [
				{
					name: 'user-avatar',
					value: 1,
				},
				{
					name: 'server-avatar',
					value: 2,
				},
			],
		},
		{
			name: 'member',
			description: "The member who's avatar you want to view.",
			type: 'USER',
			required: false,
		},
	],
	run: async ({ client, interaction }) => {
		const { getMember, Embed } = client.utils;

		const member = await getMember(interaction, 'INTERACTION', 'member');
		const optionVal = interaction.options.getNumber('avatar-type');

		let avatar: string;

		if (optionVal === 1) {
			avatar = member.user.displayAvatarURL({ size: 1024 });
		} else if (optionVal === 2) {
			avatar = member.displayAvatarURL({ size: 1024 });
		}

		interaction.reply({
			embeds: [
				Embed({
					author: member.user.tag,
					icon: member.user.displayAvatarURL(),
					image: avatar,
				}),
			],
		});
	},
});
