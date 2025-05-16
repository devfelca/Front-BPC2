
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import StatusCard from "@/components/dashboard/StatusCard";
import RecentNotifications from "@/components/dashboard/RecentNotifications";
import ProfileCompletion from "@/components/dashboard/ProfileCompletion";
import { User, FileText, Users, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Olá, Associado!</h1>
          <p className="text-muted-foreground">Bem-vindo ao seu portal. Confira suas informações e atualizações.</p>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard 
            title="Documentos Pendentes" 
            value="3"
            icon={<FileText />}
            description="Documentos que precisam ser enviados" 
          />
          <StatusCard 
            title="Dependentes" 
            value="2"
            icon={<Users />}
            description="Pessoas sob sua responsabilidade" 
          />
          <StatusCard 
            title="Benefícios" 
            value="2"
            icon={<Settings />}
            description="Benefícios ativos" 
          />
          <StatusCard 
            title="Doações Realizadas" 
            value="R$ 150,00"
            icon={<Heart />}
            description="Total de doações no ano" 
          />
        </div>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <ProfileCompletion />
          <RecentNotifications />
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle>Acesso Rápido</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <Link to="/perfil">
                  <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                    <User className="h-6 w-6" />
                    <span>Editar Perfil</span>
                  </Button>
                </Link>
                <Link to="/familia">
                  <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                    <Users className="h-6 w-6" />
                    <span>Família</span>
                  </Button>
                </Link>
                <Link to="/documentos">
                  <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                    <FileText className="h-6 w-6" />
                    <span>Documentos</span>
                  </Button>
                </Link>
                <Link to="/doacoes">
                  <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
                    <Heart className="h-6 w-6" />
                    <span>Doações</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-medium">Atendimento Jurídico Gratuito</p>
                  <p className="text-muted-foreground text-sm">20/05/2023 - 14:00h</p>
                  <p className="text-sm mt-1">Sede da ONG - Rua Principal, 123</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-medium">Palestra sobre Direitos do BPC</p>
                  <p className="text-muted-foreground text-sm">25/05/2023 - 10:00h</p>
                  <p className="text-sm mt-1">Auditório Central - Av. Central, 456</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-medium">Distribuição de Cestas Básicas</p>
                  <p className="text-muted-foreground text-sm">30/05/2023 - 09:00h</p>
                  <p className="text-sm mt-1">Sede da ONG - Rua Principal, 123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
