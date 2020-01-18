window.onload = function() {



//id not declared - not needed into onEvent

calculLine.onkeydown = (e)=>{ e.preventDefault();}; //no keypress

if (navigator.userAgent.indexOf("Mobile") !=-1) calculLine.setAttribute("readonly",true);//disabled Android keyboard


class Keyboard
{
	 constructor(element,key)
	 {
	 	this.element = element;
	 	this.key= key;
	 }


	 press()
	 {
		this.element.onclick = () => //add key insert key focus on CalculLine 
		{
			calculLine.setRangeText(this.key, calculLine.selectionStart, calculLine.selectionEnd,"end");
			calculLine.focus();
		};

	 }


	 delete()
	{
		this.element.onclick = () =>
		{
			let text  = calculLine.value;
			let start = calculLine.selectionStart;
			let end   = calculLine.selectionEnd;

			if(start-end == 0 && start != 0)
			{
				calculLine.value = text.slice(0,start-1) + text.slice(end); //del value before cursor
				calculLine.selectionEnd = start-1; //keep focus in start-1 position
			}

			else
			{
				calculLine.value = text.slice(0,start) + text.slice(end); //del selection
				calculLine.selectionEnd = start; //keep focus in start position
			}

			calculLine.focus();
		};
	}


	clearScreen()
	{
		this.element.onclick = () => {calculLine.value=""; spanR.textContent=""; };
	}


	calcul()
	{
		this.element.onclick = () => 
		{  
			let resultat         = calculLine.value;

			const regexRoot 	   = /√\((.+)\)/g; 
			const regexSquare1     = /(\d+)²/g; 
			const regexSquare2     = /(\(.+\))²/g; 
			const regexInverse     = /⅟\((.+)\)/g; 
			const regexPi          = /π/g;
			const regexZeroDecimal = /\./;
			const regexPercent     = /%/g;
			

			resultat = resultat.replace(regexPi, `(${Math.PI})`);
			resultat = resultat.replace(regexSquare1, "($1**2)"      ); console.log("regexSquare1:" +resultat);
			resultat = resultat.replace(regexSquare2, "($1**2)"      ); console.log("regexSquare2:" +resultat);
			resultat = resultat.replace(regexInverse, "1/($1)"       ); console.log("regexInverse:" +resultat);
			resultat = resultat.replace(regexRoot   , "Math.sqrt($1)"); console.log("regexRoot:"    +resultat);
			resultat = resultat.replace(regexPercent, "*0.01*"       );	console.log("regexPercent:" +resultat);


			if(parseValid(resultat) && !sizeNumValid(resultat))	
			{
				try 
				{
					resultat = eval(resultat).toFixed(8).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'); //del zero
		    		while (resultat.slice(-1)=="0" && regexZeroDecimal.test(resultat) == true) 
		    		resultat=resultat.slice(0,-1); //del Zero rest of zero

					spanR.textContent = `=  ${resultat}`;
		 			listHistoric.innerHTML = `${calculLine.value} =  ${resultat}<br>`+ listHistoric.innerHTML;
				} 
				catch(e) 
				{
					spanR.textContent=`=> Syntax Error`; console.log(e);
				}
			}
		};	
	}



 
}


const keyPlus       = new Keyboard(plus,"+"    	 ); keyPlus.press();
const keyMinus      = new Keyboard(minus,"-"	 ); keyMinus.press();
const keyMultiplied = new Keyboard(multiplied,"*"); keyMultiplied.press();
const keyDivided    = new Keyboard(divided,"/"   ); keyDivided.press();
const keyPercent	= new Keyboard(percent,"%"   );	keyPercent.press();

const keyParseL		= new Keyboard(parseL,"("   );	keyParseL.press();
const keyParseR		= new Keyboard(parseR,")"   );	keyParseR.press();
const keySquare		= new Keyboard(square,"²"   );	keySquare.press();
const keyRoot		= new Keyboard(root,"√("    );	keyRoot.press();
const keyInverse	= new Keyboard(inverse,"⅟(" );	keyInverse.press();
const keyPi			= new Keyboard(pi,"π"       );	keyPi.press();
const keyDot		= new Keyboard(dot,"."      );	keyDot.press();

const keyZero	    = new Keyboard(zero,"0"     );	keyZero.press();
const keyOne	    = new Keyboard(one,"1"      );	keyOne.press();
const keyTwo	    = new Keyboard(two,"2"      );	keyTwo.press();
const keyThree	    = new Keyboard(three,"3"    );	keyThree.press();
const keyFour	    = new Keyboard(four,"4"     );	keyFour.press();
const keyFive	    = new Keyboard(five,"5"     );	keyFive.press();
const keySix	    = new Keyboard(six,"6"      );	keySix.press();
const keySeven	    = new Keyboard(seven,"7"    );	keySeven.press();
const keyEight	    = new Keyboard(eight,"8"    );	keyEight.press();
const keyNine	    = new Keyboard(nine,"9"     );	keyNine.press();

const keyDel	    = new Keyboard(del          );	keyDel.delete();
const keyClear		= new Keyboard(clear        );	keyClear.clearScreen();
const keyEqual	    = new Keyboard(equal,"="    );	keyEqual.calcul();



function touchButton() //touch button effect on device replaces hover effect
{
	const tds = document.getElementsByTagName("td");

	for (let td of tds)
	{
		td.addEventListener("touchstart",() =>{ 
			if(td == equal) equal.style.backgroundColor = "#d37e2e";
			else td.style.backgroundColor = "grey"; }, {passive: true});

		td.addEventListener("touchend",() =>{ 
			if(td == equal) equal.style.backgroundColor = "#5e5e5e";
			else td.style.backgroundColor = "#544f4f"; }, {passive: true});
	}

	const keyHistoric = document.getElementsByClassName("btsHist");

	for (let button of keyHistoric )
	{
		button.addEventListener("touchstart", ()=>{
			button.style.color = "#606e5f";
			button.style.backgroundColor = "#454C6D";
		}, {passive: true});

		button.addEventListener("touchend", ()=>{
			button.style.color = "#454C6D";
			button.style.backgroundColor = "#606e5f";
		}, {passive: true});
	}


		
}touchButton();



const parseValid = (str) =>  // Check parses
{
	let countL = 0;
	let countR = 0;
	let positionL = str.indexOf("(");
	let positionR = str.indexOf(")");


	while ( positionL != -1 )
	{
   		countL++;
   		positionL = str.indexOf( "(", positionL + 1 );
	}

	while ( positionR != -1 )
	{
   		countR++;
   		positionR = str.indexOf( ")", positionR + 1 );
	}

	switch (true) {
		case (countL>countR):
			spanR.innerHTML =`=> Syntax Error: Missing ")"`;
			break;
		case (countL<countR):
			spanR.innerHTML =`=> Syntax Error: Missing "("`;
			break;
		default:
			return true;
			break;
	}
};


const sizeNumValid = (str) => //check max size number
{
	const regexSizeNum = /^\d{16,}/g;

	if (regexSizeNum.test(str))
	{
		spanR.innerHTML =`=> Syntax Error: Size Number > 16`;
		return true;
	}

};


class History
{
	 constructor(element )
	 {
	 	this.element = element;
	 }

	 open()
	 {
	 	this.element.onclick = () => 
		{
	 		keyboard.style.display      = "none";
	 		listHistoric.style.display  = "block";
	 		closeHistoric.style.display = "block"; 
	 		clearHistoric.style.display = "block";
		};
	 }

	 close()
	 {
	 	this.element.onclick = () =>
	 	{
	 		keyboard.style.display      = "block"; 
		 	listHistoric.style.display  = "none";
	 		closeHistoric.style.display = "none"; 
	 		clearHistoric.style.display = "none";
	 	};
	 }

	 clear()
	 {
	 	this.element.onclick = () =>
	 	{
	 		listHistoric.innerHTML = "";
	 	};
	 }

}


const keyOpenHistoric  = new History(openHistoric);  keyOpenHistoric.open();
const keyCloseHistoric = new History(closeHistoric); keyCloseHistoric.close();
const keyClearHistoric = new History(clearHistoric); keyClearHistoric.clear();



}







































