let string ="";
let buttons = document.getElementsByTagName("button");

document.getElementById("result").addEventListener("keydown",(e) => {
  console.log(e.key);
  if(e.key>=0 && e.key<=9){
   string += e.key;
}
else {
  alert("Only numbers are allowed");
  e.preventDefault();
}

});


//traverses through each of the buttons and adds event listener.
for(let i = 0; i < buttons.length; i++){
     buttons[i].addEventListener("click",(e)=>{
    if(e.currentTarget.innerHTML== "="){  
       string= string.replace("X","*");  //the calculator diplays alphabet X hence replaving to multiplication symbol
       string= calculate(string);  //user defined function to get the computed value
       if (isNaN(string)) document.getElementById("result").value ="ERROR: Invalid"  // to handle improper inputs like 9++, =2 etc
       else document.getElementById("result").value = string; //displays final computed value
    }

    else if(e.currentTarget.innerHTML == "C"){ 
        string = "";
        document.getElementById("result").value = string;
    }

    else if(e.currentTarget.innerHTML == "&lt;-"){
      if(typeof string =="number") string ="";  // when the final value is obtained from calculate it is of type number

        string = string.substring(0, string.length - 1);
        document.getElementById("result").value = string;
    }

    else{ 
    string += e.currentTarget.innerHTML;
    document.getElementById("result").value = string;  
    }
   })

}

function calculate(str){
    //console.log("inside calculate",str);
    let expArray = [];
    expArray = convertArray(str); //to convert the string exxpression into array. user defined func used instead of split() to handle numbers with more than 1 digit.
    //console.log("inside calculate exparray",expArray);

    let optorStack =[]; //operator stack
    let operandStack = [];  //operand stack

    for(let i=0; i<expArray.length; i++){
      if( Number.isInteger(parseInt(expArray[i]))  || isDecimal(expArray[i])){ 
           operandStack.push(Number(expArray[i])) //push into operand stack if it is a number
         //  console.log("operand pushed into stack",Number(expArray[i]) )
    }

    //precedence() is a user defined func to return operator precedence. + and - have precedence 1. * and / have precedence 2
    else if(expArray[i] =="+" || expArray[i] =="-" || expArray[i] =="*" || expArray[i] =="/"){

      //
         while(optorStack.length!=0 && Precedence(optorStack[optorStack.length-1])>=Precedence(expArray[i])){
                     let val2 =operandStack.pop();
                     let val1 =operandStack.pop();
                     let optor = optorStack.pop();

                    let value= Operation(val1,val2,optor); //operation() is a user defined func where the computation happens
                    operandStack.push(value);

         }
         optorStack.push(expArray[i]);
    }
}
while(optorStack.length!=0 ){
  let val2 =operandStack.pop();
  let val1 =operandStack.pop();
  let optor = optorStack.pop();

 let value= Operation(val1,val2,optor);
 operandStack.push(value);

}
  return operandStack.pop();

}
function convertArray(str){
    
    let startArray = str.split("");
    console.log("inside convertArray",startArray);
    let finalArray = [];

    finalArray.push(startArray[0]);

    for(let i=1; i<startArray.length; i++){

        if(Number.isInteger(parseInt(startArray[i])) && Number.isInteger(parseInt(finalArray[finalArray.length-1]))){

        finalArray[finalArray.length-1] = finalArray[finalArray.length-1] + startArray[i];
       }

        else if(startArray[i] == ".")
      {
         finalArray[finalArray.length-1] = finalArray[finalArray.length-1] + startArray[i] + startArray[i+1];
         i++;
      }

      else if(Number.isInteger(parseInt(startArray[i])) && isDecimal(finalArray[finalArray.length-1])){
         finalArray[finalArray.length-1] = finalArray[finalArray.length-1] + startArray[i]
     }

      else
        finalArray.push(startArray[i]);

}

return finalArray;
}

function isDecimal(number){
    if(number == "+"|| number == "*" || number == "/"|| number == "-")
    {
      return false;
    }


     else if(number - Math.floor(number) != 0)
     {
       return true;
    }


    else
     {
        return false;
     }
}


function Precedence(optor){

  if(optor=="+" || optor=="-")
  {
    return 1;
  }
  else {
    return 2;
  }

}


function Operation(val1, val2, optor){
  if(optor == "+") {
    console.log("val1"+val1 + optor + "val2"+val2);
    console.log(val1 + val2);
    return val1 + val2;
}
  else if (optor == "-"){
    console.log("val1"+val1 + optor + "val2"+val2);
    console.log(val1 - val2);
  return val1 - val2;
}
  else if (optor == "*"){
    console.log("val1"+val1 + optor + "val2"+val2);
    console.log(val1 * val2);
  return val1 * val2;
  }
  else if (optor == "/"){
    console.log("val1"+val1 + optor + "val2"+val2);
    console.log(val1 / val2);
  return val1 / val2;
  }
}





