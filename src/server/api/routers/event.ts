import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { DivisionEnum } from "@prisma/client";
import { z, ZodType } from "zod";

export const eventRouter = createTRPCRouter({
  createEvent: publicProcedure
    .input(
      z.object({
        title: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        location: z.string(),
        division: z.nativeEnum(DivisionEnum),
        description: z.string(),
        link: z.string().optional(),
        photo: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const createdEvent = await ctx.prisma.event.create({
          data: input,
        });

        return createdEvent;
      } catch (error) {
        console.error("Error creating Event:", error);
      }
    }),
});