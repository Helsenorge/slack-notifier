"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const templates_1 = require("./templates");
const node_fetch_1 = __importDefault(require("node-fetch"));
const thumbnailUrls = [
    "https://media.giphy.com/media/Xhxd8T0og4oKs/giphy.gif",
    "https://media.giphy.com/media/tIeCLkB8geYtW/source.gif"
];
const getRandomThumbnail = () => {
    return new Promise(resolve => {
        const randomThumbnail = Math.floor(Math.random() * 2);
        resolve(thumbnailUrls[randomThumbnail]);
    });
};
function getPackageVersion(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default("https://registry.npmjs.org/@helsenorge/designsystem", {
            method: "GET"
        });
        const data = yield response.json();
        return data["dist-tags"][tag];
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const chosenThumbnail = yield getRandomThumbnail();
        const version = yield getPackageVersion("dev");
        const message = yield templates_1.newRelease(chosenThumbnail, version);
        // const url = core.getInput("webHookUrl", { required: true });
        const url = "https://hooks.slack.com/services/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";
        const response = yield node_fetch_1.default(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });
        console.log("response", response);
    });
}
run();
