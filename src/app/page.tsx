import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import "./page.css"

export default function Home() {
  return (
    <main className="landing-page">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <Card className="max-w-4xl w-full">
          <CardContent className="p-6 md:p-10">
            <div className="space-y-8 text-center">
              <h1 className="text-3xl md:text-5xl font-bold">
                 CURSO DE COMO : passar no teste técnico da Inove Corp
              </h1>
              
              <div className="product-image-container">
                <Image 
                  src="/ChatGPT Image 23 de abr. de 2025, 19_31_39.png" 
                  alt="Imagem do ChatGPT" 
                  width={600} 
                  height={400}
                  className="mx-auto rounded-lg shadow-lg"
                  priority
                />
              </div>

              <div className="features space-y-4">
                <h2 className="text-2xl font-semibold">O que você vai aprender:</h2>
                <ul className="flex flex-col md:flex-row gap-4 justify-center">
                  <li className="feature-item">
                    <span className="feature-icon">🚀</span>
                    <span>Estratégias avançadas de como passar no teste tecnico.</span>
                  </li>
                  <li className="feature-item">
                    <span className="feature-icon">📊</span>
                    <span>Análise de requisitos do profissional</span>
                  </li>
                  <li className="feature-item">
                    <span className="feature-icon">💰</span>
                    <span> Como ter um bom salario</span>
                  </li>
                </ul>
              </div>
              
              <div className="cta-section">
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Oferta por tempo limitado!
                </h3>
                <p className="text-lg mb-6">
                  <span className="line-through text-muted-foreground">R$ 1000000000,00</span>{" "}
                  <span className="font-bold text-2xl text-green-600">R$ 00,01</span>
                </p>
                <Link href="/comprar?token=abc123" passHref>
                  <Button size="lg" className="buy-button">
                    COMPRAR AGORA
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
