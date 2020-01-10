window.onload = function() {


//------------------------Keyboard assigment-----------------------------
//id not declared - not needed into onEvent

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
const keyMultiplied = new Keyboard(multiplied,"x"); keyMultiplied.press();
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
	const td = document.getElementsByTagName("td");

	for (let tds of td)
		{
			tds.addEventListener("touchstart",() =>{ 
				if(tds == equal) equal.style.backgroundColor = "#d37e2e";
				else tds.style.backgroundColor = "grey";  });

			tds.addEventListener("touchend",() =>{ 
				if(tds == equal) equal.style.backgroundColor = "#5e5e5e";
				else tds.style.backgroundColor = "#544f4f"; });
		}
		
}

touchButton();



}







































