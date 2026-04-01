
const RPS = ["Rock", "Paper","Scissors"] ; //Array


function shoot(){
    let random_num = Math.floor(Math.random()*3) ;
    return RPS[random_num] ;
}

let shoot_let = shoot() ;
console.log(shoot_let) ;