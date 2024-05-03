Airbnb replica

Model:Listing
    - title (string)
    - description (string)
    - price (number)
    - location (string)
    - country (string)
    - image (string)
  
Index Route
    - GET /listings
    - List all listings
    
Show Route
    - GET /listings/:id
    - Show a single listing
    - .toLocalString() to convert number to currency format (e.g. $1,000.00)
    
Create Route
    - GET /listings/new
    - Show a form to create a new listing
    - POST /listings
    - Create a new listing

Edit Route
    - GET /listings/:id/edit
    - Show a form to edit a listing
    - PUT /listings/:id
    - Update a listing

Delete Route
    - DELETE /listings/:id
    - Delete a listing

# Note:-

- ejs-mate is a layout engine for Express.js. It is a wrapper around EJS that adds layouts, partials, and blocks to your EJS templates.
Example:-
    - npm install ejs-mate
    - const ejsMate = require('ejs-mate');
    - app.engine('ejs', ejsMate);
    - app.set('view engine', 'ejs');
    - app.set('views', path.join(__dirname, 'views'));


# Form Validation:-
 
 When we enter data in the form ,the browser and\or the web server will check the data is in correct formate and within the constraints set by the application .

## Joi:-

- Joi is a powerful schema description language and data validator for JavaScript. Joi allows you to create blueprints or schemas for JavaScript objects to ensure validation of key information. If you have used express-validator, you will find Joi very similar.

- For more information visit:- https://joi.dev/api/?v=17.4.2

## Steps to use Joi:-

- npm install joi
- const Joi = require('joi');
- const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

- const { error, value } = schema.validate({ username: 'abc', birth_year: 1994 });
- console.log(error);

# Relationship:-

1) SQL(via foreign key):-
    - One-to-One
    - One-to-Many
    - Many-to-Many

    - Example:-
        - One-to-One:-
            - User has one profile
            - Profile belongs to a user
        - One-to-Many:-
            - User has many posts
            - Post belongs to a user
        - Many-to-Many:-
            - User has many roles
            - Role has many users

    - For more information visit:- https://www.sqlshack.com/understanding-sql-relationships-one-to-many/

# Review:-

-  use One-to-Many relationship
- One post has many comments and rating

- create model review.js
-create reference of review in listing.js as
    - reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
- now using Joi validate the review schema in review.js
- create a new validateReview function in app.js
 example:-
    const validateReview = (req, res, next) => {
        const { error } = reviewSchema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(',')
            throw new ExpressError(msg, 400)
        } else {
            next();
        }
    }
- now use this validateReview function in app.js(on post route of review)
- In post route of review, find the listing by id and push the review in reviews array of listing
- In show route of listing, populate the reviews of listing
- In delete route of review, find the listing by id and pull the review from reviews array of listing to do so use $pull operator of mongodb
$pull: { reviews: reviewId }

- In order to delete the review when the listing is deleted, use the middleware in listing.js
    - listingSchema.post('findOneAndDelete', async function (doc) {
        if (doc) {
            await Review.deleteMany({
                _id: {
                    $in: doc.reviews
                }
            })
        }
    })


# Restructuring(Express Router)

## Define:-
- Express Router is a way to organize your express application such that our primary app.js file does not become too large and unmanageable.

- const router = express.Router() // create a new router object;

-For more information visit:- https://expressjs.com/en/4x/api.html#router

## Steps:-
- Create a new folder named routes

1) Restructure listing routes
    - Create a new file named listings.js in routes folder
    - Move all the routes related to listing in listings.js
    - In app.js, require the listings.js file and use the routes
    - In listings.js, require the express and router
    - Create a new router and export it

2) Restructure review routes

    - Create a new file named reviews.js in routes folder
    - In review.js, require the express and router
    - In router set mergeParams: true to access the params of listing in review
        Ex:- const router = express.Router({ mergeParams: true });

    - Move all the routes related to review in reviews.js
    - In app.js, require the reviews.js file and use the routes
    - In reviews.js, require the express and router
    - Create a new router and export it

# Cookies :-

- Cookies are small pieces of data that are stored in the user's browser. They are used to store user-specific information.
- visit:-
    - https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

- Example:-
    - res.cookie('username', 'john doe');
    - res.clearCookie('username');

## Steps to use cookies:-

- npm install cookie-parser
- const cookieParser = require('cookie-parser');
- app.use(cookieParser());

- Example:-
    - app.get('/setname', (req, res) => {
        res.cookie('username', 'john doe');
        res.send('sent you a cookie');
    });

    - app.get('/getname', (req, res) => {
        const name = req.cookies.username;
        res.send(`hey ${name}`);
    });

## Signed Cookies:-

- Signed cookies are a way to ensure that the cookie has not been tampered with. It is a way to verify the integrity of the cookie.

