const email = document.getElementById("email");
const password = document.getElementById("pass");
const form = document.getElementById("form-login");
const parrafo = document.getElementById("mensajeError");

window.addEventListener("load", () => {
  let sesion = localStorage.getItem("userLoggedIn");
  if (!sesion || sesion == undefined) {
    localStorage.removeItem("userLoggedIn");
  } else {
    window.location.href = "../DashBoard/dash.html";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let mensaje = "";
  let condicion = false;
  let validaremail =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (!validaremail.test(email.value) ) {
    mensaje += `el correo  o la contraseña no son validos <br>`;
    condicion = true;
  } else {
    try {
      const data = await iniciarSesion();
      if (!data.error) {
        localStorage.setItem("userLoggedIn", true);
        window.location.href = "../DashBoard/dash.html";
      } else {
        parrafo.innerHTML = data.mensaje;
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (condicion) {
    parrafo.innerHTML = mensaje;
  }
});

async function iniciarSesion() {
  const response = await fetch("https://basic-server-one.vercel.app/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  const data = await response.json();
  return data;
}
