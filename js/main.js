let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");

btnAgregar.addEventListener("click", function(event){
    txtName.value = txtName.value.trim();//Con trim le quitamos los espacios en blanco al principio y al final a cada valor que entra en el input 
    txtNumber.value = txtNumber.value.trim();

    //Después de esto tendría que validar que el nombe tenga como mínimo 3 letras: 
    if(txtName.value.length < 3){
    txtName.style.border="solid medium red";
    alertValidacionesTexto.innerHTML = "<strong>El Nombre del producto no es correcto</strong>";
    alertValidaciones.style.display= "block";

    }//length>=3


}); //btnAgregar