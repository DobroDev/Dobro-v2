import mongoose, { Schema } from 'mongoose';
import { rString } from '../../structures/';

const punishType = {
	type: String,
	required: true,
	enum: ['ban', 'mute'],
};

const infractionSchema = new Schema(
	{
		guildId: rString,
		infractionId: rString,
		userId: rString,
		moderatorId: rString,
		type: punishType,
        reason: rString,
        timestamp: {
            type: Date,
            required: true
        },
		expires: Date,
	},
	{ timestamps: true }
);

const name = 'infractions';

export default mongoose.models[name] || mongoose.model(name, infractionSchema);
