const User=require("../Models/user.js");


module.exports.signupUser=(req,res)=>{
    res.render("./user/signup.ejs")
};

module.exports.createSignup=async(req,res)=>{
    try{
    let{username,email,password}=req.body;
    const newUser=new User({email,username});
    const RegisteredUser=await User.register(newUser,password);
    req.flash("success","Welcome to wanderlust");
    res.redirect("/listings");


    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.loginUser=(req,res)=>{
    res.render("./user/login.ejs");
};


module.exports.createLogin= async(req,res)=>{
            req.flash("success","Long time no see!");
           let redirect=res.locals.redirectUrl || "/listings";
           res.redirect(redirect); 
};

module.exports.logoutUser=(req,res)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
};

