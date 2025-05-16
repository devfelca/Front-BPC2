
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Check, AlertCircle, UserRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Dependente {
  id: string;
  nome: string;
}

interface DocumentoItem {
  id: string;
  nome: string;
  requerido: boolean;
  status: 'pendente' | 'enviado' | 'aprovado' | 'rejeitado';
  dataEnvio?: string;
  comentario?: string;
  dependenteId?: string;
}

const DocumentosForm = () => {
  const { toast } = useToast();
  
  const [dependentes, setDependentes] = useState<Dependente[]>([
    { id: "1", nome: "Maria Silva (Filha)" },
    { id: "2", nome: "João Silva (Filho)" },
    { id: "3", nome: "Ana Silva (Cônjuge)" }
  ]);
  
  const [dependenteSelecionado, setDependenteSelecionado] = useState<string>("todos");
  
  const [documentosPessoais, setDocumentosPessoais] = useState<DocumentoItem[]>([
    { id: "1", nome: "RG (frente e verso)", requerido: true, status: 'pendente' },
    { id: "2", nome: "CPF", requerido: true, status: 'enviado', dataEnvio: "10/05/2023" },
    { id: "3", nome: "Comprovante de Residência", requerido: true, status: 'aprovado', dataEnvio: "05/04/2023" },
    { id: "4", nome: "Comprovante de Renda", requerido: true, status: 'rejeitado', dataEnvio: "01/05/2023", comentario: "Documento ilegível, por favor reenvie." },
    { id: "5", nome: "Cartão do BPC", requerido: false, status: 'pendente' },
  ]);
  
  const [documentosDependentes, setDocumentosDependentes] = useState<DocumentoItem[]>([
    { id: "6", nome: "Certidão de Nascimento/RG do dependente", requerido: true, status: 'pendente', dependenteId: "1" },
    { id: "7", nome: "Cartão do BPC do dependente", requerido: false, status: 'pendente', dependenteId: "1" },
    { id: "8", nome: "Laudo médico (se aplicável)", requerido: false, status: 'pendente', dependenteId: "1" },
    { id: "9", nome: "Certidão de Nascimento/RG do dependente", requerido: true, status: 'pendente', dependenteId: "2" },
    { id: "10", nome: "Cartão do BPC do dependente", requerido: false, status: 'enviado', dataEnvio: "15/04/2023", dependenteId: "2" },
    { id: "11", nome: "Laudo médico (se aplicável)", requerido: false, status: 'pendente', dependenteId: "2" },
    { id: "12", nome: "RG do dependente", requerido: true, status: 'aprovado', dataEnvio: "20/03/2023", dependenteId: "3" },
    { id: "13", nome: "CPF do dependente", requerido: true, status: 'aprovado', dataEnvio: "20/03/2023", dependenteId: "3" },
  ]);

  const [documentosDependentesFiltrados, setDocumentosDependentesFiltrados] = useState<DocumentoItem[]>(documentosDependentes);

  useEffect(() => {
    if (dependenteSelecionado === "todos") {
      setDocumentosDependentesFiltrados(documentosDependentes);
    } else {
      setDocumentosDependentesFiltrados(
        documentosDependentes.filter(doc => doc.dependenteId === dependenteSelecionado)
      );
    }
  }, [dependenteSelecionado, documentosDependentes]);

  const enviarDocumento = (id: string, tipo: 'pessoal' | 'dependente') => {
    // Simulando o envio de arquivo
    const documentos = tipo === 'pessoal' ? [...documentosPessoais] : [...documentosDependentes];
    const index = documentos.findIndex(doc => doc.id === id);
    
    if (index !== -1) {
      documentos[index] = {
        ...documentos[index],
        status: 'enviado',
        dataEnvio: new Date().toLocaleDateString()
      };
      
      if (tipo === 'pessoal') {
        setDocumentosPessoais(documentos);
      } else {
        setDocumentosDependentes(documentos);
        // Atualizar a lista filtrada também
        if (dependenteSelecionado === "todos") {
          setDocumentosDependentesFiltrados(documentos);
        } else {
          setDocumentosDependentesFiltrados(
            documentos.filter(doc => doc.dependenteId === dependenteSelecionado)
          );
        }
      }
      
      toast({
        title: "Documento enviado!",
        description: "Seu documento foi enviado com sucesso e está em análise.",
      });
    }
  };

  const renderDocumentoStatus = (status: string) => {
    switch (status) {
      case 'pendente':
        return <span className="text-yellow-500 text-sm">Pendente</span>;
      case 'enviado':
        return <span className="text-blue-500 text-sm">Em análise</span>;
      case 'aprovado':
        return <span className="text-green-500 text-sm flex items-center"><Check className="h-3 w-3 mr-1" />Aprovado</span>;
      case 'rejeitado':
        return <span className="text-red-500 text-sm flex items-center"><AlertCircle className="h-3 w-3 mr-1" />Rejeitado</span>;
      default:
        return null;
    }
  };

  const getNomeDependente = (id: string) => {
    const dependente = dependentes.find(dep => dep.id === id);
    return dependente ? dependente.nome : "Desconhecido";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos</CardTitle>
        <CardDescription>Envie os documentos requeridos para você e seus dependentes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pessoais" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pessoais">Documentos Pessoais</TabsTrigger>
            <TabsTrigger value="dependentes">Documentos de Dependentes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pessoais">
            <div className="space-y-4 mt-4">
              {documentosPessoais.map((documento) => (
                <div 
                  key={documento.id} 
                  className="border rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">
                        {documento.nome}
                        {documento.requerido && <span className="text-red-500 ml-1">*</span>}
                      </div>
                      <div className="flex items-center mt-1">
                        {renderDocumentoStatus(documento.status)}
                        {documento.dataEnvio && (
                          <span className="text-muted-foreground text-xs ml-2">
                            Enviado em: {documento.dataEnvio}
                          </span>
                        )}
                      </div>
                      {documento.comentario && (
                        <div className="text-sm text-red-500 mt-1">{documento.comentario}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    <label htmlFor={`upload-${documento.id}`} className="w-full sm:w-auto">
                      <div className="cursor-pointer">
                        <Button 
                          variant={documento.status === 'aprovado' ? "secondary" : "default"} 
                          className="w-full sm:w-auto"
                          disabled={documento.status === 'aprovado'}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          {documento.status === 'aprovado' 
                            ? 'Aprovado' 
                            : documento.status === 'enviado' 
                              ? 'Reenviar' 
                              : 'Enviar'}
                        </Button>
                      </div>
                      <input 
                        id={`upload-${documento.id}`} 
                        type="file"
                        className="hidden"
                        onChange={() => enviarDocumento(documento.id, 'pessoal')}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="dependentes">
            <div className="space-y-4 mt-4">
              {/* Seletor de dependente */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="w-full sm:w-1/2">
                  <Label htmlFor="dependente-select" className="mb-2 block">Selecionar Dependente</Label>
                  <Select 
                    value={dependenteSelecionado} 
                    onValueChange={setDependenteSelecionado}
                  >
                    <SelectTrigger id="dependente-select">
                      <SelectValue placeholder="Selecione um dependente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Dependentes</SelectItem>
                      {dependentes.map((dependente) => (
                        <SelectItem key={dependente.id} value={dependente.id}>
                          {dependente.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {documentosDependentesFiltrados.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhum documento encontrado para o dependente selecionado.</p>
                </div>
              ) : (
                documentosDependentesFiltrados.map((documento) => (
                  <div 
                    key={documento.id} 
                    className="border rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">
                          {documento.nome}
                          {documento.requerido && <span className="text-red-500 ml-1">*</span>}
                        </div>
                        {dependenteSelecionado === "todos" && documento.dependenteId && (
                          <div className="text-sm text-muted-foreground flex items-center mt-1">
                            <UserRound className="h-3 w-3 mr-1" />
                            {getNomeDependente(documento.dependenteId)}
                          </div>
                        )}
                        <div className="flex items-center mt-1">
                          {renderDocumentoStatus(documento.status)}
                          {documento.dataEnvio && (
                            <span className="text-muted-foreground text-xs ml-2">
                              Enviado em: {documento.dataEnvio}
                            </span>
                          )}
                        </div>
                        {documento.comentario && (
                          <div className="text-sm text-red-500 mt-1">{documento.comentario}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="w-full sm:w-auto">
                      <label htmlFor={`upload-${documento.id}`} className="w-full sm:w-auto">
                        <div className="cursor-pointer">
                          <Button 
                            variant={documento.status === 'aprovado' ? "secondary" : "default"} 
                            className="w-full sm:w-auto"
                            disabled={documento.status === 'aprovado'}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            {documento.status === 'aprovado' 
                              ? 'Aprovado' 
                              : documento.status === 'enviado' 
                                ? 'Reenviar' 
                                : 'Enviar'}
                          </Button>
                        </div>
                        <input 
                          id={`upload-${documento.id}`} 
                          type="file"
                          className="hidden"
                          onChange={() => enviarDocumento(documento.id, 'dependente')}
                        />
                      </label>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DocumentosForm;
