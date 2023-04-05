document.addEventListener("DOMContentLoaded", () => {});

const getRegexMatches = (text, regexPattern) => {
    let matches = [...text.matchAll(regexPattern)];
    return matches.map((match) => match[1]);
};

let url = location.href;
let getUrlParams = () => {
    let params = location.search;
    let urlSearchParams = new URLSearchParams(params);
    let jsonParams = {};

    for (const [key, value] of urlSearchParams.entries())
        jsonParams[key] = value;

    return jsonParams;
};
