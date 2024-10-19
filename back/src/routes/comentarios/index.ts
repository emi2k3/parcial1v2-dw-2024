import { FastifyPluginAsync } from "fastify";
import { ComentarioSchema } from "../../types/comentarios.js";
import { IdTema } from "../../types/tema.js";
import * as comentarioservice from "../../services/comentarios.js";
const comentariosRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/:id_tema", {
    onRequest: [fastify.verifyJWT],
    handler: async function (request, reply) {
      const { id_tema } = request.params as IdTema;
      return comentarioservice.findAll(id_tema);
    },
  });

  fastify.post("/", {
    schema: {
      body: ComentarioSchema,
    },
    onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
    handler: async function (request, reply) {
      const nuevocomentario = request.body as ComentarioSchema;
      reply.code(201);
      return comentarioservice.create(
        nuevocomentario.id_tema,
        nuevocomentario.id_usuario,
        nuevocomentario.descripcion
      );
    },
  });
  fastify.delete("/:idtema/:idcomentario", {
    onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
    handler: async function (request, reply) {
      const idtema = (request.params as { idtema: number }).idtema;
      const idcomentario = (request.params as { idcomentario: number })
        .idcomentario;
      reply.code(204);
      return comentarioservice.erase(idtema, idcomentario);
    },
  });
  fastify.put("/:id", {
    schema: {
      body: ComentarioSchema,
    },
    onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
    handler: async function (request, reply) {
      const comentario = request.body as ComentarioSchema;
      const id = (request.params as { id: number }).id;
      return comentarioservice.modify(
        comentario.id_tema,
        id,
        comentario.descripcion
      );
    },
  });
};
export default comentariosRoutes;
