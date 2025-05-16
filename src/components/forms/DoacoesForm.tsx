
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  tipo: z.enum(["unica", "mensal"]),
  valor: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Informe um valor válido maior que zero.",
  }),
  formaPagamento: z.string().min(1, "Selecione uma forma de pagamento"),
  nomeCartao: z.string().optional(),
  numeroCartao: z.string().optional(),
  validade: z.string().optional(),
  cvv: z.string().optional(),
  mensagem: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const valorSugerido = ["50", "100", "200", "500"];

const DoacoesForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [doacaoConcluida, setDoacaoConcluida] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "unica",
      valor: "",
      formaPagamento: "",
      mensagem: "",
    },
  });

  const formaPagamento = form.watch("formaPagamento");
  const tipo = form.watch("tipo");

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      console.log("Dados da doação:", data);
      setIsLoading(false);
      setDoacaoConcluida(true);
      
      toast({
        title: "Doação realizada com sucesso!",
        description: "Muito obrigado pela sua contribuição.",
      });
    }, 1500);
  };

  if (doacaoConcluida) {
    return (
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Doação Realizada!</CardTitle>
          <CardDescription>
            Muito obrigado pela sua generosidade. Sua contribuição ajudará muitas pessoas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Um recibo foi enviado para o seu e-mail cadastrado. 
          </p>
          <p className="text-muted-foreground">
            Sua doação será processada nas próximas 24 horas.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => setDoacaoConcluida(false)}>Fazer nova doação</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-12 w-12 text-red-500" />
        </div>
        <CardTitle className="text-center text-2xl">Faça sua Doação</CardTitle>
        <CardDescription className="text-center">
          Sua contribuição é fundamental para mantermos nossos projetos e ajudar quem mais precisa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="unica" onValueChange={(value) => form.setValue("tipo", value as "unica" | "mensal")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="unica">Doação Única</TabsTrigger>
                <TabsTrigger value="mensal">Doação Mensal</TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-3">
                        <FormLabel>Escolha um valor para doar</FormLabel>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {valorSugerido.map((valor) => (
                            <Button
                              key={valor}
                              type="button"
                              variant={field.value === valor ? "default" : "outline"}
                              onClick={() => form.setValue("valor", valor)}
                              className="h-12"
                            >
                              R$ {valor}
                            </Button>
                          ))}
                        </div>
                        <FormLabel>Ou digite um valor personalizado</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <span className="text-gray-500">R$</span>
                            </div>
                            <Input
                              placeholder="Digite um valor"
                              {...field}
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="formaPagamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forma de Pagamento</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma forma de pagamento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                          <SelectItem value="pix">PIX</SelectItem>
                          <SelectItem value="boleto">Boleto Bancário</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {formaPagamento === "cartao" && (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="nomeCartao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome no Cartão</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o nome como está no cartão" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="numeroCartao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número do Cartão</FormLabel>
                        <FormControl>
                          <Input placeholder="0000 0000 0000 0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="validade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Validade</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/AA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              
              {formaPagamento === "pix" && (
                <div className="mt-4 border rounded-md p-4">
                  <p className="text-center mb-4">Escaneie o QR Code abaixo:</p>
                  <div className="flex justify-center mb-4">
                    {/* Simulação de QR Code */}
                    <div className="h-48 w-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">QR Code PIX</span>
                    </div>
                  </div>
                  <p className="text-center text-sm">
                    Ou copie a chave PIX: 12345678900
                  </p>
                </div>
              )}
              
              {formaPagamento === "boleto" && (
                <div className="mt-4 border rounded-md p-4 text-center">
                  <p className="mb-4">Um boleto será gerado e enviado para seu e-mail cadastrado.</p>
                  <Button variant="outline">Gerar boleto</Button>
                </div>
              )}
              
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="mensagem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deixe uma mensagem (opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Sua mensagem para a ONG"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Conte-nos por que você decidiu doar
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Tabs>
            
            <div className="flex justify-center">
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? "Processando..." : tipo === "unica" ? "Fazer Doação" : "Fazer Doação Mensal"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DoacoesForm;
