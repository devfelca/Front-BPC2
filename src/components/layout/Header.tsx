
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Users, FileText, Heart, Bell, Home, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { 
      id: 'inicio', 
      label: "Início", 
      icon: <Home className="w-5 h-5" />,
      path: '/'
    },
    { 
      id: 'lutas', 
      label: "Lutas", 
      icon: <Activity className="w-5 h-5" />,
      path: '/lutas'
    },
    { 
      id: 1, 
      label: "Dados",
      icon: <User className="w-5 h-5" />,
      subItems: [
        { id: 'perfil', label: 'Editar Perfil', path: '/perfil' },
        { id: 'familia', label: 'Família', path: '/familia' },
        { id: 'documentos', label: 'Documentos', path: '/documentos' },
      ]
    },
    { 
      id: 2, 
      label: "Doações", 
      icon: <Heart className="w-5 h-5" />,
      path: '/doacoes'
    },
    { 
      id: 3, 
      label: "Informativos",
      icon: <Bell className="w-5 h-5" />,
      path: '/informativos'
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/2477e8a7-cf02-4ce8-ab89-678bbb8e32c5.png" 
              alt="Observatório BPC Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-primary">Observatório BPC</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            item.subItems ? (
              <DropdownMenu key={item.id}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.subItems.map((subItem) => (
                    <DropdownMenuItem key={subItem.id} asChild>
                      <Link to={subItem.path}>{subItem.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link key={item.id} to={item.path}>
                <Button variant="ghost" className="flex items-center gap-1">
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Foto de perfil" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/perfil">Meu Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/sair">Sair</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu de navegação</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex items-center gap-2 mb-6">
                <img 
                  src="/lovable-uploads/2477e8a7-cf02-4ce8-ab89-678bbb8e32c5.png" 
                  alt="Observatório BPC Logo" 
                  className="h-8 w-auto"
                />
                <span className="font-bold">Observatório BPC</span>
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    {item.subItems ? (
                      <>
                        <span className="text-sm font-medium flex items-center gap-2 mb-2">
                          {item.icon}
                          {item.label}
                        </span>
                        <div className="flex flex-col gap-2 ml-6">
                          {item.subItems.map((subItem) => (
                            <Link 
                              key={subItem.id} 
                              to={subItem.path}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link 
                        to={item.path} 
                        className="flex items-center gap-2 font-medium"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
