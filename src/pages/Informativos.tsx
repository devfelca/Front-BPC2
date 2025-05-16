
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Informativo {
  id: string;
  titulo: string;
  data: string;
  conteudo: string;
  categoria: string;
  lido: boolean;
}

const informativos: Informativo[] = [
  {
    id: "1",
    titulo: "Alterações no BPC para 2023",
    data: "12/05/2023",
    conteudo: "O Governo Federal anunciou mudanças importantes no Benefício de Prestação Continuada (BPC) para o ano de 2023. Entre as principais alterações estão a ampliação do limite de renda familiar per capita e a simplificação do processo de cadastro e renovação.",
    categoria: "bpc",
    lido: false
  },
  {
    id: "2",
    titulo: "Campanha de Vacinação na Sede da ONG",
    data: "10/05/2023",
    conteudo: "Estamos organizando uma campanha de vacinação em parceria com a Secretaria Municipal de Saúde. Todos os associados e seus dependentes poderão se vacinar contra gripe, COVID-19 e atualizar outras vacinas do calendário nacional.",
    categoria: "saude",
    lido: false
  },
  {
    id: "3",
    titulo: "Novo Projeto de Capacitação Profissional",
    data: "05/05/2023",
    conteudo: "Estamos lançando um novo projeto de capacitação profissional para associados e dependentes maiores de 16 anos. Os cursos incluem informática básica, administração e atendimento ao cliente.",
    categoria: "capacitacao",
    lido: true
  },
  {
    id: "4",
    titulo: "Atualização Cadastral Obrigatória",
    data: "01/05/2023",
    conteudo: "Informamos que todos os associados devem realizar a atualização cadastral até o dia 30/06/2023. A atualização é necessária para manter o acesso aos benefícios e serviços da ONG.",
    categoria: "administrativo",
    lido: true
  },
  {
    id: "5",
    titulo: "Doações de Alimentos Não-Perecíveis",
    data: "28/04/2023",
    conteudo: "Estamos recebendo doações de alimentos não-perecíveis para montagem de cestas básicas. As doações podem ser entregues na sede da ONG de segunda a sexta, das 9h às 17h.",
    categoria: "doacao",
    lido: true
  },
  {
    id: "6",
    titulo: "Palestra sobre Direitos do Beneficiário",
    data: "25/04/2023",
    conteudo: "No próximo dia 15/05, teremos uma palestra sobre os direitos dos beneficiários do BPC. O evento será gratuito e ocorrerá no auditório da ONG, às 14h.",
    categoria: "bpc",
    lido: true
  },
];

const Informativos = () => {
  const [termoBusca, setTermoBusca] = useState("");
  const [informativosLista, setInformativosLista] = useState<Informativo[]>(informativos);
  
  const categorias = ["todos", "bpc", "saude", "capacitacao", "administrativo", "doacao"];
  
  const filtrarPorCategoria = (categoria: string) => {
    if (categoria === "todos") {
      setInformativosLista(informativos);
    } else {
      setInformativosLista(informativos.filter(item => item.categoria === categoria));
    }
  };
  
  const buscarInformativos = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (termoBusca.trim() === "") {
      setInformativosLista(informativos);
      return;
    }
    
    const termoLowerCase = termoBusca.toLowerCase();
    const resultados = informativos.filter(
      item => item.titulo.toLowerCase().includes(termoLowerCase) || 
             item.conteudo.toLowerCase().includes(termoLowerCase)
    );
    
    setInformativosLista(resultados);
  };
  
  const marcarComoLido = (id: string) => {
    setInformativosLista(
      informativosLista.map(item => 
        item.id === id ? { ...item, lido: true } : item
      )
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Informativos</h1>
          <p className="text-muted-foreground">Fique atualizado com as novidades da ONG</p>
        </div>
        
        <Card>
          <CardHeader className="space-y-5">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Informativos e Comunicados
            </CardTitle>
            
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={buscarInformativos} className="flex-1 flex">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar informativos..."
                    className="pl-9"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                  />
                </div>
                <Button type="submit" className="ml-2">Buscar</Button>
              </form>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="todos" className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
                {categorias.map((categoria) => (
                  <TabsTrigger 
                    key={categoria} 
                    value={categoria}
                    onClick={() => filtrarPorCategoria(categoria)}
                    className="capitalize"
                  >
                    {categoria.replace("_", " ")}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {informativosLista.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <p>Nenhum informativo encontrado.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {informativosLista.map((informativo) => (
                    <Card key={informativo.id} className={informativo.lido ? "" : "border-l-4 border-primary"}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg flex items-center">
                            {informativo.titulo}
                            {!informativo.lido && (
                              <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary"></span>
                            )}
                          </h3>
                          <div className="text-sm text-muted-foreground mt-1 md:mt-0">
                            <span className="capitalize">{informativo.categoria.replace("_", " ")}</span> • {informativo.data}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{informativo.conteudo}</p>
                        
                        {!informativo.lido && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => marcarComoLido(informativo.id)}
                          >
                            Marcar como lido
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Informativos;
