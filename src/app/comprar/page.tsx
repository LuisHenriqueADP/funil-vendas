"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "../comprar/comprar.css";

const VALID_TOKEN = "abc123";

export default function ComprarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    
    if (token === VALID_TOKEN) {
      setIsValid(true);
      // Armazenar token no localStorage para acesso por 24h
      localStorage.setItem("productAccessToken", VALID_TOKEN);
      localStorage.setItem("tokenExpiry", String(Date.now() + 24 * 60 * 60 * 1000));
      
      // Redirecionar para a página de acesso após validação
      setTimeout(() => {
        router.push("/acesso");
      }, 2000);
    } else {
      setIsValid(false);
    }
    
    setIsValidating(false);
  }, [searchParams, router]);

  if (isValidating) {
    return (
      <div className="validate-container">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Validando...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="spinner"></div>
              <p className="mt-4">Verificando seu acesso, aguarde um momento...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="validate-container">
        <Card className="w-full max-w-md invalid-access">
          <CardHeader>
            <CardTitle className="text-center">Acesso Negado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="mb-4">O token de acesso é inválido ou expirou.</p>
              <Link href="/" passHref>
                <Button variant="outline">Voltar para Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="validate-container">
      <Card className="w-full max-w-md valid-access">
        <CardHeader>
          <CardTitle className="text-center">Acesso Confirmado!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="mb-4">Parabéns! Você está sendo redirecionado para o seu produto...</p>
            <div className="spinner success-spinner"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 