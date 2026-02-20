import { z } from "zod";

const formSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "Nome precisa ter no mínimo 2 caracteres" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  senha: z
    .string()
    .min(5, { message: "Senha precisa ter no mínimo 5 caracteres" }),
});

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
});

const changeEmailFormSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido" }),
});

const changePasswordFormSchema = z.object({
  senha: z
    .string()
    .min(5, { message: "Senha precisa ter no mínimo 5 caracteres" }),
  novaSenha: z
    .string()
    .min(5, { message: "A nova senha precisa ter no mínimo 5 caracteres" }),
});

export { formSchema, appearanceFormSchema, changeEmailFormSchema, changePasswordFormSchema };