- For more information visit:- https://www.npmjs.com/package/cookie-parser

- Example:-
    - app.use(cookieParser('thisismy secret'));

    - app.get('/getsignedcookie', (req, res) => {
        res.cookie('fruit', 'grape', { signed: true });
        res.send('signed your fruit cookie');
    });

    - app.get('/verifyfruit', (req, res) => {
        console.log(req.signedCookies);
        res.send(req.signedCookies);
    });


# What is State?

- State is a concept that is used to store information about the user. It is used to remember the user's data from one request to another.

- Example:-
    - User authentication
    - Shopping cart
    - User preferences

- Mainly there are two types of state:-
    - Stateful protocol
    - Stateless protocol

## Stateful protocol:-

- Stateful Protocol require server to save the status and session information.
- e.g. FTP

## Stateless protocol:-

- Stateless Protocol does not require server to save the status and session information.
- e.g. HTTP

# Express Session:-

- Express-session is a middleware that is used to store the session information on the server.
- For more information visit:- https://www.npmjs.com/package/express-session

## Steps to use express-session:-

- npm install express-session
- const session = require('express-session');
- app.use(session ({ secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: true }));

where:-

- secret:- is used to sign the session ID cookie
- resave:- forces the session to be saved back to the session store
- saveUninitialized:- forces a session that is "uninitialized" to be saved to the store
- cookie:- settings for the session ID cookie (
    e.g. 1) maxAge = 1000 * 60 * 60 * 24 * 7 (1 week),
         2) secure = true (cookie will only be sent over HTTPS),
         3) httpOnly = true (cookie will not be accessible from the client side),
         4) sameSite = 'strict' (cookie will only be sent in a first-party context and not be sent along with requests initiated by third party websites),
         5)expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) (cookie will expire after 1 week)
    )

- Example:-
    - app.get('/viewcount', (req, res) => {
        if (req.session.count) {
            req.session.count += 1;
        } else {
            req.session.count = 1;
        }
        res.send(`you have viewed this page ${req.session.count} times`);
    });

## Flash Messages:-

- Flash messages are used to display a message to the user. They are used to show the user a message that is only displayed once.

### Steps to use flash messages:-

- npm install connect-flash
- const flash = require('connect-flash');
- app.use(flash());

- Example:-
    - app.get('/fakeerror', (req, res) => {
        req.flash('error', 'Something went wrong');
        res.redirect('/error');
    });

    - app.get('/error', (req, res) => {
        res.status(500).send(req.flash('error'));
    });

# res.locals:-

- res.locals is an object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request/response cycle (if any).

- For more information visit:- https://expressjs.com/en/api.html#res.locals

- Example:-
    - app.use((req, res, next) => {
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
        next();
    });

    - app.get('/fakeerror', (req, res) => {
        req.flash('error', 'Something went wrong');
        res.redirect('/error');
    });

    - app.get('/error', (req, res) => {
        res.status(500).send(req.flash('error'));
    });
    

# Authentication and Authorization:-

- Authentication is the process of verifying the identity of a user.
- Authorization is the process of verifying what specific application ,files,and data a user has access to.

## Storing of Password:-

- Never store the password in plain text.
- Always store the password in encrypted form(hashed form).

### Hashing:-

- For every input ,their is a fixed length output.
- It is a one way function,we can't get the original input from the output.
- For a different input, the output will be different but of same length.
- Small change in input will result in a large change in output.
- e.g. bcrypt,scrypt,argon2,sha256,etc.

-Foe more information visit:- https://en.wikipedia.org/wiki/Cryptographic_hash_function

### Salting:-

- Salting is a technique used to make the password hash unique.
- It is used to protect against dictionary attacks,brute force attacks, and rainbow table attacks.
- For more information visit:- https://en.wikipedia.org/wiki/Salt_(cryptography)

### Passport:-

- Passport is an authentication middleware for Node.js. It is used to authenticate requests.

- For more information visit:- http://www.passportjs.org/

#### Steps to use passport:-

- npm i passport
- npm i passport-local
- npm i passport-local-mongoose

- const passport = require('passport');
- const LocalStrategy = require('passport-local');
- const User = require('./models/user');

- app.use(passport.initialize());
- app.use(passport.session());

- passport.use(new LocalStrategy(User.authenticate()));

- passport.serializeUser(User.serializeUser());
- passport.deserializeUser(User.deserializeUser());

- Example:-
    - app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
        req.flash('success', 'welcome back');
        res.redirect('/listings');
    });

    - app.get('/logout', (req, res) => {
        req.logout();
        req.flash('success', 'Goodbye');
        res.redirect('/listings');
    });

#### Configuring stratergy:-

