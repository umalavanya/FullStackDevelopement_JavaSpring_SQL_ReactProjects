class Sample{
    private name:string ;
    private email:string ;

    constructor(name:string, email: string){
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

