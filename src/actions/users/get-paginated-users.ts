"use server";

import { Middleware } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async () => {
  const session = await Middleware();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe ser usuario administrador",
    };
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return {
    ok: true,
    users,
  };
};
