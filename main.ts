import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();

const router = new Router();

router.get('/', (ctx) => {
  ctx.response.body = "Hola majo";
}).get("/day", (ctx) => {
  ctx.response.body = {
    day: new Date().getDay(),
  };
})
  .get("/characters", async (ctx) => {
    const data = await fetch("https://rickandmortyapi.com/api/character");
    const json = await data.json();
    ctx.response.body = json;
  })
  .get("/characters/:page", async (ctx) => {
    const page = ctx.params?.page;

    if(Number(page) < 1 || Number(page) > 42) {
      ctx.response.status = 404;
      ctx.response.body = "Numero incorrecto";
      return;
    }

    const data = await fetch(`https//rickandmortyapi.com/api/character?page=${page}`);
    const json = await data.json();
    ctx.response.body = json;
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });