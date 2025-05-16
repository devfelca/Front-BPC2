
import Layout from "@/components/layout/Layout";
import DoacoesForm from "@/components/forms/DoacoesForm";

const Doacoes = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Doações</h1>
          <p className="text-muted-foreground">Contribua para os projetos da nossa ONG</p>
        </div>
        
        <DoacoesForm />
      </div>
    </Layout>
  );
};

export default Doacoes;
