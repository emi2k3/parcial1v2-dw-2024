const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "./Login/index.html";
}
const idtoken = JSON.parse(atob(token.split(".")[1]));

fetchGET();
async function fetchGET() {
  try {
    response = await fetch(
      `http://localhost/back/usuarios/${idtoken.id_usuario}/temas/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("No funciona");
    }
    data = await response.json();
    data.forEach((tema) => {
      const añadirahtml = `
      <tr>
      <td>${tema.titulo}</td>
      <td>${tema.descripcion}</td>
      <td>
        <button class="comentariobtn" data-idtema="${tema.id_tema}">Ver comentarios</button>
      </td>
      </tr>`;
      document
        .querySelector("tbody")
        .insertAdjacentHTML("beforeend", añadirahtml);
    });
    const botones = document.querySelectorAll(".comentariobtn");
    for (const boton of botones) {
      boton.addEventListener("click", function () {
        const vercomentario = this.getAttribute("data-idtema");
        window.location.href = `./Comentarios/index.html?idtema=${vercomentario}`;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("cerrarsesion").addEventListener("click", function () {
  localStorage.removeItem("token");
  location.reload();
});
document
  .getElementById("conseguirtemas")
  .addEventListener("click", function () {
    const vercomentario = this.getAttribute("data-idtema");
    window.location.href = `./Temas/index.html`;
  });
