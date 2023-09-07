"use client";

import Button from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCart from "@/hooks/use-cart";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";


const formSchema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    phone: z.string().min(1),
    city: z.string().min(1)
});

type CheckoutFormValues = z.infer<typeof formSchema>;


const CheckoutForm = ({productIds}: {productIds:string[]}) => {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const removeAll = useCart((state)=> state.removeAll);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: '',
        address: '',
        phone: '',
        city: 'Sucre'
    }
  });

  const onSubmit=async(form: CheckoutFormValues)=> {
    try {
        setLoading(true);
        const data = {...form, productIds}
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, data)
        toast.success("órden completetada enseguida nos contactaremos contigo")
        removeAll();
        router.push(`/`)
        setLoading(false);
        
    } catch (error) {
        console.log(error);
    }
  }
    
  return (
    <div className="mt-10">
        <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                  <div className="grid grid-cols-1 gap-8">
                  <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input
                                      disabled={loading}  
                                      placeholder="Nombre completo"
                                      {...field} 
                                    /> 
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Dirección</FormLabel>
                                <FormControl>
                                    <Input
                                      disabled={loading}  
                                      placeholder="Direccion de entrega"
                                      {...field} 
                                    /> 
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Celular</FormLabel>
                                <FormControl>
                                    <Input
                                      disabled={loading}  
                                      placeholder="Número de celular para contactarnos"
                                      {...field} 
                                    /> 
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Ciudad</FormLabel>
                                <FormControl>
                                    <Input
                                      disabled={true} 
                                      placeholder="Ciudad"
                                      {...field} 
                                    /> 
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> 
                  </div>
                  <Button className="w-full mt-6" type="submit" disabled={loading}>
                      Hacer pedido
                  </Button>
              </form>
        </Form>
    </div>
  )
}

export default CheckoutForm