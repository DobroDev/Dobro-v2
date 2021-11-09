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
	GeneralCommands: {
		Ping: {
			awaitMsg: string;
			Response: string;
		};
	};
}

export const config = JSON.parse(
	readFileSync('config.json', 'utf8')
) as ConfigFile;
