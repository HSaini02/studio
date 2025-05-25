
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
