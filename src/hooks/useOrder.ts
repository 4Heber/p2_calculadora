import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder(){

    // Se define el type utilizando los 'generics' para indicar el tipo de dato inicial
    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)

    const addItem = (item: MenuItem) => {

        /** Evitar duplicados al añadir el mismo item incrementando su cantidad */
        const itemExists = order.find(orderItem => orderItem.id === item.id)
        if(itemExists){
            const updatedOrder = order.map(orderItem =>
                orderItem.id === item.id ? {...orderItem, quantity: orderItem.quantity + 1} : orderItem
            )
            setOrder(updatedOrder)

        } else {
            /**
             * Casting de parámetro recibido MenuItem a OrderItem
             * Creamos una nueva variable con la copia del objeto recibido por parámetro y le añadimos la propiedad 'quantity'
             * para que el nuevo objeto 'newItem' pueda ser del type OrderItem
             */
            const newItem = {...item, quantity: 1}
            /**
             * Spread operator para copiar los valores del state actual y añadimos el nuevo objeto
             */
            setOrder([...order, newItem])
        }
    }

    const removeItem = (itemID: MenuItem['id']) => {
        setOrder(order.filter(orderItem => orderItem.id !== itemID))
    }

    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }
}