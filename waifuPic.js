function getUrl(type){
    let isNsfw = type == "nsfw" ? "true" : "false";
    return  "https://api.waifu.im/random?is_nsfw="+isNsfw
}
function parse(response){
    return response.images[0].url
}

export default{getUrl, parse}
