import { HexColorString } from 'discord.js';
import { readFileSync } from 'fs';

interface ConfigFile {
	Bot: {
		Token: string;
		Prefix: string;
		Developers: string[];
		DevServer: string;
	};
	Database: {
		URL: string;
	};
	embedColors: {
		error: HexColorString;
		success: HexColorString;
	};
	Errors: {
		inDevelopment: string;
		noPerms: string;
	};
	GeneralCommands: {
		Ping: {
			awaitMsg: string;
			Response: string;
		};
		Stats: {
			invalidUser: string;
			Description: string;
			Developers: string;
			Links: string[];
		};
	};
	FunCommands: {
		RPS: {
			Question: string;
			InvalidPlayer: string;
		};
		eightball: {
			embed: string;
		};
		Math: {
			Title: string;
			Fields: string[];
		};
		RollDice: {
			Rolling: string;
			Title: string;
			Description: string;
			Sides: string[];
		};
		HowGay: {
			Title: string;
			Description: string;
		};
		Meme: {
			NSFW: string;
		};
		Gun: {
			Title: string;
		};
		PP: {
			Title: string;
			Description: string;
		};
		Sus: {
			message: string;
			images: string[];
		};
	};
}

export const config = JSON.parse(
	readFileSync('config.json', 'utf8')
) as ConfigFile;
