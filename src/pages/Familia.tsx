
import Layout from "@/components/layout/Layout";
import FamiliaForm from "@/components/forms/FamiliaForm";

const Familia = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Família</h1>
          <p className="text-muted-foreground">Gerencie informações dos seus dependentes</p>
        </div>
        
        <FamiliaForm />
      </div>
    </Layout>
  );
};

export default Familia;
