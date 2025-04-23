"use client";

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import "../comprar/comprar.css"

const VALID_TOKEN = "abc123";

function ComprarPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const token = searchParams.get("token");
      
      if (token === VALID_TOKEN) {
        setIsValid(true);
        try {
          localStorage.setItem("productAccessToken", VALID_TOKEN);
          localStorage.setItem("tokenExpiry", String(Date.now() + 24 * 60 * 60 * 1000));
        } catch (e) {
          console.error("Erro ao acessar localStorage:", e);
        }
        
        setTimeout(() => {
          router.push("/acesso");
        }, 2000);
      } else {
        setIsValid(false);
      }
      
      setIsValidating(false);
    }
  }, [isClient, searchParams, router]);

  if (!isClient || isValidating) {
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

export default function ComprarPage() {
  return (
    <Suspense fallback={
      <div className="validate-container">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Carregando...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="spinner"></div>
              <p className="mt-4">Carregando, aguarde um momento...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <ComprarPageContent />
    </Suspense>
  );
} 