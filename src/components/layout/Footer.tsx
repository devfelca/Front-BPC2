
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <img 
                src="/lovable-uploads/2477e8a7-cf02-4ce8-ab89-678bbb8e32c5.png" 
                alt="Observatório BPC Logo" 
                className="h-10 w-auto"
              />
              <h3 className="text-lg font-semibold">Observatório BPC</h3>
            </div>
            <p className="text-sm opacity-80 text-center md:text-left">Trabalhando para melhorar a vida de pessoas em situação de vulnerabilidade desde 2010.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm opacity-80 hover:opacity-100">Início</Link></li>
              <li><Link to="/perfil" className="text-sm opacity-80 hover:opacity-100">Meu Perfil</Link></li>
              <li><Link to="/doacoes" className="text-sm opacity-80 hover:opacity-100">Fazer Doação</Link></li>
              <li><Link to="/informativos" className="text-sm opacity-80 hover:opacity-100">Informativos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Contato</h3>
            <ul className="space-y-2">
              <li className="text-sm opacity-80">contato@observatoriobpc.org.br</li>
              <li className="text-sm opacity-80">(11) 1234-5678</li>
              <li className="text-sm opacity-80">São Paulo, SP</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-primary-foreground/30 text-center text-sm opacity-70">
          <p>© {new Date().getFullYear()} Observatório BPC. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
