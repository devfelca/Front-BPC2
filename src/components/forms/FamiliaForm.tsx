
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2 } from "lucide-react";

const dependenteSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  parentesco: z.string().min(1, "Selecione o parentesco"),
  idade: z.string().min(1, "Informe a idade"),
  recebeBPC: z.boolean(),
  tipoComorbidade: z.string().optional(),
});

const formSchema = z.object({
  responsavelPorBPC: z.boolean(),
  dependentes: z.array(dependenteSchema).optional(),
});

type DependenteValues = z.infer<typeof dependenteSchema>;
type FormValues = z.infer<typeof formSchema>;

const FamiliaForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [dependentes, setDependentes] = useState<DependenteValues[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responsavelPorBPC: false,
      dependentes: [],
    },
  });

  const dependenteForm = useForm<DependenteValues>({
    resolver: zodResolver(dependenteSchema),
    defaultValues: {
      nome: "",
      parentesco: "",
      idade: "",
      recebeBPC: false,
      tipoComorbidade: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    // Incluir os dependentes aos dados
    const dadosCompletos = {
      ...data,
      dependentes,
    };
    
    // Simulação de envio para API
    setTimeout(() => {
      console.log("Dados do formulário:", dadosCompletos);
      toast({
        title: "Informações familiares atualizadas!",
        description: "As informações da sua família foram atualizadas com sucesso.",
      });
      setIsLoading(false);
    }, 1500);
  };

  const adicionarDependente = (data: DependenteValues) => {
    setDependentes([...dependentes, data]);
    dependenteForm.reset();
    
    toast({
      title: "Dependente adicionado",
      description: `${data.nome} foi adicionado como dependente.`,
    });
  };

  const removerDependente = (index: number) => {
    const novosDependentes = [...dependentes];
    novosDependentes.splice(index, 1);
    setDependentes(novosDependentes);
    
    toast({
      title: "Dependente removido",
      description: "O dependente foi removido com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Núcleo Familiar</CardTitle>
          <CardDescription>Gerencie informações sobre seus dependentes e beneficiários do BPC</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="responsavelPorBPC"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">É responsável por um beneficiário do BPC?</FormLabel>
                      <FormDescription>
                        Selecione caso você seja responsável por dependentes que recebem o Benefício de Prestação Continuada
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {form.watch("responsavelPorBPC") && (
                <Tabs defaultValue="dependentes" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="dependentes">Dependentes Cadastrados</TabsTrigger>
                    <TabsTrigger value="adicionar">Adicionar Dependente</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="dependentes">
                    <Card>
                      <CardContent className="pt-6">
                        {dependentes.length === 0 ? (
                          <p className="text-center text-muted-foreground py-6">
                            Nenhum dependente cadastrado. Adicione um dependente na aba "Adicionar Dependente".
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {dependentes.map((dependente, index) => (
                              <div key={index} className="border rounded-md p-4 relative">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => removerDependente(index)}
                                  className="absolute top-2 right-2 h-8 w-8 text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium">Nome</h4>
                                    <p className="text-sm">{dependente.nome}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Parentesco</h4>
                                    <p className="text-sm">{dependente.parentesco}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Idade</h4>
                                    <p className="text-sm">{dependente.idade} anos</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Recebe BPC</h4>
                                    <p className="text-sm">{dependente.recebeBPC ? "Sim" : "Não"}</p>
                                  </div>
                                  {dependente.tipoComorbidade && (
                                    <div>
                                      <h4 className="font-medium">Tipo de Comorbidade</h4>
                                      <p className="text-sm">{dependente.tipoComorbidade}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="adicionar">
                    <Card>
                      <CardHeader>
                        <CardTitle>Adicionar Dependente</CardTitle>
                        <CardDescription>Informe os dados do dependente para cadastro</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <Form {...dependenteForm}>
                          <form onSubmit={dependenteForm.handleSubmit(adicionarDependente)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={dependenteForm.control}
                                name="nome"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Nome Completo</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Digite o nome completo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={dependenteForm.control}
                                name="idade"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Idade</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="Idade" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={dependenteForm.control}
                                name="parentesco"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Parentesco</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Selecione o parentesco" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="filho">Filho(a)</SelectItem>
                                        <SelectItem value="conjuge">Cônjuge</SelectItem>
                                        <SelectItem value="pai">Pai</SelectItem>
                                        <SelectItem value="mae">Mãe</SelectItem>
                                        <SelectItem value="irmao">Irmão/Irmã</SelectItem>
                                        <SelectItem value="outro">Outro</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={dependenteForm.control}
                                name="recebeBPC"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel>Recebe BPC</FormLabel>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={dependenteForm.control}
                                name="tipoComorbidade"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Tipo de Comorbidade</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Selecione uma opção" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="nenhuma">Nenhuma</SelectItem>
                                        <SelectItem value="fisica">Física</SelectItem>
                                        <SelectItem value="mental">Mental</SelectItem>
                                        <SelectItem value="multipla">Múltipla</SelectItem>
                                        <SelectItem value="outra">Outra</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <Button type="submit" className="w-full">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Adicionar Dependente
                            </Button>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Informações"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamiliaForm;
