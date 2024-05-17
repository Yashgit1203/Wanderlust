const User = require("../models/user.js");
const nodemailer = require("nodemailer");
module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res, next) => {
  try {
    let { username, password, email } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    // send mail

    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.APP_PASS,
      },
    });

    var mailOptions = {
      from: {
        name: "Wanderlust",
        address: process.env.MAIL,
      },
      to: JSON.stringify(email),
      subject: "Successful Sign-In to Wanderlust",
      html: `
      <html>
      <head>
      <title>Successful Sign-In to Wanderlust</title>
      </head>
      <body bgcolor="#f2f2f2" style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
      
      <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#007bff">
        <tr>
          <td style="padding: 20px; text-align: center; color: #fff;">
            <h1 style="margin: 0;">Successful Sign-In to Wanderlust 🎉</h1>
          </td>
        </tr>
      </table>
      
      <table width="100%" border="0" cellspacing="0" cellpadding="20" bgcolor="#ffffff" style="padding: 20px;">
        <tr>
          <td>
            <p>Dear ${username},</p>
            <p>We are thrilled to inform you that your sign-in to Wanderlust, your gateway to exploring endless travel possibilities, was successful! 🌍✈️</p>
            <p>Wanderlust is your one-stop destination for discovering and booking hotel rooms in exotic locales worldwide. Whether you're planning a relaxing getaway, an adventurous trek, or a cultural immersion, Wanderlust has got you covered. 🏨🌴</p>
            <p>Now that you're signed in, you can:</p>
            <ul>
              <li>Explore a vast array of hotels and accommodations tailored to your preferences. 🌟</li>
              <li>Save your favorite destinations and hotels for quick access. ❤️</li>
              <li>Book your dream accommodations hassle-free, with our secure payment options. 💳🔒</li>
            </ul>
            <p>Your Wanderlust journey starts now! Embark on unforgettable adventures, discover hidden gems, and create lasting memories with every trip. 🚀🌟</p>
            <p>If you have any questions or need assistance, our dedicated support team is here to help. Feel free to reach out to us at <a href="mailto:wanderlust2164@gmail.com" style="color: #007bff;">wanderlust2164@gmail.com</a> or visit our Help Center for FAQs and guides. 📧🛠️</p>
            <p>Thank you for choosing Wanderlust. Get ready to explore, dream, and discover! ✨🌈</p>
            <p>Happy travels, 🌎✈️</p>
            <p>The Wanderlust Team 🧳🌍</p>
          </td>
        </tr>
      </table>
      
      </body>
      </html>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent: " + info.response);
      }
    });
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "Welcome to wanderlust");
        res.redirect("/listings");
      }
    });
  } catch (e) {
    if (e.code == 11000) {
      req.flash("error", "Email is already registered with us!");
    }
    else{
      req.flash("error", e.message);
    }
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};
module.exports.login = async (req, res) => {
  req.flash("success", "Welcom to Wanderlust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "You are logged out!");
      res.redirect("/listings");
    }
  });
};
