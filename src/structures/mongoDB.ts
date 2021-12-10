import { SchemaTypes } from 'mongoose';

export const rString = {
	type: SchemaTypes.String,
	required: true,
};

export const rDate = {
	type: SchemaTypes.Date,
	required: true,
};
