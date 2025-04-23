"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { useForm } from "react-hook-form"
import "./acesso.css"

const VALID_TOKEN = "abc123";

interface FormData {
  name: string;
  email: string;
}

export default function AcessoPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      email: ""
    }
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      checkAuthorization();
    }
  }, [isClient]);

  const checkAuthorization = () => {
    try {
      const storedToken = localStorage.getItem("productAccessToken");
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      
      const isValid = 
        storedToken === VALID_TOKEN && 
        tokenExpiry && 
        parseInt(tokenExpiry) > Date.now();
      
      setIsAuthorized(!!isValid);
      setIsLoading(false);
      
      if (!isValid) {
        router.push("/");
      }
    } catch (e) {
      console.error("Erro ao acessar localStorage:", e);
      setIsAuthorized(false);
      setIsLoading(false);
      router.push("/");
    }
  };

  const onSubmit = (data: FormData) => {
    // Simulação de envio para backend/Zapier
    console.log("Dados enviados:", data);
    setFormSubmitted(true);
    
    // Em uma aplicação real, aqui você enviaria os dados para seu backend ou Zapier
    // fetch('/api/submit-form', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("productAccessToken");
      localStorage.removeItem("tokenExpiry");
    } catch (e) {
      console.error("Erro ao acessar localStorage:", e);
    }
    router.push("/");
  };

  if (!isClient || isLoading) {
    return (
      <div className="access-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="access-container">
      <Card className="product-card">
        <CardHeader>
          <CardTitle>Curso Premium: Como passar no teste técnico da Inove Corp</CardTitle>
          <CardDescription>Seu acesso foi liberado com sucesso!</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="product-content">
            <h2 className="text-xl font-semibold mb-4">Material do Curso</h2>
            
            <div className="download-links">
              <div className="download-item">
                <div className="download-icon">📚</div>
                <div className="download-info">
                  <h3>Módulo 1: Introdução a historia da inove corp</h3>
                  <Link href="#" className="download-link">
                    Baixar Material (PDF)
                  </Link>
                </div>
              </div>
              
              <div className="download-item">
                <div className="download-icon">🎬</div>
                <div className="download-info">
                  <h3>Vídeo-aula: Programando pra entrar na inove corp</h3>
                  <Link href="#" className="download-link">
                    Assistir Agora
                  </Link>
                </div>
              </div>
              
              <div className="download-item">
                <div className="download-icon">📝</div>
                <div className="download-info">
                  <h3>Planilha para rotina de estudo</h3>
                  <Link href="#" className="download-link">
                    Baixar (Excel)
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {!formSubmitted ? (
            <div className="newsletter-form">
              <h2 className="text-xl font-semibold mb-4">Receba atualizações e bônus exclusivos</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" {...field} required />
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
                          <Input placeholder="seu-email@exemplo.com" type="email" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">Inscrever-se</Button>
                </form>
              </Form>
            </div>
          ) : (
            <div className="form-success">
              <h2 className="text-xl font-semibold mb-2">Inscrição realizada com sucesso!</h2>
              <p>Obrigado por se cadastrar. Em breve você receberá nossos conteúdos exclusivos.</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleLogout}>Sair</Button>
          <Link href="/" passHref>
            <Button variant="ghost">Voltar para Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 