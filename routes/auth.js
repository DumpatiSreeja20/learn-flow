const express = require("express");
const passport = require("passport");
const router = express.Router();

//This will redirect user to consent screen.Here,url contains the properties : 
//response type = code
//redirect uri = 
//scope = 
//client_id = 
router.get(
  "/google",
  passport.authenticate("google", {  
    scope: ["profile", "email"],
  })
);
//After above func runs,once the user gave consent to google,it redirects to url that contains
//the callbackURL and code attached with it.

// Line 24(i.e., passport.authenticate("google")),identifies that,there is code in the url,and automatically it fetches the profile 
// Information from google.Once it fetched the information,it will call the call-back funcn(From Line 17 of passport.js file)
//And after going through entire flow.That is at last after executing deserializeUser() func,it continue
//to execute from line 29.i.e.,(req, res) =>.

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    const user = req.user;
    if (user.role !== 0 || user.role !== 1) {
      return res.redirect("/signup");
    }
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
