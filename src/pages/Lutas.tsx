
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users } from "lucide-react";

interface LutaItem {
  id: number;
  titulo: string;
  descricao: string;
  dataHora: string;
  local: string;
  imagem?: string;
}

const LUTAS_MOCK: LutaItem[] = [
  {
    id: 1,
    titulo: "Luta contra a fome",
    descricao: "Arrecadação de alimentos para famílias em vulnerabilidade social",
    dataHora: "15/06/2025 - 10:00",
    local: "Praça Central",
    imagem: "/placeholder.svg"
  },
  {
    id: 2,
    titulo: "Mobilização por direitos",
    descricao: "Reunião para discutir novos projetos sociais e estratégias de inclusão",
    dataHora: "22/06/2025 - 14:00",
    local: "Sede da ONG",
    imagem: "/placeholder.svg"
  },
  {
    id: 3,
    titulo: "Projeto Educação para Todos",
    descricao: "Mutirão de assistência educacional para crianças e adolescentes",
    dataHora: "01/07/2025 - 09:00",
    local: "Escola Municipal Central",
    imagem: "/placeholder.svg"
  }
];

const Lutas = () => {
  const [lutas] = useState<LutaItem[]>(LUTAS_MOCK);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lutas Sociais</h1>
            <p className="text-muted-foreground">
              Conheça e participe das nossas mobilizações e projetos sociais
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lutas.map((luta) => (
            <Card key={luta.id} className="overflow-hidden">
              {luta.imagem && (
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={luta.imagem} 
                    alt={luta.titulo} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  {luta.titulo}
                </CardTitle>
                <CardDescription>{luta.descricao}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 text-sm">
                  <div><strong>Data e Hora:</strong> {luta.dataHora}</div>
                  <div><strong>Local:</strong> {luta.local}</div>
                  <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Participe desta mobilização</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Lutas;
