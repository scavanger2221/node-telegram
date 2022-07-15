function getUrl (type){
    return "https://api.waifu.pics/"+type+"/waifu"
}

function parse(response){
    return response.url
}

export default{getUrl, parse}