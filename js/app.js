var calculadora = {
	
	displayCal: document.getElementById("display"),
	valordisplayCal: "0",
	Operation: "",
	oneValue: 0,
	twoValue: 0,
	lastValue: 0,
	result: 0,
	auxTeclaIgual: false,
	
	init: (function(){
		this.asignarEventDesignBotones(".tecla");
		this.asignarEventFunct();
	}),
		
	asignarEventDesignBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventPushBtn;
			x[i].onmouseleave = this.eventReleaseBtn;
		};
	},

	eventPushBtn: function(event){
		calculadora.PushBtn(event.target);
	},

	eventReleaseBtn: function(event){
		calculadora.ReleaseBtn(event.target);
	},
	
	PushBtn: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "20%";
		elemento.style.height = "62px";
		}
	},
	
	ReleaseBtn: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "30%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62px";
		}
	},

	asignarEventFunct: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.EntryNumber("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.EntryNumber("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.EntryNumber("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.EntryNumber("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.EntryNumber("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.EntryNumber("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.EntryNumber("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.EntryNumber("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.EntryNumber("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.EntryNumber("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.ErasedisplayCal();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.changeSign();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.addDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verresult();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.EntryOperat("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.EntryOperat("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.EntryOperat("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.EntryOperat("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.EntryOperat("+");});
	},
	
	ErasedisplayCal: function(){ 

	    this.valordisplayCal = "0";
		this.Operation = "";
		this.oneValue = 0;
		this.twoValue = 0;
		this.result = 0;
		this.auxTeclaIgual = false;
		this.lastValue = 0;
		this.updatedisplayCal();
	},
	
	changeSign: function(){
		if (this.valordisplayCal !="0") {
			var aux;
			if (this.valordisplayCal.charAt(0)=="-") {
				aux = this.valordisplayCal.slice(1);
			}	else {
				aux = "-" + this.valordisplayCal;
			}
		this.valordisplayCal = "";
		this.valordisplayCal = aux;
		this.updatedisplayCal();
		}
	},
	
	addDecimal: function(){
		if (this.valordisplayCal.indexOf(".")== -1) {
			if (this.valordisplayCal == ""){
				this.valordisplayCal = this.valordisplayCal + "0.";
			} else {
				this.valordisplayCal = this.valordisplayCal + ".";
			}
			this.updatedisplayCal();
		}
	},
	
	EntryNumber: function(valor){
		if (this.valordisplayCal.length < 8) {
		
			if (this.valordisplayCal=="0") {
				this.valordisplayCal = "";
				this.valordisplayCal = this.valordisplayCal + valor;
			} else {
				this.valordisplayCal = this.valordisplayCal + valor;
			}
		this.updatedisplayCal();
		}
	},
	
	EntryOperat: function(oper){
		this.oneValue = parseFloat(this.valordisplayCal);
		this.valordisplayCal = "";
		this.Operation = oper;
		this.auxTeclaIgual = false;
		this.updatedisplayCal();
	},
	
	verresult: function(){ 

		if(!this.auxTeclaIgual){ 
			this.twoValue = parseFloat(this.valordisplayCal);
			this.lastValue = this.twoValue;
			this.realizarOperation(this.oneValue, this.twoValue, this.Operation);
		
		} else { 
		this.realizarOperation(this.oneValue, this.lastValue, this.Operation);
		}
	
		this.oneValue = this.result;
	
		this.valordisplayCal = "";

		if (this.result.toString().length < 9){
			this.valordisplayCal = this.result.toString();
		} else {
			this.valordisplayCal = this.result.toString().slice(0,8) + "...";
		}

		this.auxTeclaIgual = true;		
		this.updatedisplayCal();
	
	},
	
	realizarOperation: function(oneValue, twoValue, Operation){
		switch(Operation){
			case "+": 
				this.result = eval(oneValue + twoValue);
			break;
			case "-": 
				this.result = eval(oneValue - twoValue);
			break;
			case "*": 
				this.result = eval(oneValue * twoValue);
			break;
			case "/": 
				this.result = eval(oneValue / twoValue);
			break;
			case "raiz":
				this.result = eval(Math.sqrt(oneValue));
		}
	},
	
	updatedisplayCal: function(){
		this.displayCal.innerHTML = this.valordisplayCal;
	}
	
};

calculadora.init();