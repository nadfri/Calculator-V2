window.onload = function() {
/**************Config WebStorage *****************************/
let hist_Storage;
if(JSON.parse(localStorage.getItem('hist_Storage') != null))
{
	hist_Storage = JSON.parse(localStorage.getItem('hist_Storage'));
	listHistoric.innerHTML = hist_Storage;
}

//**KeyPress disabled*/
calculLine.onkeydown = (e) =>{ e.preventDefault();}; //no keypress
if (navigator.userAgent.indexOf("Mobile") !=-1) calculLine.setAttribute("readonly",true);//disabled Android keyboard

class Keyboard
{
	 constructor(element,key)
	 {
	 	this.element = element;
	 	this.key     = key;
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
		this.element.onclick = () => {calculLine.value = ""; spanR.textContent = ""; };
	}

	calcul()
	{
		this.element.onclick = () => 
		{  
			let resultat = (calculLine.value =="") ? "0" : regexAll(calculLine.value);
			
			if(bracketValid(resultat) && sizeNumValid(resultat))	
			{
				try 
				{
					resultat = Number(eval(resultat)); //Number() delete 0 useless
					resultat = resultat.toString(); // convert in string to use regex
					resultat = spaceThousand(resultat);

					spanR.textContent      = `=${resultat}`;
					listHistoric.innerHTML = `${calculLine.value} =${resultat}<br><hr>`+ listHistoric.innerHTML;
					hist_Storage = listHistoric.innerHTML;
					localStorage.setItem("hist_Storage",JSON.stringify(hist_Storage)); //save in storage
				} 
				catch(e) 
				{
					spanR.textContent = `=> Syntax Error`; console.log(e);
				}
			}
		};	
	}
}

class Percent
{
	 constructor(element, operator)
	 {
	 	this.element  = element;
	 	this.operator = operator;
	 }

	 calculPercent()
	 {		
		this.element.onclick = ()=>
		{	
			let regex = /^\d+[\.\d]*%\d+[\.\d]*$/;


			if(calculLine.value == "")
			{
				spanR.textContent = "Do a percent calcul before...";
			}

			else if (!regex.test(calculLine.value) )
			{	
				spanR.textContent = "Percent expression not valid";
			}

			else
			{
				let number  = calculLine.value.split("%");
			
				try 
				{
					let resultat           = eval(number[1]+this.operator+number[1]*number[0]*0.01).toFixed(2);
					spanR.textContent      = `${number[1]}${this.operator}${number[0]}% =${resultat}`;
					listHistoric.innerHTML = `${number[1]}${this.operator}${number[0]}% =${resultat}<br>`
										   + listHistoric.innerHTML;
				} 
				catch(e) 
				{
					spanR.textContent=`=> Syntax Error`; console.log(e);
				}	
			}
		
		};
	}
}


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
			openHistoric.style.color = "#daeaef";
			openHistoric.style.backgroundColor = "#333333";
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
			 openHistoric.style.color = "";
			 openHistoric.style.backgroundColor = "";
	 	};
	 }

	 clear()
	 {
	 	this.element.onclick = () =>
	 	{
			 listHistoric.innerHTML = "";
			 localStorage.clear(); //delete storage
	 	};
	 }

}

const keyPlus          = new Keyboard(plus,"+"    	 ); keyPlus.press();
const keyMinus         = new Keyboard(minus,"-"	 	 ); keyMinus.press();
const keyMultiplied    = new Keyboard(multiplied,"*" ); keyMultiplied.press();
const keyDivided       = new Keyboard(divided,"/"    ); keyDivided.press();
const keyPercent	   = new Keyboard(percent,"%"    );	keyPercent.press();

const keybracketL 	   = new Keyboard(bracketL,"("   );	keybracketL.press();
const keybracketR      = new Keyboard(bracketR,")"   );	keybracketR.press();
const keySquare		   = new Keyboard(square,"²"     );	keySquare.press();
const keyRoot		   = new Keyboard(root,"√("      );	keyRoot.press();
const keyInverse	   = new Keyboard(inverse,"⅟("   );	keyInverse.press();
const keyPi			   = new Keyboard(pi,"π"         );	keyPi.press();
const keyDot		   = new Keyboard(dot,"."        );	keyDot.press();

const keyZero	       = new Keyboard(zero,"0"       );	keyZero.press();
const keyOne	       = new Keyboard(one,"1"        );	keyOne.press();
const keyTwo	       = new Keyboard(two,"2"        );	keyTwo.press();
const keyThree	       = new Keyboard(three,"3"      );	keyThree.press();
const keyFour	       = new Keyboard(four,"4"       );	keyFour.press();
const keyFive	       = new Keyboard(five,"5"       );	keyFive.press();
const keySix	       = new Keyboard(six,"6"        );	keySix.press();
const keySeven	       = new Keyboard(seven,"7"      );	keySeven.press();
const keyEight	       = new Keyboard(eight,"8"      );	keyEight.press();
const keyNine	       = new Keyboard(nine,"9"       );	keyNine.press();

