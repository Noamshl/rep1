let calcScreen = "0";
let stack = [];


//--------------- Before computing --------------------------

//Displays the current elements of computing on the screen 
function display(){
    document.getElementById("outline").innerHTML = calcScreen;
}

//Displays the extended elements on the screen
function expand(x){
    if(calcScreen == 0){
        calcScreen = x;
    }
    else{
        calcScreen += x;
    }
    display();
     
}

//---------------- Initilize the calculator------------------

//Initilize the calculator and its screen
function remove(){
    stack.splice(0,stack.length);
    calcScreen= "0";
    display();
 }

//--------------------- Computing -------------------------

//Return the index of the first operator or -1 if it is not exist 
function findOp(str){
    for(let i =0; i< str.length;i++){
        if(i == 0 && str[i] == '-')
          continue;
        if(isNaN(parseInt(str[i])) ){
            return i+1;
        }
    }
    return -1;
}

//Computes the result of the elements on the screen 
function compute(){
    while(calcScreen!= ""){
       transfer();
    }
    if(stack.length == 1){ 
       calcScreen+= stack.shift(); 
       display();
       return;
    }
    let saver = stack.slice(0,3);
    stack.splice(0,3); 
    while(stack.length> 0){
      if( !checkOp(stack[0])){      
        saver.push(evaluate(saver.shift(),saver.shift(),saver.shift()));  
        saver = saver.concat(stack.slice(0,2));
        stack.splice(0,2);
      }
      else{
         saver.push(evaluate(saver.pop(),stack.shift(),stack.shift())); 
      }

   }
   saver.push(evaluate(saver.shift(),saver.shift(),saver.shift()));  
   calcScreen+= saver.pop();
   display();
}   
    
//Checks if the operator is the type of multiply or division 
function checkOp(op){
   return op == 'X' || op == '/';
}

//Returns result of comupte given two numbers and operator
function evaluate(x,op,y){
    if(op == "+") return x+y;
    if(op == "-") return x-y;
    if(op == "X") return x*y;
    else return x/y;

}

//Checks valid input and splits the screen elements to numbers and operators 
function transfer(){
    let index = findOp(calcScreen);
    if(index == -1){
        stack.push(parseInt(calcScreen));
        calcScreen ="";
    }
    else{
        if(index == 1 ||index == calcScreen.length){
            remove();
            return;
        }
        stack.push(parseInt(calcScreen.slice(0,index-1)));
        stack.push(calcScreen.slice(index-1,index));
        calcScreen = calcScreen.slice(index);
    }
}

