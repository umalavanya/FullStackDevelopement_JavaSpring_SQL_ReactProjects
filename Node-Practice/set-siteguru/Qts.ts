class Sample{
    private name:string ;

    constructor(name:string){
        this.name = name ;
    }

    setName(name: string):void{

        this.name = name ;

    }

    printName():void{
        console.log(this.name) ;
    }
} ;


var sampleObject:Sample = new Sample("Uma") ;

sampleObject.printName() ;