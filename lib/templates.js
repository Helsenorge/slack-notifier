"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRelease = (thumbnail, version) => {
    return new Promise(resolve => {
        resolve({
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*HNDS \`${version}\` has been published! :rocket:*\nGrab hold of your keyboard and boot up your favorite terminal to upgrade! Use either \`yarn upgrade\` or \`npm update\` to use the new package.`
                    },
                    accessory: {
                        type: "image",
                        image_url: thumbnail,
                        alt_text: "thumbnail"
                    }
                }
            ]
        });
    });
};
