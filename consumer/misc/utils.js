const jsonParse = (data) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}


module.exports = {
    jsonParse
}