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
	Errors: {
		inDevelopment: string;
		noPerms: string;
	};
	GeneralCommands: {
		Ping: {
			awaitMsg: string;
			Response: string;
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
		Coinflip: {
			Title: string;
			Description: string;
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
	};
}

export const config = JSON.parse(
	readFileSync('config.json', 'utf8')
) as ConfigFile;
