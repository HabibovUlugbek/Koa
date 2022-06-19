const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new KoaRouter();

//Replace with DB
const things = ["My family", "Music", "Math"];

//Json middleware
app.use(json());
app.use(bodyParser());

app.context.author = "Habibov";

render(app, {
	root: path.join(__dirname, "views"),
	layout: "layout",
	viewExt: "html",
	cache: false,
	debug: false,
});

//Routes
router.get("/", index);
router.get("/add", showAdd);
router.post("/add", add);

//list of things
async function index(ctx) {
	await ctx.render("index", {
		title: "Nothing to love",
		things: things,
	});
}

async function showAdd(ctx) {
	await ctx.render("add");
}

async function add(ctx) {
	const body = ctx.request.body;
	things.push(body.thing);
	ctx.redirect("/");
}

router.get("/test", async (ctx) => (ctx.body = `Hello ${ctx.author}`));

//Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("Server is running on port 3000"));
