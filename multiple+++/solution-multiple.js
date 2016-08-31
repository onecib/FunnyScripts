function multiple(){    
    for (x=1; x <= 100; x++){
        
        if( x % 5 == 0 && x % 3 == 0){
            console.log("beide");
        }
        else if( x % 3 == 0 ){
            console.log("drei");
        }
        else if( x % 5 == 0 ){
            console.log("fünf");
        }
        else {
            console.log(x);
        }
    }
}