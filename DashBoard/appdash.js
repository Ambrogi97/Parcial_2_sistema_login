window.addEventListener("load", async () => {
    const botonLogout = document.getElementById("logout");
    const main = document.querySelector("main");
  
    let usuariologeado = localStorage.getItem("usuariologeado");
    if (typeof usuariologeado === "undefined") {
      localStorage.getItem("usuariologeado");
      usuariologeado = null;
    }
  
    if (usuariologeado) {
      const data = await cargarDatos();
      const tabla = generarTabla(data);
      main.insertAdjacentElement("afterbegin", tabla);
    } else {
      window.location.href = "../login/index.html";
    }
  
    botonLogout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuariologeado");
      window.location.href = "../login/index.html";
    });
  });
  
  async function cargarDatos() {
    const response = await fetch("https://basic-server-one.vercel.app/users");
  
    const data = await response.json();
    return data.data;
  }
  
  const generarTabla = (datos) => {
    const tabla = document.createElement("table");
    tabla.innerHTML = `<thead>
          <tr>
          <td>ID</td>
          <td>Username</td>
          <td>Nombre</td>
          <td>Correo</td>
          <td>Telefono</td>
          <td>Website</td>
          </tr>
      </thead>`;
  
    datos.forEach((user) => {
      const fila = `<tr>
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.website}</td>
      </tr>`;
      tabla.insertAdjacentHTML("beforeend", fila);
    });
  
    return tabla;
  };
  