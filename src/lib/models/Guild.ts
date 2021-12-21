import { Document, Schema, model } from 'mongoose';
import { rString } from '../structures/DBTypes';

export interface GuildDoc extends Document {
	Id: string;
	muteRole: string;
}

const Guild = new Schema<GuildDoc>({
	Id: rString,
	muteRole: String,
});

export default model<GuildDoc>('Guild', Guild);
