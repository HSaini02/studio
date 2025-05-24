
import { mockFAQs } from '@/lib/data';
import ContactForm from '@/components/support/contact-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MessageSquareQuestion } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-8 bg-primary/5 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">Support & FAQ</h1>
        <p className="text-muted-foreground mt-2">Find answers to common questions or get in touch with our support team.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <MessageSquareQuestion className="h-7 w-7 mr-3 text-primary" />
            Frequently Asked Questions
          </h2>
          {mockFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {mockFAQs.map((faq) => (
                <AccordionItem value={`item-${faq.id}`} key={faq.id}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground">No FAQs available at the moment.</p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
             <Mail className="h-7 w-7 mr-3 text-primary" />
            Contact Us
          </h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
