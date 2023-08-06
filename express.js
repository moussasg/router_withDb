const express = require('express');
const app = express(); // Add parentheses to call the express function
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors())
app.use(express.json());
// Use the CheckUser middleware for all routes
const dbURI = 'mongodb+srv://myjwt:9IzN7JaizU41xKTY@cluster0.lseehws.mongodb.net/jwt?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => { /// 1/.then(()=>{}) / 2/.catch((error)=> {})
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log('Unable to connect to the database', error);
  }); // 2)défini schema
const userSchema = new mongoose.Schema({ // userSchema ndiroh dakhel Model
  email: String,
  password: String,
}); 
// 3) User défini model important on réutilise fel post+Get !!! important
const User = mongoose.model('User', userSchema); // Model ndirolo dakhelo email,password , req data sent to the api
/// 4) définie les function postes / get /  use
app.post('/signup', async (req, res) => { 
  const { email , password } = req.body; 
  try {// début de try
    const newUser = new User({email , password }); /// User = model
    await newUser.save();
    return res.status(200).json({ success: true , email:newUser.email , password:newUser.password}); // pour récupéré email
  } // fin de try // return dans res trés trés trés trés important // il faut précisé quoi a extraire
  catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: 'Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur' });
  }
}); // get
app.get('/signup', async (req , res) => { /// GET c trés important pour q'uil cherche dans la base de donné
const { email , password } = req.query; // Objet {req.query} Pour récupérer des paramètres dans une requête HTTP c trés imprtants chriki !!!!!!!!!!!!!
  try { // début de try
    const ancienuser = await User.findOne({ email, password }); /// ancienuser const li t7wss find fel model
    res.json({ exists: ancienuser !== null });// si il existe ancienuser , ancienuser n'est pas nul
  } // fin de try / 'exists' fixe prédifinie / 
  catch (err) {
    console.error("Une erreur s'est produite lors de la vérification de l'utilisateur", err);
  }
});//use
app.use((req, res, next) => { // A C A O 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); //5) port 
app.listen(3001, () => {
  console.log('Server started on port 3002');
});