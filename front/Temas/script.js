const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../Login/index.html";
}
fetchGET();
async function fetchGET() {
  try {
    response = await fetch(`http://localhost/back/temas/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("No funciona");
    }
    data = await response.json();
    data.forEach((tema) => {
      const añadirahtml = `
      <tr>
      <td>${tema.titulo}</td>
      <td>${tema.descripcion}</td>
      <td>${tema.creador}</td>
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
        window.location.href = `../Comentarios/index.html?idtema=${vercomentario}`;
      });
    }
  } catch (error) {
    console.log(error);
  }
}
