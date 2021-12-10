import { Schema, model, Document } from 'mongoose';
import { rString, rDate } from '../../structures/';

export interface Infraction extends Document {
	guildId: string;
	infractionId: string;
	userId: string;
	moderatorId: string;
	type: 'ban' | 'mute' | 'warn';
	reason: string;
	timestamp: Date;
	expires: Date;
}

const punishType = {
	type: String,
	required: true,
	enum: ['ban', 'mute', 'warn'],
};

const infractionSchema = new Schema(
	{
		guildId: rString,
		infractionId: rString,
		userId: rString,
		moderatorId: rString,
		type: punishType,
		reason: rString,
		timestamp: rDate,
		expires: Date,
	},
	{ timestamps: true }
);

export default model<Infraction>('Infractions', infractionSchema);