- passport.initialize():- A middleware that initializes passport.
- passport.session():- A middleware that alters the req object and change the 'user' value that is currently the session id (from the client cookie) into the true deserialized user object.
- passport.use(new LocalStrategy(User.authenticate())):- A middleware that is used to configure the local strategy with passport. It takes a User model and uses the authenticate method of the User model to authenticate the user.
- passport.serializeUser(User.serializeUser()):- A middleware that is used to serialize the user. It is used to determine which data of the user object should be stored in the session.
- passport.deserializeUser(User.deserializeUser()):- A middleware that is used to deserialize the user. It is used to retrieve the user data from the session.

#### Steps to use passport in Wanderlust:-

- Create a new file named user.js in models folder
- Create a new file named users.js in routes folder
- In user.js, require the mongoose and passport-local-mongoose
- In user.js, create a new user schema and plugin the passport-local-mongoose
- In users.js, require the express and router
- In users.js, create a new router and export it
- In views folder,create a users folder.
- In users folder, create a new file named login.ejs
- create a new file named signup.ejs in users folder
- In app.js, require the users.js file and use the routes
- In app.js, require the passport and configure the passport
- In app.js, require the express-session and use the session
- In app.js, require the connect-flash and use the flash
- In app.js, create a new middleware to pass the flash messages to the views
- In app.js, create a new middleware to pass the user information to the views
- In app.js, create a new middleware to check if the user is authenticated
- In app.js, use the passport.authenticate middleware in the login route
- In app.js, use the passport.authenticate middleware in the register route
- In app.js, use the passport.authenticate middleware in the logout route


#### Authentication in passport:-

- passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }):- A middleware that is used to authenticate the user. It takes the local strategy and options as arguments. If the authentication fails, it will flash the error message and redirect to the login page.

- req.isAuthenticated():- A method that is used to check if the user is authenticated. It returns true if the user is authenticated, otherwise false. refer(new route in listing.js)

#### For Login and Logout:-

- req.login():- A method that is used to log in the user. It takes the user object and a callback as arguments. It will log in the user and create a session for the user.(used to perform automatic login after signup)
- req.logout():- A method that is used to log out the user. It will destroy the session and log out the user.

#### To redirect the user to the previous page after login:-

- req.session.returnTo = req.originalUrl:- A method that is used to store the original URL in the session. 

ex:-
in middleware.js
and in login route of user.js


## Authorization:-

- Authorization is the process of verifying what specific application,files,and data a user has access to.

- For more information visit:- https://en.wikipedia.org/wiki/Authorization

- Example:-
    - Admin
    - User
    - Moderator
    
- In Wanderlust, we have two types of users:-

    - User

    1) User:-
        - Can view the listings
        - Can add the review
        - Can delete the review
        - Can view the profile
        - Can edit the profile
    
    2) Admin:-

        - Can view the listings
        - Can add the review
        - Can delete the review
        - Can view the profile
        - Can edit the profile
        - Can delete the listing

# MVC(Model-View-Controller):-


- Model:-
    - Model is used to represent the data of the application.
    - It is used to interact with the database.
    - It is used to perform the business logic of the application.

- View:-
    - View is used to represent the user interface of the application.
    - It is used to display the data to the user.
    - It is used to take the input from the user.

- Controller:-
    - Controller is used to control the flow of the application.
    - It is used to interact with the model and view.
    - It is used to handle the request and response of the application.


# router.route():-

- router.route() is a method that is used to create a new route. It is used to chain multiple route handlers for a single route.

- For more information visit:- https://expressjs.com/en/4x/api.html#router.route
- example:-
    - router.route('/')
        .get(catchAsync(listings.index))
        .post(isLoggedIn, validateListing, catchAsync(listings.createListing));

# Add Stars in Review:-

visit:- https://github.com/LunarLogic/starability?tab=readme-ov-file

# Upload Image:-

