'use server'

import prisma from "@/lib/prisma"

export const setTransactionId = async (transactionId: string, orderId: string) => {
  try {
    const order = await prisma.order.update({
      where: {id: orderId},
      data: {
        transactionId
      }
    })

    if(!order){
      return {
        ok: false,
        message: `No se encontro una orden con el id ${orderId}`
      }
    }

    return {
      ok: true,
    }
    
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al guardar el transactionId'
    }
  }
}