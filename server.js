const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const path = require("path");
const render = require("koa-ejs");

const app = new Koa();
const router = new KoaRouter();

//Json middleware
app.use(json());

render(app, {
	root: path.join(__dirname, "views"),
	layout: "layout",
	viewExt: "html",
	cache: false,
	debug: false,
});

//Index route
router.get("/", async (ctx) => {
	await ctx.render("index");
});

router.get("test", async (ctx) => (ctx.body = "Hello Tesr"));

//Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("Server is running on port 3000"));
