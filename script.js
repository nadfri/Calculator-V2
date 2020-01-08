window.onload = function() {


//------------------------Keyboard assigment-----------------------------
//id not declared - not needed into onEvent

class Keyboard{
	 constructor(element,key)
	 {
	 	this.element = element;
	 	this.key= key;
	 }

	 effect()
	 {
	 	let bgColorIn  = "grey";
	 	let bgColorOut = "#544f4f"; 

	 	if(this.element == equal) {bgColorIn="#d37e2e"; bgColorOut="#5e5e5e"}


	 	calculLine.onkeydown	  = (e)=>{ e.preventDefault();}; // no keypress

	 	this.element.onmouseenter = () =>{ this.element.style.backgroundColor = bgColorIn;  };
	 	this.element.onmouseout   = () =>{ this.element.style.backgroundColor = bgColorOut; };
	 	
	 	this.element.addEventListener("touchstart",() =>{ this.element.style.backgroundColor = bgColorIn;  });
	 	this.element.addEventListener("touchend",  () =>{ this.element.style.backgroundColor = bgColorOut; });

	 }


	 press()
	 {
		this.element.onclick = () => //add key insert key focus on CalculLine 
		{
			calculLine.setRangeText(this.key, calculLine.selectionStart, calculLine.selectionEnd,"end");
			calculLine.focus();
		};

	 }
 
}

class SpecialKey extends Keyboard{ constructor(element,key)
	{super(element,key);}

	delete()
	{
		this.element.onclick = () =>
		{
			let text  = calculLine.value;
			let start = calculLine.selectionStart;
			let end   = calculLine.selectionEnd;

			switch (true) 
			{
				case (end-start == 0):
					calculLine.value=text.slice(0,start-1) + text.slice(end); //del value before cursor
					break;
				case (end-start > 0):
					calculLine.value = text.slice(0,start) + text.slice(end); //del selection
					break;
				default:
					calculLine.value=text.slice(0,-1); //del last value
					break; 
			}

			calculLine.focus();
		};
	}
}




const keyPlus       = new Keyboard(plus,"+"); 	    keyPlus.effect(); 		keyPlus.press();
const keyMinus      = new Keyboard(minus,"-"); 	    keyMinus.effect(); 		keyMinus.press();
const keyMultiplied = new Keyboard(multiplied,"x"); keyMultiplied.effect(); keyMultiplied.press();
const keyDivided    = new Keyboard(divided,"/"); 	keyDivided.effect(); 	keyDivided.press();
const keyPercent	= new Keyboard(percent,"%");	keyPercent.effect(); 	keyPercent.press();

const keyParseL		= new Keyboard(parseL,"(");		keyParseL.effect(); 	keyParseL.press();
const keyParseR		= new Keyboard(parseR,")");		keyParseR.effect(); 	keyParseR.press();
const keySquare		= new Keyboard(square,"²");		keySquare.effect(); 	keySquare.press();
const keyRoot		= new Keyboard(root,"√");		keyRoot.effect(); 		keyRoot.press();
const keyReverse	= new Keyboard(reverse,"⅟");		keyReverse.effect(); 	keyReverse.press();
const keyPi			= new Keyboard(pi,"𝝅");			keyPi.effect(); 		keyPi.press();
const keyDot		= new Keyboard(dot,".");		keyDot.effect(); 		keyDot.press();

const keyZero	    = new Keyboard(zero,"0");		keyZero.effect(); 		keyZero.press();
const keyOne	    = new Keyboard(one,"1");		keyOne.effect(); 		keyOne.press();
const keyTwo	    = new Keyboard(two,"2");		keyTwo.effect(); 		keyTwo.press();
const keyThree	    = new Keyboard(three,"3");		keyThree.effect(); 		keyThree.press();
const keyFour	    = new Keyboard(four,"4");		keyFour.effect(); 		keyFour.press();
const keyFive	    = new Keyboard(five,"5");		keyFive.effect(); 		keyFive.press();
const keySix	    = new Keyboard(six,"6");		keySix.effect(); 		keySix.press();
const keySeven	    = new Keyboard(seven,"7");		keySeven.effect(); 		keySeven.press();
const keyEight	    = new Keyboard(eight,"8");		keyEight.effect(); 		keyEight.press();
const keyNine	    = new Keyboard(nine,"9");		keyNine.effect(); 		keyNine.press();

const keyDel	    = new SpecialKey(del,"");		keyDel.effect();   		keyDel.delete();
const keyEqual	    = new SpecialKey(equal,"=");	keyEqual.effect();

	


/*del.onclick = () =>{ 
	let text = calculLine.value;
	let start = calculLine.selectionStart;
	let end = calculLine.selectionEnd;



	switch (true) {
		case (end-start == 0):
			calculLine.value=text.slice(0,start-1) + text.slice(end); //del value before cursor
			break;
		case (end-start > 0):
			calculLine.value = text.slice(0,start) + text.slice(end); //del selection
			break;
		default:
			calculLine.value=text.slice(0,-1); //del last value
			break;
}

};
*/





}

















































