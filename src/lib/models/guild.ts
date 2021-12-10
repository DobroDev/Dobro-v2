import { Schema, model, Document } from 'mongoose';
import { rString } from '../../structures';

interface IGuild extends Document {
	Id: string;
	muteRole: string;
}

const Guild = new Schema({
	Id: rString,
	muteRole: String,
});

export default model<IGuild>('Guild', Guild);
