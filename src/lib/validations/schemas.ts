import z from "zod";

// Schemas
export const InfoFormDataSchema = z.object({
  ocoId: z.number().min(1, "ID da ocorrência é obrigatório"),
  informacao: z
    .string()
    .min(10, "Informação deve ter pelo menos 10 caracteres")
    .max(2000, "Informação deve ter no máximo 2000 caracteres"),
  data: z.string().min(1, "Data é obrigatória"),
  files: z.any().optional(),
});
