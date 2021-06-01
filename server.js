const path = require("path");
const express = require("express");
// the module that was referenced in package.json was express-sessions
const session = require("express-session");
const exhbs = require("express-handlebars");
// the routes we called ./container and they were holding an empty file
const routes = require("./routes");

// TODO: CREATE THE PATH
// please dont import modules or directories if they dont exist
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
// the session.store wasnt there
// when you're copying code, please make sure that you copy it with the understanding of what it does
// missing something like this isn't a fun task to debug
const sequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// if using handlebars helpers, please define the helper...
const hbs = exhbs.create({ helpers });

const sess = {
  secret: "Shh secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
