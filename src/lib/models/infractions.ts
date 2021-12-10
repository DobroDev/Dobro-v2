import { Schema, model, Document } from 'mongoose';
import { rString, rDate } from '../../structures/';

export interface Infraction extends Document {
	guildId: string;
	infractionId: string;
	userId: string;
	moderatorId: string;
	type: 'ban' | 'mute' | 'warn' | 'unmute';
	reason: string;
	timestamp: Date;
	expires: Date;
	active: boolean;
}

const punishType = {
	type: String,
	required: true,
	enum: ['ban', 'mute', 'warn', 'unmute'],
};

const infractionSchema = new Schema({
	guildId: rString,
	infractionId: rString,
	userId: rString,
	moderatorId: rString,
	type: punishType,
	reason: rString,
	timestamp: rDate,
	expires: Date,
	active: Boolean,
});

export default model<Infraction>('Infractions', infractionSchema);
