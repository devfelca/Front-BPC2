
import Layout from "@/components/layout/Layout";
import PerfilForm from "@/components/forms/PerfilForm";

const Perfil = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Perfil</h1>
          <p className="text-muted-foreground">Atualize suas informações pessoais</p>
        </div>
        
        <PerfilForm />
      </div>
    </Layout>
  );
};

export default Perfil;
