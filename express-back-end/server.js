const Express = require('express');
const { Pool } = require("pg");
const db = require('./queries')

const App = Express();
const bodyParser = require('body-parser')
const cookieSession = require("cookie-session");
const PORT = 8080;
const cors=require("cors");
const corsOptions ={
   origin:'http://localhost:3000', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
const bcrypt = require('bcryptjs');
const saltRounds = 10;


App.use(cors(corsOptions))
App.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// Express Configuration
App.use(bodyParser.json())
App.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
App.use(Express.static('public'));

App.get('/', (req, res) => res.json({
  message: "Seems to work!",
}));

App.get('/users', db.getUsers)
App.get('/users/:id', db.getUserById)
App.get('/users/email/:email', db.findUserByEmail)

App.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const hashedPwd = await bcrypt.hash(req.body.pwd, saltRounds);
    await db.addUser(req.body.firstName, req.body.lastName, req.body.user, hashedPwd, req.body.num);
    res.status(200).send("User added");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

App.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.findUserByEmail(email)
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.user_id = user.id;
        console.log(`User ${user.id} logged in!`);
        res.redirect('/');
      } else {
        res.status(403).json({ error: 'Incorrect password' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});


App.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});