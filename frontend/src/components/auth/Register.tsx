import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { formSchema } from "@/lib/zod";
import { useContext, useState } from "react";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";

// 1. Importações do React Router no lugar do Next.js
import { useNavigate, Link } from "react-router-dom";
import { username } from "better-auth/plugins";
import { AuthContext } from "@/context/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

export function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {isAuth , setLogin} = useContext(AuthContext);
  // 2. Instanciando o hook de navegação do React Router
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, password: values.senha , username: values.nome}),
      });

      const data = await res.json().catch(() => ({}));
      setLoading(false);

      if (!res.ok) {
        console.log("Login error:", data);
        return { ok: false, data };
      }
      
      setLogin(true);
      console.log("Login success:", data);
       navigate("/")
      return { ok: true, data };
    } catch (error) {
      setLoading(false);
      console.log(error);
      return { ok: false, error };
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Criar conta</CardTitle>
        <CardDescription>
          Insira um e-mail e senha abaixo para registrar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@test.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder=""
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        variant="link"
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeOff className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                "Cadastrar"
              )}
            </Button>
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              {/* 4. Link do react-router-dom usa a propriedade 'to' */}
              <Link to="/login" className="underline underline-offset-4">
                Acessar conta
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4">
        <div className="flex items-center w-full gap-2">
          <hr className="flex-grow h-px bg-gray-200 dark:bg-gray-700 border-0" />
          <span className="text-gray-900 dark:text-gray-100 text-sm">OU</span>
          <hr className="flex-grow h-px bg-gray-200 dark:bg-gray-700 border-0" />
        </div>
        {/* <GoogleButton /> */}
      </CardFooter>
    </Card>
  );
}