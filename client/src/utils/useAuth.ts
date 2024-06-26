import { Client } from 'colyseus.js';
import { discordSdk } from './discordSdk';
import type { IGuildsMembersRead } from "./types";

export const setUpDiscordSdk = async () => {

    // console.log(process.env.VITE_CLIENT_ID)
    await discordSdk.ready();

    // Authorize with Discord Client
    const {code} = await discordSdk.commands.authorize({
        client_id: process.env.VITE_DISCORD_CLIENT_ID,
        response_type: 'code',
        state: '',
        prompt: 'none',
        // More info on scopes here: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
        scope: [
            // "applications.builds.upload",
            // "applications.builds.read",
            // "applications.store.update",
            // "applications.entitlements",
            // "bot",
            'identify',
            // "connections",
            // "email",
            // "gdm.join",
            'guilds',
            // "guilds.join",
            'guilds.members.read',
            // "messages.read",
            // "relationships.read",
            // 'rpc.activities.write',
            // "rpc.notifications.read",
            // "rpc.voice.write",
            'rpc.voice.read',
            // "webhook.incoming",
        ],
    });
    console.log("trying to fetch token");
    // Retrieve an access_token from your embedded app's server
    const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code,
        }),
    });
    const { access_token } = await response.json();
    console.log("fetched token");

    // Authenticate with Discord client (using the access_token)
    const newAuth = await discordSdk.commands.authenticate({
        access_token,
    });
    const str = JSON.stringify(discordSdk);
    console.log(str);

    // Get guild specific nickname and avatar, and fallback to user name and avatar
    const guildMember: IGuildsMembersRead | null = await fetch(
        `/discord/api/users/@me/guilds/${discordSdk.guildId}/member`,
        {
            method: 'get',
            headers: { Authorization: `Bearer ${access_token}` },
        },
    )
        .then((j) => j.json())
        .catch(() => {
            return null;
        });

    // Done with discord-specific setup

    //return {...newAuth, guildMember, client, room: newRoom}
};
