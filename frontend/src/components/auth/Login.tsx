import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { useState } from "react";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const loginSchema = formSchema.pick({
  email: true,
  senha: true,
});

export function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Envia dados de registro para o backend
  async function onSubmit(values: { nome: string; email: string; senha: string }) {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, password: values.senha }),
      });

      const data = await res.json().catch(() => ({}));
      setLoading(false);

      if (!res.ok) {
        console.log("Error:", data);
        return { ok: false, data };
      }
      navigate("/dashboard");

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
        <CardTitle className="text-2xl">Acessar conta</CardTitle>
        <CardDescription>
          Insira seu e-mail e senha abaixo para acessar a conta.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center"
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
                "Acessar"
              )}
            </Button>

            <div className="text-center text-sm">
              Ainda não tem uma conta?{" "}
              <Link
                to="/register"
                className="underline underline-offset-4"
              >
                Criar conta
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-4">
        <div className="flex items-center w-full gap-2">
          <hr className="flex-grow h-px bg-gray-200 dark:bg-gray-700 border-0" />
          <span className="text-gray-900 dark:text-gray-100 text-sm">
            OU
          </span>
          <hr className="flex-grow h-px bg-gray-200 dark:bg-gray-700 border-0" />
        </div>
      </CardFooter>
    </Card>
  );
}