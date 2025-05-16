
import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProfileCompletionItem {
  id: string;
  label: string;
  completed: boolean;
  path: string;
}

// Dados fictícios para exemplo
const profileItems: ProfileCompletionItem[] = [
  {
    id: "1", 
    label: "Dados pessoais", 
    completed: true,
    path: "/perfil"
  },
  {
    id: "2", 
    label: "Informações de contato", 
    completed: true,
    path: "/perfil"
  },
  {
    id: "3", 
    label: "Informações financeiras", 
    completed: false,
    path: "/perfil"
  },
  {
    id: "4", 
    label: "Documentos pessoais", 
    completed: false,
    path: "/documentos"
  },
];

const ProfileCompletion = () => {
  const completedItems = profileItems.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedItems / profileItems.length) * 100);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Completude do Perfil</CardTitle>
        <div className="text-sm font-medium text-primary">{completionPercentage}%</div>
      </CardHeader>
      <CardContent>
        <Progress value={completionPercentage} className="h-2 mb-4" />
        
        <div className="space-y-3">
          {profileItems.map(item => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {item.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span>{item.label}</span>
              </div>
              {!item.completed && (
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" asChild>
                  <Link to={item.path}>Completar</Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletion;
