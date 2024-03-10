const nameRegex = /\b([A-Z][a-z]+){2,}\b/g;
// detect phonenumber of format 9999999999
const phoneNoRegex = /\b\d{10}\b/g;
const emailRegex = /\S+@\S+\.\S+/g;
const websiteRegex = /(?:https?:\/\/)?(?:www\.)?([^\s]+)\.[^\s]+/gi;
function replaceWithMask(text, regex) {
    return text.replace(regex, "****");
}
function maskSensitiveContent(text) {
    let maskedText = replaceWithMask(text, nameRegex);
    maskedText = replaceWithMask(text, phoneNoRegex);
    maskedText = replaceWithMask(text, emailRegex);
    maskedText = replaceWithMask(text, websiteRegex);

    return maskedText;
}

module.exports = maskSensitiveContent;
