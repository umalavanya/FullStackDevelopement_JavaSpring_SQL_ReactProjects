class Sample{
    private name:string ;
    private email:string ;

    constructor(name:string, email: string){
        this.name = name ;
        this.email = email ;
    }

    setName(name: string):void{

        this.name = name ;


    }

    setEmail(email:string):void{
        this.email = email ;
    }

    printName():void{

        console.log(this.name) ; //printing Name 
    }
} ;


var sampleObject:Sample = new Sample("Uma") ;

sampleObject.printName() ;

sampleObject.setName("Rani") ; // Change Name through setName

sampleObject.printName() ; 

