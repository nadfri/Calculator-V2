window.onload = function() {


//------------------------Keyboard assigment-----------------------------
const plus 		 = document.getElementById("plus");
const minus 	 = document.getElementById("minus");
const multiplied = document.getElementById("multiplied");
const divided 	 = document.getElementById("divided");
const percent 	 = document.getElementById("percent"); 

const calculLine = document.getElementById("calculLine");



minus.onclick 	   = () =>{ calculLine.textContent += "-"; };
multiplied.onclick = () =>{ calculLine.textContent += "x"; };
divided.onclick    = () =>{ calculLine.textContent += "/"; };


class MouseEffect{
	 constructor(element,operator)
	 {
	 	this.element = element;
	 	this.operator= operator;
	 }

	 effect()
	 {

	 	this.element.onclick      = ()  =>{ calculLine.textContent += this.operator;    };
	 	this.element.onmouseenter = (e) =>{ e.target.style.backgroundColor = "grey";    };
	 	this.element.onmouseout   = (e) =>{ e.target.style.backgroundColor = "#544f4f"; };
	 	this.element.addEventListener("touchstart",  (e) =>{ e.target.style.backgroundColor = "grey"   ;});
	 	this.element.addEventListener("touchend",    (e) =>{ e.target.style.backgroundColor = "#544f4f";});
	 }
	 
}

const mousePlus       = new MouseEffect (plus,"+"); 	  mousePlus.effect();
const mouseMinus      = new MouseEffect (minus,"-"); 	  mouseMinus.effect();
const mouseMultiplied = new MouseEffect (multiplied,"x"); mouseMultiplied.effect();
const mouseDivided    = new MouseEffect(divided,"/"); 	  mouseDivided.effect();

















































}