const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../../Login/index.html";
}
const idtoken = JSON.parse(atob(token.split(".")[1]));
function getparam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get(param);
  return myParam;
}
const idtema = getparam("idtema");
if (!idtema) {
  window.location.href = "../index.html";
}
const descInput = document.getElementById("descripcion");
class Comentario {
  constructor(descripcion, id_tema, id_usuario) {
    this.id_tema = id_tema;
    this.id_usuario = id_usuario;
    this.fecha_ingresado = new Date().toISOString();
    this.descripcion = descripcion;
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    if (descInput.value != "" && descInput.value.length <= 100) {
      const data = new Comentario(descInput.value, idtema, idtoken.id_usuario);
      console.log(JSON.stringify(data));
      await fetchdatos(data);
    } else {
      alert(
        "Su comentario no puede estar vacio o tener mas de 100 caracteres."
      );
    }
  });

async function fetchdatos(dataf) {
  try {
    response = await fetch("http://localhost/back/comentarios/", {
      method: "POST",
      body: JSON.stringify(dataf),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("No funciona");
    }
    window.location.href = `../index.html?idtema=${idtema}`;
  } catch (error) {
    console.log(error);
  }
}
