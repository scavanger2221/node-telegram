import waifuIm from "./waifuIm.js";
import waifuPic from "./waifuPic.js";

const rando = [
    1,2
  ]
  
export default function rollLink() {
    var res = rando[Math.floor(Math.random()*rando.length)];
    switch(res){
        case 1: return waifuIm
        case 2: return waifuPic
        default: throw new Error("rando error")
    }
}