1. use enctype="multipart/form-data" in form tag to upload image.(in new.ejs)
2. npm install multer(for handling multipart/form-data)(visit:- https://www.npmjs.com/package/multer)
3. const multer = require('multer');
4. Used in create and index route of listing.js(route) ex:-post(upload.single("listing[image]"),(req,res)=>{
# Cloud Setup:-

## Cloudinary:-

- Cloudinary is a cloud-based image and video management service. It is used to store, manage, and deliver images and videos for web and mobile applications.

- For more information visit:- https://cloudinary.com/

## .env:-

- .env is a file that is used to store the environment variables. It is used to store the sensitive information like API keys, passwords, and other secrets.

- For more information visit:- https://www.npmjs.com/package/dotenv

### Steps to use .env:-

- npm install dotenv
- require('dotenv').config();
- Example:-
    - require('dotenv').config();
    - console.log(process.env.SECRET);

# Store Files:-

## Multer store cloudinary:-

- Multer storage engine for Cloudinary. It is used to store the files in Cloudinary.
- npm install multer-storage-cloudinary
- const cloudinary = require('cloudinary').v2;
- const { CloudinaryStorage } = require('multer-storage-cloudinary');
- const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Wanderlust',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

- const upload = multer({ storage });

form(file)
    |
backend(parse)
    |
cloudinary(store)
    |
URL/link(file)
    |
MongoDB(store)

### mongoDB(store) :-

- We can store the URL and file name in the database.
- To store following are the steps:-

    - Create a new field in the model to store the URL.
#### In controllers folder:-
    - Extract the URL and filename from req.file(req.file.filename,req.file.path);
    - In the create route, store the URL in the database.
    - In the show route, display the image using the URL.
    - In the edit route, update the URL in the database.

#### In routes folder:-
    - In the create route, use the upload middleware to upload the image.

#### In views folder:-
    - In the new.ejs file, add the enctype attribute to the form tag.
    - In the show.ejs file, display the image using the URL.
### Image preview for upload page(Image resizing):-

    - In the edit.ejs file, add a div to display the image preview.
    - In the listing.js(controllers) file
            - let originalImageUrl = listing.image.url;
            - originalImageUrl = originalImageUrl.replace("/upload","/upload/w_300");
            - res.render('listings/edit', { listing, originalImageUrl });
    - In the edit.ejs file, add the image preview using the originalImageUrl.

    For more information visit:- https://cloudinary.com/documentation/image_transformations

# Maps:-

- use mapbox for maps(visit:- https://www.mapbox.com/)

- visit https://docs.mapbox.com/guides/getting-started/ for more information

## Steps to use mapbox:-

- Create an account on Mapbox.
- Create a new access token(in .env file).
- Add a new style.
- Create a new map_scr.js inside public/js.
- Add this script file in show.ejs file also add #map div in it.

## Geocoding:-

- Geocoding is the process of converting an address(like street address) into geographic coordinates(latitude and longitude),which can used to place markers on a map,or position the map.

### visit https://docs.mapbox.com/api/search/geocoding/ for more information to add manually.

Forward Geocoding:-

- Forward geocoding is the process of converting an address into geographic coordinates.

- For more information visit:- https://docs.mapbox.com/api/search/geocoding/#forward-geocoding

Backward Geocoding:-

- Backward geocoding is the process of converting geographic coordinates into an address.

- For more information visit:- https://docs.mapbox.com/api/search/geocoding/#reverse-geocoding

OR

###  mapbox-sdk-js:-

- Mapbox SDK for JavaScript. It is used to interact with the Mapbox API.

- For more information visit:- https://www.github.com/mapbox/mapbox-sdk-js     AND  
https://github.com/mapbox/mapbox-sdk-js/blob/main/docs/services.md#forwardgeocode-1

### To store the location coordinates in the database:-

- Use GeoJSON to store the location coordinates in the database.

- For more information visit:- https://docs.mongodb.com/manual/geospatial-queries/

- Steps to use GeoJSON:-

    - Create a new field in the model to store the location coordinates.(
        e.g. location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }
    )
    - In the create route, store the location coordinates in the database.

### To display the location on the map:-

- Use markers to display the location on the map. (
    e.g. const marker = new mapboxgl.Marker()
        .setLngLat([77.5946, 12.9716]) //coordinates
        .setPopup(new mapboxgl.Popup().setHTML('<h1>Bangalore</h1>'))
        .addTo(map);
    )
)

For more information visit:- https://docs.mapbox.com/mapbox-gl-js/api/markers/

### To change the map style:-

- Use the map.setStyle() method to change the map style. (
    e.g. map.setStyle('mapbox://styles/mapbox/streets-v11');
    )
)



# Mongo Atlas:-

- MongoDB Atlas is a cloud-based database service that is used to store the data in the cloud.

## Steps:-

- Create an account on MongoDB Atlas.
- Create a new cluster.
- Connect the application to the MongoDB Atlas.

### To connect the application to MongoDB Atlas:-

- Create a new cluster in MongoDB Atlas.
- Create a new user in the database.
- Whitelist the IP address.
- Connect the application to the MongoDB Atlas.

- Instead of using the local MongoDB, we can use the MongoDB Atlas to store the data in the cloud.
- The MongoDB Atlas link are available in the cluster section of the MongoDB Atlas.

- For more information visit:- https://www.mongodb.com/cloud/atlas

# Deployment:-

- Deployment is the process of making the application available to the users.

1) Render:-
    - Render is a cloud-based platform that is used to deploy the application.

    - For more information visit:- https://www.render.com/

2) Netlify:-
    - Netlify is a cloud-based platform that is used to deploy the application.

    - For more information visit:- https://www.netlify.com/

3) Cyclic:-
    - Cyclic is a cloud-based platform that is used to deploy the application.

    - For more information visit:- https://www.cyclic.sh/