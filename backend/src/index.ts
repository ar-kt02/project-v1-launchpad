import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import userRoutes from "./modules/user/user.route";
import jwtPlugin from "./plugins/jwt";
import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;

dotenv.config({ path: envFile });

const fastify = Fastify({
   logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

async function main() {
   await fastify.register(jwtPlugin);
   fastify.register(userRoutes, { prefix: "/api/users" });

   try {
      await fastify.listen({ port: 3000 });
   } catch (err) {
      fastify.log.error(err);
      process.exit(1);
   }
}

main();
