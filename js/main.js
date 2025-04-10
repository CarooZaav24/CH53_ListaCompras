let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");
let tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);


const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

let cont = 0; //Numeración de la primera columna de la tabla.

let costoTotal = 0;
let totalEnProductos = 0;
let datos = []; //almacena los elementos de la tabla (productos)
let btnClear = document.getElementById("btnClear");

function validarCantidad() {
  if (txtNumber.value.trim().length <= 0) {
    return false;
  } //length<=0 , aquí comprobamos que lo que se ingrese en el campo de la cantidad debe ser de una longitud mayor a cero, es decir, que el campo NO esté vacío, que tenga cierta LONGITUD.

  if (isNaN(txtNumber.value)) {
    return false;
  } //isNaN, aquí comprobamos que si no se ingresa un número en el campo de la cantidad no lo acepte.  //número

  if (Number(txtNumber.value) <= 0) {
    return false;
  } //mayor que cero, aquí comprobamos que lo que se ingrese en el campo sea de una cantidad mayor que cero. el NÚMERO seea mayor que cero.

  return true;
} //validar cantidad

function getPrecio() {
  return Math.round(Math.random() * 10000) / 100;
} //getPrecio, aquí hacemos el siguiente paso de las indicaciones de la actividad en donde le tenemos que asignar un precio aleatorio a cada producto.

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  //la variable isValid es como una bandera que al ser true permite agregar los datos a la tabla.
  let isValid = true;

  txtName.style.border = "";
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  txtNumber.style.border = "";

  txtName.value = txtName.value.trim(); //Con trim le quitamos los espacios en blanco al principio y al final a cada valor que entra en el input
  txtNumber.value = txtNumber.value.trim();

  //Después de esto tendría que validar que el nombe tenga como mínimo 3 letras:
  if (txtName.value.length < 3) {
    txtName.style.border = "solid medium red";
    alertValidacionesTexto.innerHTML =
      "<strong>El Nombre del producto no es correcto</strong>";
    alertValidaciones.style.display = "block";
    isValid = false;
  } //length>=3

  if (!validarCantidad()) {
    txtNumber.style.border = "solid medium red";
    alertValidacionesTexto.innerHTML +=
      "<strong>La cantidad no es correcta.</strong>";
    alertValidaciones.style.display = "block";
    isValid = false;
  } //Validar cantidad

  if (isValid) {
    //si pasó las validaciones
    cont++;
    let precio = getPrecio();
    let row = `<tr>
                   <td>${cont}</td>
                   <td>${txtName.value}</td>
                   <td>${txtNumber.value}</td>
                   <td>${precio}</td>
                   </tr>`;

    let elemento = {
      cont: cont,
      nombre: txtName.value,
      cantidad: txtNumber.value,
      precio: precio,
    };
    datos.push(elemento);
    localStorage.setItem("datos", JSON.stringify(datos));

    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    costoTotal += precio * Number(txtNumber.value);
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;

    contadorProductos.innerText = cont;
    let resumen = {
      cont: cont,
      totalEnProductos: totalEnProductos,
      costoTotal: costoTotal,
    };
    localStorage.setItem("resumen", JSON.stringify(resumen));

    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();
  } //si se cumplieron todas las condiciones y es válido (isValid).
}); //btnAgregar

window.addEventListener("load", function (event) {
  event.preventDefault();
  if (this.localStorage.getItem("datos") != null) {
    datos = JSON.parse(this.localStorage.getItem("datos"));
  } // datos != null

  datos.forEach((d) => {
    let row = `<tr>
                    <td>${d.cont}</td>
                    <td>${d.nombre}</td>
                    <td>${d.cantidad}</td>
                    <td>${d.precio}</td>
                </tr>`;
    cuerpoTabla.insertAdjacentHTML("beforeend", row);
  });

  if (this.localStorage.getItem("resumen") != null) {
    let resumen = JSON.parse(this.localStorage.getItem("resumen"));
    costoTotal = resumen.costoTotal;
    totalEnProductos = resumen.totalEnProductos;
    cont = resumen.cont;
  } // resumen != null

  precioTotal.innerText = "$ " + costoTotal.toFixed(2);
  productosTotal.innerText = totalEnProductos;
  contadorProductos.innerText = cont;
}); // window add event listener load

//Agregar la funcionalidad de limpiar todo 
//resumen 
//tabla 
//campos 
//alerta 
//localStorage
btnClear.addEventListener("click", function (event) {
    event.preventDefault();
  
    // Limpiar la tabla:
    cuerpoTabla.innerHTML = "";
  
    // Reiniciamos los valores de las variables: 
    cont = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    datos = [];
  
    
    txtName.value = "";//limpiar el campo del nombre 
    txtNumber.value = "";//limpiar el campo de la cant 
    txtName.style.border = ""; // le quitamos el estilo de borde al campo del nombre 
    txtNumber.style.border = ""; // le quitamos el estilo al campo de la cant
  
    //quitar las alertas
    alertValidaciones.style.display = "none";
    alertValidacionesTexto.innerHTML = "";
  
    //limpiar el localStorage
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");
  
    // Reiniciar resumen
    contadorProductos.innerText = "0";
    productosTotal.innerText = "0";
    precioTotal.innerText = "$0";
  });