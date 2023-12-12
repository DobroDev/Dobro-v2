import { Snowflake } from 'discord.js';
import { UpdateQuery } from 'mongoose';
import Guild, { GuildDoc } from '../models/Guild';

export default class DbUtils {
	async getGuild(id: Snowflake) {
		let data = await Guild.findOne({ Id: id });

		if (data) {
			return data;
		} else {
			data = new Guild({
				Id: id,
			});

			return data;
		}
	}

	async updateGuild(id: Snowflake, key: UpdateQuery<GuildDoc>) {
		await Guild.updateOne({ Id: id }, key).catch((err: any) => {
			throw new Error(err);
		});
	}
}
