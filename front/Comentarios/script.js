const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../Login/index.html";
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
async function fetcheliminar(param) {
  try {
    response = await fetch(
      `http://localhost/back/comentarios/${idtema}/${param}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("No funciona");
    }
  } catch (error) {
    console.log(error);
  }
}
async function fetchGET() {
  try {
    response = await fetch(`http://localhost/back/comentarios/${idtema}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("No funciona");
    }
    data = await response.json();
    data.forEach((comentario) => {
      const añadirahtml = `
      <tr>
      <td>${comentario.fecha_ingresado}</td>
      <td>${comentario.descripcion}</td>
      <td>
      <button class="comentariobtn" data-idcomentario="${comentario.id_comentario}">Eliminar</button>
      </td>
      </tr>`;
      document
        .querySelector("tbody")
        .insertAdjacentHTML("beforeend", añadirahtml);
    });
    const botones = document.querySelectorAll(".comentariobtn");
    for (const boton of botones) {
      boton.addEventListener("click", function () {
        const borrarcomentario = this.getAttribute("data-idcomentario");
        fetcheliminar(borrarcomentario);
        location.reload();
      });
    }
  } catch (error) {
    console.log(error);
  }
}
fetchGET();

document.getElementById("cerrarsesion").addEventListener("click", function () {
  localStorage.removeItem("token");
  location.reload();
});

document
  .getElementById("postcomentario")
  .addEventListener("click", function () {
    window.location.href = `./Crear/?idtema=${idtema}`;
  });
