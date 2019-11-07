export const newRelease = (thumbnail, version) => {
  return new Promise(resolve => {
    resolve({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*HNDS \`${version}\` has been published! :rocket:*\nGrab hold of your keyboard and boot up your favorite terminal to upgrade! Use \`yarn upgrade @helsenorge/designsystem@dev\` to update to our newest package version.`
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
