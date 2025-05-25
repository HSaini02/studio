
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Quote className="h-8 w-8 text-primary/50 mb-4" />
        <p className="text-muted-foreground italic mb-4">&quot;{testimonial.text}&quot;</p>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={`https://avatar.vercel.sh/${testimonial.author.replace(/\s+/g, '').toLowerCase()}.png`} alt={testimonial.author} />
            <AvatarFallback>{getInitials(testimonial.author)}</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-foreground">- {testimonial.author}</p>
        </div>
      </CardContent>
    </Card>
  );
}
