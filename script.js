const url = 'https://currencyapi.net/api/v1/rates?key=GwwMzIDfw3chns0iYG79EjoWUyCAonZryoYV&output=json'
//publico: B6yk538Jg3Vs8CJXnVQOd7BoFFV8W7Yp4WOi
//mio: GwwMzIDfw3chns0iYG79EjoWUyCAonZryoYV
const input = document.querySelector("input");
const moneda = document.getElementsByTagName("select");
const resultado = document.getElementsByTagName("span");
const lista = document.getElementsByTagName("li");
const botonCrear = document.getElementsByTagName("button");
var i = 0;

input.addEventListener("input", convertirTodo);
moneda[i].addEventListener("input", convertirUno);
botonCrear[i].addEventListener("click",crearModulo);

function crearModulo() {
  var li = document.createElement("li");
	li.innerHTML = lista[0].innerHTML;
	document.querySelector("ul").appendChild(li);
  i++;
  moneda[i].addEventListener("input", convertirUno);
  botonCrear[i].addEventListener("click",crearModulo);
  resultado[i].textContent = "";
}

async function convertirUno() {
  try {
    let { valid, updated, rates } = await fetch(url).then(response => response.json());
    this.parentElement.children[2].textContent = convertir(this.value, rates);
  } catch (error) {
    this.parentElement.children[2].textContent = "Sin acceso a base de datos de tasas";
  }
}

async function convertirTodo() {
  try {
    let { valid, updated, rates } = await fetch(url).then(response => response.json());
    for (var j = 0 ; j <= i; j++) {
     resultado[j].textContent = convertir(moneda[j].value, rates);
    }
  } catch (error) {
    for (var j = 0 ; j <= i; j++) {
      resultado[j].textContent = "Sin acceso a base de datos de tasas";
    }
  }
}

const convertir = function(currency, rts) {
  //if (valid) {
    let { ARS, AUD, BTC, CAD, CLP, CHF, CNY, COP, EUR, GBP, JPY, MXN, PEN, ...rest} = rts;
  //} else {
  //  throw Error;
  //}
  let result = "";
  switch (currency) {
    case "blank":
      result = input.value + " Dolares Americanos";
      break;
    case "EUR":
      result = porTasa(EUR) + " Euros";
      break;
    case "CAD":
      result = porTasa(CAD) + " Dolares Canadienses";
      break;
    case "GBP":
      result = porTasa(GBP) + " Libras Esterlinas";
      break;
    case "COP":
      result = porTasa(COP) + " Pesos Colombianos";
      break;
    case "MXN":
      result = porTasa(MXN) + " Pesos Mexicanos";
      break;
    case "PEN":
      result = porTasa(PEN) + " Soles Peruanos";
      break;
    case "CLP":
      result = porTasa(CLP) + " Pesos Chilenos";
      break;
    case "ARS":
      result = porTasa(ARS) + " Pesos Argentinos";
      break;
    case "AUD":
      result = porTasa(AUD) + " Dolares Australianos";
      break;
    case "BTC":
      result = porTasa(BTC) + " Bitcoins";
      break;
    case "CNY":
      result = porTasa(CNY) + " Yuanes Chinos";
      break;
    case "JPY":
      result = porTasa(JPY) + " Yenes Japoneses";
      break;
    case "CHF":
      result = porTasa(CHF) + " Francos Suizos";
      break;
    default:
      result = "Error";
  }
  return result;
}

const porTasa = function(tasa) {
  return input.value * tasa;
}
