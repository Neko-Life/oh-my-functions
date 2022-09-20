"use strict";

let listening = false;
let resQueue = "";

process.stdin.on("data", (buf) => {
    const res = buf.toString().slice(0, -1);
    if (listening) {
        resQueue = res;
    }
});

/**
 * Get current listening state
 * @returns {boolean}
 */
const getListeningState = () => {
    return listening;
}

/**
 * Get last input from stdin
 * @returns {string}
 */
const getLastInput = () => {
    return resQueue;
}

/**
 * Get line from stdin
 * @param {string} prompt - Prompt, if any
 * @param {number} _interval - Checker interval in ms, can cause high cpu usage if too low.
 *                             Only set if you know what you're doing.
 * @returns {Promise<string>}
 */
const getLine = async (prompt, _interval = 50) => {
    return new Promise(async (r, j) => {
        if (listening) j(new Error("Already listening to stdin"));

        if (prompt?.length) {
            process.stdout.write(prompt);
        }

        resQueue = "";
        listening = true;

        while (!resQueue.length)
            await new Promise((r, j) => setTimeout(r, _interval));

        const ret = resQueue;
        listening = false;
        r(ret);
    });
}

module.exports = {
    getLine,
    getListeningState,
    getLastInput,
};
