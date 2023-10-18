require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 3000;
/* const SECRET_KEY = 'mysecretkey';
 */
const SECRET_KEY = process.env.SECRET_KEY;


app.use(express.json());
app.use(cors());

// En enkel brukerdatabase (for demonstrasjon)
/* 
    username: john
    password: password123

    username: egil
    password: pass1234
    
    username: silje
    password: !59fd0#ds
*/
const users = [
    {
        id: 1,
        username: 'john',
        password: '$2a$08$./5EMKZE7ffzTbFz3oCe.OW7ihOUhb1ro7Ri8qvHIMGYluCJwENUS'
    },
    {
        id: 2,
        username: 'egil',
        password: '$2a$08$3lu4TPZsUcNr8726MsnyhOKHMLoSPjfGVMKbsPhfsncHt77xSutzW'
    },
    {
        id: 3,
        username: 'silje',
        password: '$2a$08$VIVcibzyRYtGF.X.pSjPzOOVsbis0xrMNLj3VYvUpHFgV21MMbJpO'
    },
];

app.post('/login', (req, res) => {
    const { sub, aud } = req.body;

    const user = users.find(u => u.username === req.body.username);

    if (!user) return res.status(404).send('User not found.');

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) return res.status(401).send('Invalid password.');

    const token = jwt.sign({
        iss: 'Egil',       // Issuer
        sub: sub,              // Subject (for eksempel bruker-ID)
        aud: aud,              // Audience (for eksempel en klient-app-ID)
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // Expires in 1 hour
        nbf: Math.floor(Date.now() / 1000) + (60 * 5),  // Not valid before 5 minutes from now
        iat: Math.floor(Date.now() / 1000), // Issued at
        jti: Math.random().toString(36).substring(7) // JWT ID (random string for demonstration)
    }, SECRET_KEY);

    res.status(200).send({ auth: true, token: token });
});

app.get('/dashboard', (req, res) => {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        res.status(200).send(decoded);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
