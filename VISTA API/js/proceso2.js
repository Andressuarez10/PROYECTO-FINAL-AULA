document.querySelector("#mostrarid").addEventListener("click", consultaVenta);

function consultaVenta() {
  id = document.getElementById("IdVenta").value;
  axios
    .get("http://127.0.0.1:5000/listarventas/ "+ id)
    .then(function (response) {
      // alert(response.data[0].Nombre);
      console.log(response);
      let datos = response.data;
      let table = document.querySelector("#tableid");
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
