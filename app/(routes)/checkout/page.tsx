"use client";

import { Container } from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CheckoutForm from "./components/checkout-form";


const CheckoutPage = () => {
    const items = useCart((state)=> state.items);
    const productIds = items.map((item)=> item.id);

    if(!productIds || productIds.length === 0) {
      return null
    }
    
  return (
    <div className="bg-white">
        <Container>
            <div className="px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-black">Datos personales para realizar el pedido</h1>
                <CheckoutForm productIds={productIds}/>
            </div>
        </Container>
    </div>
  )
}

export default CheckoutPage