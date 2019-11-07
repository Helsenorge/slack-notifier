"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const templates_1 = require("./templates");
const node_fetch_1 = __importDefault(require("node-fetch"));
const thumbnailUrls = [
    "https://media.giphy.com/media/Xhxd8T0og4oKs/giphy.gif",
    "https://media.giphy.com/media/tIeCLkB8geYtW/source.gif",
    "https://media.giphy.com/media/zhIDyICDn75xm/giphy.gif",
    "https://media.giphy.com/media/FdEtkemRg6vo4/giphy.gif",
    "https://media.giphy.com/media/BIuuwHRNKs15C/source.gif"
];
const getRandomThumbnail = () => {
    return new Promise(resolve => {
        const randomThumbnail = Math.floor(Math.random() * 4);
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
        const url = core.getInput("webHookUrl", { required: true });
        const response = yield node_fetch_1.default(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });
        console.log("response", yield response);
    });
}
run();
