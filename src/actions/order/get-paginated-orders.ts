"use server";

import { Middleware } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async () => {
  const session = await Middleware();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      ok: true,
      orders,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Orden no existe",
    };
  }
};
