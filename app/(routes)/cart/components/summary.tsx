"use client";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";


const Summary = () => {
    const router = useRouter();
    const items = useCart((state)=> state.items);
    const removeAll = useCart((state)=> state.removeAll);
    const totalPrice = items.reduce((total, item)=> {
        return total + Number(item.price)
    }, 0)

    // useEffect(() => {
    //   if(searchParams.get("success")) {
    //     toast.success("Pago completado")
    //     removeAll();
    //   }
    //   if(searchParams.get("canceled"))
    //     toast.error("Sucesió algún error")
    // }, [removeAll, searchParams])
    

    const onCheckout=async()=> {
        router.push('/checkout')
        const productIds = items.map((item)=> item.id)
        console.log(productIds);


    }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 className="text-lg font-medium text-gray-900">
            Resumen de la orden
        </h2>
        <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                    Total de la orden
                </div>
                <Currency value={totalPrice} />
            </div>
        </div>
        <Button disabled={items.length === 0} onClick={onCheckout} className="w-full mt-6">
            Verificar
        </Button>
    </div>
  )
}

export default Summary