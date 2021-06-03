const router = require("express").Router();
const userApi = require("./user");

// building out the nested routes
router.use("/", userApi);

// common routes throughout the whole application
router.get("/", () => {
  res.render("all");
});

router.get("/about-us", (req, res) => {
  res.render("about-us");
});

router.get("/contact-us", (req, res) => {
  res.render("contact-us");
});

router.get("/legal", (req, res) => {
  res.render("legal");
});

router.get("/customer-support", (req, res) => {
  res.render("customer-support");
});

router.get("/mens", (req, res) => {
    res.render("mens");
});

router.get("/womens", (req, res) => {
    res.render("womens");
});

router.get("/kids", (req, res) => {
    res.render("kids");
});

router.get("/track-order", (req, res) => {
    res.render("track-order");
});

router.get("/login", (req, res) =>{
    if(req.session.loggedIn){
        res.redirect("/");
        return;
    }
    res.render('login');
});

module.exports = router;
