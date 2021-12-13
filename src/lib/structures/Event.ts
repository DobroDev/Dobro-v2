import { ClientEvents } from 'discord.js';

export class Event<Key extends keyof ClientEvents> {
	public constructor(
		public event: Key,
		public run: (...args: ClientEvents[Key]) => any,
		public once?: boolean
	) {}
}
