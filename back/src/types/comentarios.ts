import { Static, Type } from "@sinclair/typebox";

export const ComentarioSchema = Type.Object({
  id_tema: Type.Number({}),
  id_usuario: Type.Number({}),
  fecha_ingresado: Type.String({
    format: "date-time",
  }),
  descripcion: Type.String({
    minLength: 3,
    maxLength: 100,
  }),
});

export type ComentarioSchema = Static<typeof ComentarioSchema>;