const keyDel	       = new Keyboard(del            );	keyDel.delete();
const keyClear	   	   = new Keyboard(clear          );	keyClear.clearScreen();
const keyEqual	       = new Keyboard(equal,"="      );	keyEqual.calcul();

const keyPercentPlus   = new Percent(percentPlus,"+" ); keyPercentPlus.calculPercent();
const keyPercentMinus  = new Percent(percentMinus,"-"); keyPercentMinus.calculPercent();

const keyOpenHistoric  = new History(openHistoric    ); keyOpenHistoric.open();
const keyCloseHistoric = new History(closeHistoric   ); keyCloseHistoric.close();
const keyClearHistoric = new History(clearHistoric   ); keyClearHistoric.clear();

// function touchButton() //touch button effect on device replaces hover effect
// {
// 	const tds = document.getElementsByTagName("td");

// 	for (let td of tds)
// 	{
// 		td.addEventListener("touchstart",() =>{ 
// 			if(td == equal) equal.style.backgroundColor = "#d37e2e";
// 			else 			   td.style.backgroundColor = "grey";    }, {passive: true});

// 		td.addEventListener("touchend",() =>{ 
// 			if(td == equal) equal.style.backgroundColor = "#5e5e5e";
// 			else 			   td.style.backgroundColor = "#3f3f3f"; }, {passive: true});
// 	}

// 	const keyHistoric = document.getElementsByClassName("buttons");

// 	for (let button of keyHistoric )
// 	{
// 		button.addEventListener("touchstart", ()=>{
// 		button.style.color           = "#606e5f";
// 		button.style.backgroundColor = "#333333";
// 		}, {passive: true});

// 		button.addEventListener("touchend", ()=>{
// 		button.style.color           = "#333333";
// 		button.style.backgroundColor = "#606e5f";
// 		}, {passive: true});
// 	}		
// }touchButton();

const bracketValid = (str) =>  // Check brackets
{
	let countL    = 0;
	let countR    = 0;
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
			spanR.textContent =`=> Syntax Error: Missing ")"`;
			break;
		case (countL<countR):
			spanR.textContent =`=> Syntax Error: Missing "("`;
			break;
		default:
			return true;
	}
};


const sizeNumValid = (str) => //check max size number > 16
{
	const regex = /(^|[^\d\.])(\d{17,})/g;

	if (regex.test(str))
	{
		spanR.textContent = "=>Syntax Error: Number digits > 16";
		return false;
	}

	else return true;

};

const regexAll = (str) =>
{
	const regexRoot 	   = /√\((.+)\)/g; 
	const regexFactor      = /(\d[\.\d]*)\(/g;
	const regexSquare1     = /(\d+)²/g; 
	const regexSquare2     = /(\(.+\))²/g; 
	const regexInverse     = /⅟\((.+)\)/g; 
	const regexPi          = /π/g;
	const regexFirstZero   = /(^|[^\d.])0+\B/g;
	const regexPercent     = /%/g;


	str = str.replace(regexFirstZero, "$1"		     ); 
	str = str.replace(regexFactor   , "$1*("         );
	str = str.replace(regexPi       , `(${Math.PI})` );
	str = str.replace(regexSquare1  , "($1**2)"      );
	str = str.replace(regexSquare2  , "($1**2)"      );
	str = str.replace(regexInverse  , "1/($1)"       );
	str = str.replace(regexRoot     , "Math.sqrt($1)");
	str = str.replace(regexPercent  , "*0.01*"       );

	console.log(`str after regexAll = ${str}`);

	return str;
}

function spaceThousand(number) // thousand separator + decimal fix to 10
{
	if(number < Number.MAX_SAFE_INTEGER) //control display number too big to scientist display
	{	
		let regexDot = /,/g;

		number = new Intl.NumberFormat("fr-FR",{maximumFractionDigits: 10}).format(number);
		number = number.replace(regexDot,".");
	}

	else number = Number(number).toPrecision(10);

	return number;
}


//*************Service Worker ******************/
// Register service worker to control making site work offline
if('serviceWorker' in navigator)
{
	navigator.serviceWorker
			 .register('/Calculator-V2/sw.js', {scope: '/Calculator-V2/'})
			 .then(function() { console.log('Service Worker Calculator-V2 Registered'); });
}

/************Permettre le 100vh sur mobile */
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.onresize = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight*0.01}px`);

};







































