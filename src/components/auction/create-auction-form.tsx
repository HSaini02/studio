
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, DollarSign, Tag, Image as ImageIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  startingPrice: z.coerce.number().min(1, { message: "Starting price must be at least $1." }),
  category: z.string().min(3, { message: "Category is required." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  endTime: z.date({ required_error: "Auction end date is required."}),
});

type CreateAuctionFormValues = z.infer<typeof formSchema>;

interface CreateAuctionFormProps {
  onAuctionCreated: (auctionData: CreateAuctionFormValues) => void;
  closeDialog?: () => void;
}

export default function CreateAuctionForm({ onAuctionCreated, closeDialog }: CreateAuctionFormProps) {
  const { toast } = useToast();
  const form = useForm<CreateAuctionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startingPrice: 1,
      category: "",
      imageUrl: "https://placehold.co/600x400.png",
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 7 days from now
    },
  });

  function onSubmit(values: CreateAuctionFormValues) {
    // Here you would typically send the data to your backend
    console.log("Auction data submitted:", values);
    onAuctionCreated(values); 
    toast({
      title: "Auction Created!",
      description: `Your auction "${values.title}" has been successfully listed.`,
    });
    form.reset();
    if(closeDialog) closeDialog();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Auction Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Vintage Leather Briefcase" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of your item, including condition, history, etc."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starting Price ($)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="number" placeholder="50" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                 <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="e.g., Collectibles, Art, Electronics" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="https://example.com/image.png" className="pl-8" {...field} />
                  </div>
                </FormControl>
                 <FormDescription>
                    Use a service like Placehold.co for placeholder images.
                  </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Auction End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP HH:mm")
                      ) : (
                        <span>Pick a date and time</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      if (date) {
                        // Preserve time if already set, or default to end of day
                        const currentTime = field.value || new Date();
                        date.setHours(currentTime.getHours() === 0 ? 23 : currentTime.getHours());
                        date.setMinutes(currentTime.getMinutes() === 0 ? 59 : currentTime.getMinutes());
                        field.onChange(date);
                      }
                    }}
                    disabled={(date) =>
                      date < new Date(new Date().setDate(new Date().getDate() -1)) // cannot select past dates
                    }
                    initialFocus
                  />
                  {/* Simple time picker - consider a dedicated time picker component for better UX */}
                  <div className="p-2 border-t border-border">
                    <Input 
                      type="time" 
                      defaultValue={field.value ? format(field.value, "HH:mm") : "23:59"}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        const newDate = field.value ? new Date(field.value) : new Date();
                        newDate.setHours(hours);
                        newDate.setMinutes(minutes);
                        field.onChange(newDate);
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Create Auction</Button>
      </form>
    </Form>
  );
}

