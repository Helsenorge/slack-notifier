import * as core from "@actions/core";
import { newRelease } from "./templates";
import fetch from "node-fetch";

const thumbnailUrls = [
  "https://media.giphy.com/media/Xhxd8T0og4oKs/giphy.gif",
  "https://media.giphy.com/media/tIeCLkB8geYtW/source.gif",
  "https://media.giphy.com/media/zhIDyICDn75xm/giphy.gif",
  "https://media.giphy.com/media/FdEtkemRg6vo4/giphy.gif",
  "https://media.giphy.com/media/BIuuwHRNKs15C/source.gif"
];

const getRandomThumbnail = () => {
  return new Promise(resolve => {
    const randomThumbnail = Math.floor(Math.random() * 2);
    resolve(thumbnailUrls[randomThumbnail]);
  });
};

async function getPackageVersion(tag) {
  const response = await fetch(
    "https://registry.npmjs.org/@helsenorge/designsystem",
    {
      method: "GET"
    }
  );
  const data = await response.json();
  return data["dist-tags"][tag];
}

async function run() {
  const chosenThumbnail = await getRandomThumbnail();
  const version = await getPackageVersion("dev");
  const message = await newRelease(chosenThumbnail, version);
  // const url = core.getInput("webHookUrl", { required: true });
  const url =
    "https://hooks.slack.com/services/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";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  });
  console.log("response", response);
}

run();
