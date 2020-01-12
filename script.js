window.onload = function() {


//------------------------Keyboard assigment-----------------------------
//id not declared - not needed into onEvent

calculLine.onkeydown = (e)=>{ e.preventDefault();}; // no keypress
if (navigator.userAgent.indexOf("Mobile") !=-1) {calculLine.setAttribute("readonly",true)};


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
		this.element.onclick = () => calculLine.value="";
	}
 
}


const keyPlus       = new Keyboard(plus,"+"); 	    keyPlus.press();
const keyMinus      = new Keyboard(minus,"-"); 	    keyMinus.press();
const keyMultiplied = new Keyboard(multiplied,"*"); keyMultiplied.press();
const keyDivided    = new Keyboard(divided,"/"); 	keyDivided.press();
const keyPercent	= new Keyboard(percent,"%");	keyPercent.press();

const keyParseL		= new Keyboard(parseL,"(");		keyParseL.press();
const keyParseR		= new Keyboard(parseR,")");		keyParseR.press();
const keySquare		= new Keyboard(square,"²");		keySquare.press();
const keyRoot		= new Keyboard(root,"√");		keyRoot.press();
const keyReverse	= new Keyboard(reverse,"⅟");		keyReverse.press();
const keyPi			= new Keyboard(pi,"𝝅");			keyPi.press();
const keyDot		= new Keyboard(dot,".");		keyDot.press();

const keyZero	    = new Keyboard(zero,"0");		keyZero.press();
const keyOne	    = new Keyboard(one,"1");		keyOne.press();
const keyTwo	    = new Keyboard(two,"2");		keyTwo.press();
const keyThree	    = new Keyboard(three,"3");		keyThree.press();
const keyFour	    = new Keyboard(four,"4");		keyFour.press();
const keyFive	    = new Keyboard(five,"5");		keyFive.press();
const keySix	    = new Keyboard(six,"6");		keySix.press();
const keySeven	    = new Keyboard(seven,"7");		keySeven.press();
const keyEight	    = new Keyboard(eight,"8");		keyEight.press();
const keyNine	    = new Keyboard(nine,"9");		keyNine.press();

const keyDel	    = new Keyboard(del);			keyDel.delete();
const keyClear		= new Keyboard(clear);			keyClear.clearScreen();
const keyEqual	    = new Keyboard(equal,"=");		//keyEqual.press();



function touchButton() //touch button effect on device replaces hover effect
{
	const tds = document.getElementsByTagName("td");

	for (let td of tds)
	{
		td.addEventListener("touchstart",() =>{ 
			if(td == equal) equal.style.backgroundColor = "#d37e2e";
			else td.style.backgroundColor = "grey";  });

		td.addEventListener("touchend",() =>{ 
			if(td == equal) equal.style.backgroundColor = "#5e5e5e";
			else td.style.backgroundColor = "#544f4f"; });
	}
		
}touchButton();



function parseValid(str)  // Check parses
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
			result.innerHTML =`${str} => Syntax Error: Missing  ")"`;
			break;
		case (countL<countR):
			result.innerHTML =`${str} => Syntax Error: Missing  "("`;
			break;
		default:
			return true;
			break;
	}
}


//------essai calcul



equal.onclick = () => {  
	let resultat = calculLine.value;
	let regexSquare = /(^\(?\d*\)?$)²/;

	resultat = resultat.replace(regexSquare,"Math.sqrt($1)" );

	result.innerHTML = `<p>${resultat} = </p>`;

	
	/*if(parseValid(resultat))
		
	{
		try 
		{
			result.innerHTML = `<p>${resultat} = ${eval(resultat)}</p>`;
		} 
		catch(e) 
		{
			result.innerHTML=`${resultat} => Syntax Error`;
		}
	}*/


};

//------------------















}







































