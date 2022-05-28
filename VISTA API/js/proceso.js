
function login() {
  let usuario, contraseña;
  usuario = document.getElementById("txtusuario").value;
  contraseña = document.getElementById("txtpassword").value;

  if (usuario == "" || contraseña == "") {
    alert("ERROR, VERIFIQUE LOS DATOS INGRESADOS");
  } else {
    let data = {
      usuario: usuario,
      contraseña: contraseña,
    };
    axios
      .post("http://127.0.0.1:3000/ingresar", data)
      .then(function (response) {
        console.log(response);
        if (response) {
          window.open("html/crud.html");
          window.close();
          document.getElementById("txtusuario").reset();
          document.getElementById("txtpassword").reset();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}









document.querySelector("#mostrar").addEventListener("click", consultaVentas);

function consultaVentas() {
  axios
    .get("http://127.0.0.1:5000/listarventas")
    .then(function (response) {
      // alert(response.data[0].Nombre);
      console.log(response);
      let datos = response.data;
      let table = document.querySelector("#table");
      table.innerHTML = "";
      for (let item of datos) {
        table.innerHTML += `
        <tr>
                            <td>${item.Nombres}</td>
                            <td>${item.Dni}</td>
                            <td>${item.Serie}</td>
                            <td>${item.Numero}</td>
                            <td>${item.VentaTotal}</td>
                            <td>${item.SubTotal}</td>
                            <td>${item.Total}</td>
                            <td>${item.Fecha}</td>
                            
                        </tr>`;
      }

      // console.log(response.data[0]);
      //  document.getElementById("res").innerHTML = response.data[0].Nombre;
    })
    .catch(function (error) {
      console.log(error);
    });
}












document.querySelector("#mostrarleft").addEventListener("click", consultaVentasss);

function consultaVentasss() {
  axios
    .get("http://127.0.0.1:5000/consultaleftventas")
    .then(function (response) {
      // alert(response.data[0].Nombre);
      console.log(response);
      let datos = response.data;
      let table = document.querySelector("#tableleft");
      table.innerHTML = "";
      for (let item of datos) {
        table.innerHTML += `
        <tr>
                            <td>${item.Nombres}</td>
                            <td>${item.Dni}</td>
                            <td>${item.Serie}</td>
                            <td>${item.Numero}</td>
                            <td>${item.VentaTotal}</td>
                            <td>${item.SubTotal}</td>
                            <td>${item.Total}</td>
                            <td>${item.Fecha}</td>
                            
                        </tr>`;
      }

      // console.log(response.data[0]);
      //  document.getElementById("res").innerHTML = response.data[0].Nombre;
    })
    .catch(function (error) {
      console.log(error);
    });
}


























// document.querySelector("#mostrarleft").addEventListener("click", crudleft);

// function crudleft() {
//   axios
//     .get("http://127.0.0.1:5000/consultaleftventas")
//     .then(function (response) {
//       // alert(response.data[0].Nombre);
//       console.log(response);
//       let datos = response.data;
//       let table = document.querySelector("#tableleft");
//       table.innerHTML = "";
//       for (let item of datos) {
//         table.innerHTML += `
//         <tr>
//                             <td>${item.Nombres}</td>
//                             <td>${item.Dni}</td>
//                             <td>${item.Serie}</td>
//                             <td>${item.Numero}</td>
//                             <td>${item.VentaTotal}</td>
//                             <td>${item.SubTotal}</td>
//                             <td>${item.Total}</td>
//                             <td>${item.Fecha}</td>
                            
//                         </tr>`;
//       }

//       // console.log(response.data[0]);
//       //  document.getElementById("res").innerHTML = response.data[0].Nombre;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }



document.querySelector("#max").addEventListener("click", consultamax);

function consultamax() {
  axios
    .get("http://127.0.0.1:5000/consultaMAXventas")
    .then(function (response) {
      // alert(response.data[0].Nombre);
      console.log(response);
      let datos = response.data;
      let table = document.querySelector("#table20");
      table.innerHTML = "";
      for (let item of datos) {
        table.innerHTML += `
        <tr>
                            <td>${item.max_total}</td>
                           
                            
                        </tr>`;
      }

      // console.log(response.data[0]);
      //  document.getElementById("res").innerHTML = response.data[0].Nombre;
    })
    .catch(function (error) {
      console.log(error);
    });
}



document.querySelector("#min").addEventListener("click", consultamin);

function consultamin() {
  axios
    .get("http://127.0.0.1:5000/consultaMINventas")
    .then(function (response) {
      // alert(response.data[0].Nombre);
      console.log(response);
      let datos = response.data;
      let table = document.querySelector("#tablemin");
      table.innerHTML = "";
      for (let item of datos) {
        table.innerHTML += `
        <tr>
                            <td>${item.min_total}</td>
                           
                            
                        </tr>`;
      }

      // console.log(response.data[0]);
      //  document.getElementById("res").innerHTML = response.data[0].Nombre;
    })
    .catch(function (error) {
      console.log(error);
    });
}




document.querySelector("#COUNT").addEventListener("click", consultaCOUNT);

function consultaCOUNT() {
  axios
    .get("http://127.0.0.1:5000/consultaCOUNTventas")
    .then(function (response) {
      // alert(response.data[0].Nombre);
      console.log(response);
      let datos = response.data;
      let table = document.querySelector("#tableCOUNT");
      table.innerHTML = "";
      for (let item of datos) {
        table.innerHTML += `
        <tr>
                            <td>${item.count}</td>
                           
                            
                        </tr>`;
      }

      // console.log(response.data[0]);
      //  document.getElementById("res").innerHTML = response.data[0].Nombre;
    })
    .catch(function (error) {
      console.log(error);
    });
}












document.querySelector("#sum").addEventListener("click", consultasum);

function consultasum() {
  axios
    .get("http://127.0.0.1:5000/consultaSUMventas")
    .then(function (response) {
      // alert(response.data[0].Nombre);
      console.log(response);
      let datos = response.data;
      let table = document.querySelector("#tablesum");
      table.innerHTML = "";
      for (let item of datos) {
        table.innerHTML += `
        <tr>
                            <td>${item.sum_ventatotal}</td>
                           
                            
                        </tr>`;
      }

      // console.log(response.data[0]);
      //  document.getElementById("res").innerHTML = response.data[0].Nombre;
    })
    .catch(function (error) {
      console.log(error);
    });
}




document.querySelector("#ORDER").addEventListener("click", consultaORDERBY);

function consultaORDERBY() {
  axios
    .get("http://127.0.0.1:5000/consultaORDERBYventas")
    .then(function (response) {
      // alert(response.data[0].Nombre);
      console.log(response);
      let datos = response.data;
      let table = document.querySelector("#tableY");
      table.innerHTML = "";
      for (let item of datos) {
        table.innerHTML += `
        <tr>
                            <td>${item.IdVenta}</td>
                            <td>${item.Serie}</td>
                            <td>${item.Numero}</td>
                            <td>${item.VentaTotal}</td>
                            <td>${item.SubTotal}</td>
                            <td>${item.Total}</td>
                            <td>${item.idCliente}</td>
                            <td>${item.idEmpleado}</td>
                            <td>${item.Fecha}</td>
                            
                        </tr>`;
      }

      // console.log(response.data[0]);
      //  document.getElementById("res").innerHTML = response.data[0].Nombre;
    })
    .catch(function (error) {
      console.log(error);
    });
}



document.querySelector("#AV").addEventListener("click", consultaAV);

function consultaAV() {
  axios
    .get("http://127.0.0.1:5000/consultaAVGventas")
    .then(function (response) {
      // alert(response.data[0].Nombre);
      console.log(response);
      let datos = response.data;
      let table = document.querySelector("#tableAV");
      table.innerHTML = "";
      for (let item of datos) {
        table.innerHTML += `
        <tr>
                            <td>${item.avg_total}</td>
                           
                            
                        </tr>`;
      }

      // console.log(response.data[0]);
      //  document.getElementById("res").innerHTML = response.data[0].Nombre;
    })
    .catch(function (error) {
      console.log(error);
    });
}


















///////////////////funcion para la ruta de buscar por id
function parametroventas()
{
   id = document.getElementById("Idventa").value;
   axios.get('http://127.0.0.1:5000/listarventas/' + id)
     .then(function (response) {
      console.log(response);
      console.log(response.data[0].Nombres);
      //alert(response.data[2].nombre_evento);
     })
     .catch(function (error) {
      console.log(error);
    });
}



///////////////////funcion para la ruta para insertar
function addventas()
{
  Serie = document.getElementById("Serie").value;
  Numero = document.getElementById("Numero").value;
  VentaTotal = document.getElementById("VentaTotal").value;
  SubTotal = document.getElementById("SubTotal").value;
  Total = document.getElementById("Total").value;
  idCliente = document.getElementById("idCliente").value;
  idEmpleado = document.getElementById("idEmpleado").value;
  Fecha = document.getElementById("Fecha").value;
  
  const nuevaventa={
    Serie: Serie,
    Numero: Numero, 
    VentaTotal: VentaTotal,
    SubTotal: SubTotal,
    Total:   Total,
    idCliente:   idCliente,
    idEmpleado:   idEmpleado,
    Fecha:   Fecha

}

axios ({
    method: 'POST',
    url: 'http://127.0.0.1:5000/insertVenta',
    data: nuevaventa,
}).then(res => console.log(res), alert("ventas agregado."))
.catch(err => console.log('Error: ', err))
}




///////////////////funcion para actualizar
function actualizarventa()
{
  Id = document.getElementById("IdVenta").value;
  Serie = document.getElementById("Serie").value;
  Numero = document.getElementById("Numero").value;
  VentaTotal = document.getElementById("VentaTotal").value;
  SubTotal = document.getElementById("SubTotal").value;
  Total = document.getElementById("Total").value;
  idCliente = document.getElementById("idCliente").value;
  idEmpleado = document.getElementById("idEmpleado").value;
  Fecha = document.getElementById("Fecha").value;
  
  
  const actualizarventas={
    Serie: Serie,
    Numero: Numero, 
    VentaTotal: VentaTotal,
    SubTotal: SubTotal,
    Total:   Total,
    idCliente:   idCliente,
    idEmpleado:   idEmpleado,
    Fecha:   Fecha,
};

axios ({
    method: 'PUT',
    url: 'http://127.0.0.1:5000/actualizarventas/'+Id,
    data: actualizarventas,
}).then(res => console.log(res), alert("Contacto actualizado."))
.catch(err => console.log('Error: ', err))
}





///////////////////funcion para eliminar
function deleteventas()
{

  id = document.getElementById("IdVenta").value;
  
    axios.delete('http://127.0.0.1:5000/deleteventas/' + id )
    .then(res => {
        console.log(res.data)
       
            alert("venta eliminada.")

        

    })
    .catch(err => console.log('Error: ', err))
}





function Login() {
  alert("Lo siento por el momento no puede iniciar seccion... :(");
}


function login() {
  let usuario, contraseña;
  usuario = document.getElementById("txtusuario").value;
  contraseña = document.getElementById("txtpassword").value;

  if (usuario == "" || contraseña == "") {
    alert("ERROR, VERIFIQUE LOS DATOS INGRESADOS");
  } else {
    let data = {
      usuario: usuario,
      contraseña: contraseña,
    };
    axios
      .post("http://127.0.0.1:3000/ingresar", data)
      .then(function (response) {
        console.log(response);
        if (response) {
          window.open("html/crud.html");
          window.close();
          document.getElementById("txtusuario").reset();
          document.getElementById("txtpassword").reset();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
