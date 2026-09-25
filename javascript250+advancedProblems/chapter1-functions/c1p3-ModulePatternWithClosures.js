const mymodule = (function(){
    let privateData = 'secret' ;
    function privateMethod(){
        return privateData ;
    }
    return{
        getSecret: function(){
           return privateMethod()  ;
        }
    }
})() ;
console.log("------------------ output -------------") ;
console.log(mymodule.getSecret());
