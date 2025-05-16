
import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Notification {
  id: string;
  title: string;
  date: string;
  isNew: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Nova palestra sobre direitos do beneficiário",
    date: "10/05/2023",
    isNew: true,
  },
  {
    id: "2",
    title: "Atualização de documentos necessária",
    date: "05/05/2023", 
    isNew: true,
  },
  {
    id: "3",
    title: "Campanha de doação de agasalhos",
    date: "01/05/2023",
    isNew: false,
  },
  {
    id: "4",
    title: "Novos benefícios disponíveis",
    date: "25/04/2023",
    isNew: false,
  },
];

const RecentNotifications = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Informativos Recentes</CardTitle>
        <Bell className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none flex items-center">
                  {notification.title}
                  {notification.isNew && (
                    <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{notification.date}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" asChild>
              <Link to="/informativos">Ver todos os informativos</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentNotifications;
