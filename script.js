window.onload = function() {


//------------------------Keyboard assigment-----------------------------
const calculLine = document.getElementById("calculLine");



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

	 	this.element.onmouseenter = () =>{ this.element.style.backgroundColor = bgColorIn;  };
	 	this.element.onmouseout   = () =>{ this.element.style.backgroundColor = bgColorOut; };
	 	this.element.onclick      = () =>{ calculLine.textContent += this.key;              };

	 	this.element.addEventListener("touchstart",() =>{ this.element.style.backgroundColor = bgColorIn;  });
	 	this.element.addEventListener("touchend",  () =>{ this.element.style.backgroundColor = bgColorOut; });

	 }

	 
}

class SpecialKey extends Keyboard{
	constructor(element,key)
	{
		super(element,key);
	}

	delete()
	{
		this.element.onclick = () =>{ calculLine.textContent=calculLine.textContent.slice(0,-1); }; //delete last value
	}
}




const keyPlus       = new Keyboard(plus,"+"); 	    keyPlus.effect();
const keyMinus      = new Keyboard(minus,"-"); 	    keyMinus.effect();
const keyMultiplied = new Keyboard(multiplied,"x"); keyMultiplied.effect();
const keyDivided    = new Keyboard(divided,"/"); 	keyDivided.effect();
const keyPercent	= new Keyboard(percent,"%");	keyPercent.effect();

const keyParseL		= new Keyboard(parseL,"(");		keyParseL.effect();
const keyParseR		= new Keyboard(parseR,")");		keyParseR.effect();
const keySquare		= new Keyboard(square,"²");		keySquare.effect();
const keyRoot		= new Keyboard(root,"√");		keyRoot.effect();
const keyReverse	= new Keyboard(reverse,"⅟");		keyReverse.effect();
const keyPi			= new Keyboard(pi,"𝝅");			keyPi.effect();
const keyDot		= new Keyboard(dot,".");		keyDot.effect();

const keyZero	    = new Keyboard(zero,"0");		keyZero.effect();
const keyOne	    = new Keyboard(one,"1");		keyOne.effect();
const keyTwo	    = new Keyboard(two,"2");		keyTwo.effect();
const keyThree	    = new Keyboard(three,"3");		keyThree.effect();
const keyFour	    = new Keyboard(four,"4");		keyFour.effect();
const keyFive	    = new Keyboard(five,"5");		keyFive.effect();
const keySix	    = new Keyboard(six,"6");		keySix.effect();
const keySeven	    = new Keyboard(seven,"7");		keySeven.effect();
const keyEight	    = new Keyboard(eight,"8");		keyEight.effect();
const keyNine	    = new Keyboard(nine,"9");		keyNine.effect();

const keyDel	    = new SpecialKey(del,"⌫");		keyDel.effect(); keyDel.delete();
const keyEqual	    = new Keyboard(equal,"=");		keyEqual.effect();

	










}

















































