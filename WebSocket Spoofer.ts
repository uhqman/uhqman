/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2024 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

const infos = {
    other: { os: "Other", browser: "Discord Web" },
    linux: { os: "Linux", browser: "Discord Client" },
    mobile: { os: "iOS", browser: "Discord iOS" },
    darwin: { os: "Darwin", browser: "Discord Client" },
    android: { os: "Android", browser: "Discord Android" },
    windows: { os: "Linux", browser: "Discord Client" },
    console: { os: "Windows", browser: "Discord Embedded" },
};


const settings = definePluginSettings({
    plateforme: {
        type: OptionType.SELECT,
        description: "La plateforme qui sera spoof",
        restartNeeded: true,
        default: "windows",
        options: [
            { label: "Windows", value: "windows", default: true },
            { label: "Linux", value: "linux" },
            { label: "Darwin", value: "darwin" },
            { label: "Android", value: "android" },
            { label: "iOS", value: "mobile" },
            { label: "Web", value: "other" },
            { label: "Console", value: "console" }
        ],
    },
});


export default definePlugin({
    name: "PlatformEmulator",
    description: "Permet d'afficher votre status en ligne sur une fausse plateforme",
    authors: [{ name: "Sans", id: 1001171895909097533n }],
    patches: [
        {
            find: "os:e,browser:\"Discord Client\"",
            replacement: {
                match: "os:e,browser:\"Discord Client\"",
                replace: "os:$self.getData().os,browser:$self.getData().browser"
            }
        }
    ],
    settings,
    getData() {
        return {
            os: infos[settings.store.plateforme].os,
            browser: infos[settings.store.plateforme].browser
        };
    }
});
