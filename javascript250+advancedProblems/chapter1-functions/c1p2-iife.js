const counterModule = (function(){

    let count = 0 ;
    return {
        increment : function(){
            count++ ;
            return count ;
        },

        decrement : function(){
            count-- ;
            return count ;
        },
        getCount: function(){
            return count ;
        },
    };
})() ;

console.log(counterModule.increment()) ;
console.log(counterModule.increment()) ;
console.log(counterModule.decrement()) ;
console.log(counterModule.getCount()) ;