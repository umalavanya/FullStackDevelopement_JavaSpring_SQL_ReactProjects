class Sample{
    private name:string ;

    constructor(name:string){
        this.name = name ;
    }

    setName(name: string):void{

        this.name = name ;

    }

    printName():void{

        console.log(this.name) ; //printing Name 
    }
} ;


var sampleObject:Sample = new Sample("Uma") ;

sampleObject.printName() ;

sampleObject.setName("Rani") ; // Change Name through setName

sampleObject.printName() ; 