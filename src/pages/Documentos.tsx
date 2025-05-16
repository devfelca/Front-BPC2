
import Layout from "@/components/layout/Layout";
import DocumentosForm from "@/components/forms/DocumentosForm";

const Documentos = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Documentos</h1>
          <p className="text-muted-foreground">Envie e gerencie seus documentos e de seus dependentes</p>
        </div>
        
        <DocumentosForm />
      </div>
    </Layout>
  );
};

export default Documentos;
