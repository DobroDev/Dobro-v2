import { Schema, model, Document } from 'mongoose';
import { rString, rDate, rBoolean } from '../../structures/';

export interface Infraction extends Document {
	guildId: string;
	infractionId: string;
	userId: string;
	moderatorId: string;
	type: 'ban' | 'mute' | 'warn';
	reason: string;
	timestamp: Date;
	expires: Date;
	active: boolean;
}

const punishType = {
	type: String,
	required: true,
	enum: ['ban', 'mute', 'warn'],
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
	active: rBoolean,
});

export default model<Infraction>('Infractions', infractionSchema);
