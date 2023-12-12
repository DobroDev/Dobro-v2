import { Document, Schema, model } from 'mongoose';
import { rDate, rString } from '../structures/DBTypes';

export interface RemindDoc extends Document {
	Id: string;
	guildId: string;
	channelId: string;
	userId: string;
	reason?: string;
	time: string;
	expires: Date;
}

const Reminder = new Schema<RemindDoc>({
	Id: rString,
	guildId: rString,
	channelId: rString,
	userId: rString,
	reason: String,
	time: rString,
	expires: rDate,
});

export default model<RemindDoc>('Reminder', Reminder);
