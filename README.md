# JWT Autentiseringssystem

Dette prosjektet demonstrerer et JWT autentiseringssystem med en server- og klientdel. Serverdelen er bygget med Express og klientdelen er en enkel HTML-side med JavaScript-funksjonalitet for innlogging.

## Innholdsfortegnelse

- [Installasjon og Oppsett](#installasjon-og-oppsett)
- [JWT Encoding](#jwt-encoding)
- [Server](#server)
  - [Express Autentisering](#express-autentisering)
    - [Oppsett](#oppsett)
    - [Brukerdatabase](#brukerdatabase)
    - [Ruter](#ruter)
    - [Login](#login)
    - [Dashboard](#dashboard)
  - [Kjøring](#kjøring)
- [Klient](#klient)
  - [HTML Struktur](#html-struktur)
  - [JavaScript Funksjonalitet](#javascript-funksjonalitet)

## Installasjon og Oppsett

For å komme i gang med prosjektet, følg disse trinnene:

1. **Klon repoet:**
   For å klone repoet til din lokale maskin, kjør følgende kommando i terminalen:

   ```bash
   git clone https://github.com/Gokstad-Akademiet/JWT-Autentiseringssystem.git
   ```

2. **Naviger til prosjektmappen:**

   ```bash
   cd JWT-Autentiseringssystem
   ```

3. **Installer nødvendige avhengigheter:**
   Kjør følgende kommando for å installere alle nødvendige avhengigheter for prosjektet:

   ```bash
   npm install
   ```

4. **Opprett en environment-fil:**
   For at koden skal virke som nødvendig trenger du å lage en `.env` som inneholder følgende:

   ```js
   SECRET_KEY = mysecretkey;
   ```

5. **Start prosjektet:**
   Etter at alle avhengigheter er installert, kan du starte prosjektet med:
   ```bash
   npm start
   ```

Følg deretter instruksjonene i de neste seksjonene for å forstå hvordan systemet fungerer og hvordan du kan interagere med det.

## JWT Encoding

### Innhold

- [Oppsett](#oppsett)
  - [Modulimport](#modulimport)
  - [Hemmelig nøkkel](#hemmelig-nøkkel)
- [Data for Token](#data-for-token)
- [Generering av Token](#generering-av-token)
- [Utskrift av Token](#utskrift-av-token)

Denne koden demonstrerer hvordan man kan generere en JWT (JSON Web Token) ved hjelp av `jwt-encode` biblioteket.

### Oppsett

Først, last inn nødvendige moduler:

```js
const sign = require("jwt-encode");
```

Definer hemmelig nøkkel:

```js
const secret = "morro med sikkerhet";
```

### Data for Token

Definer dataen som skal inkluderes i JWT:

```js
const data = {
	iss: "Egil Skjelbred",
	sub: "Undervisning i sikkerhet",
	aud: "Studentene i Frontend-utvikling",
	exp: "2023-10-21T00:00+01.00",
	nbf: "2023-10-20T00:00+01.00",
	iat: "2023-10-18T14:27+01.00",
	jti: "1",
};
```

### Generering av Token

Generer JWT ved hjelp av dataen og den hemmelige nøkkelen:

```js
const jwt = sign(data, secret);
```

### Utskrift av Token

Til slutt, skriv ut den genererte JWT til konsollen:

```js
console.log(jwt);
```

## Server

### Express Autentisering

Denne delen av koden demonstrerer hvordan man kan sette opp en enkel autentiseringsserver ved hjelp av Express, JWT (JSON Web Tokens) og bcrypt for passordhashing.

### Innhold

- [Oppsett](#oppsett)
- [Brukerdatabase](#brukerdatabase)
- [Ruter](#ruter)
  - [Login](#login)
  - [Dashboard](#dashboard)
- [Kjøring](#kjøring)

### Oppsett

Først, last inn nødvendige moduler:

```js
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
```

Initialiser Express app:

```js
const app = express();
```

Sett opp serverporten:

```js
const PORT = 3000;
```

Hent hemmelig nøkkel fra miljøvariabler:

```js
const SECRET_KEY = process.env.SECRET_KEY;
```

Legg til middleware for å tolke JSON og håndtere CORS:

```js
app.use(express.json());
app.use(cors());
```

### Brukerdatabase

For demonstrasjonsformål er det satt opp en enkel brukerdatabase:

```js
const users = [
	{
		id: 1,
		username: "john",
		password: "$2a$08$./5EMKZE7ffzTbFz3oCe.OW7ihOUhb1ro7Ri8qvHIMGYluCJwENUS",
	},
	{
		id: 2,
		username: "egil",
		password: "$2a$08$3lu4TPZsUcNr8726MsnyhOKHMLoSPjfGVMKbsPhfsncHt77xSutzW",
	},
	{
		id: 3,
		username: "silje",
		password: "$2a$08$VIVcibzyRYtGF.X.pSjPzOOVsbis0xrMNLj3VYvUpHFgV21MMbJpO",
	},
];
```

### Ruter

### Login

Brukere kan logge inn ved å sende en POST forespørsel til `/login`:

```js
app.post("/login", (req, res) => {
	// ... kode for autentisering og token generering ...
});
```

### Dashboard

Brukere kan få tilgang til dashboardet ved å sende en GET forespørsel til `/dashboard` med en gyldig JWT:

```js
app.get("/dashboard", (req, res) => {
	// ... kode for token verifisering ...
});
```

### Kjøring

Til slutt, start serveren:

```js
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
```

## Klientdokumentasjon for JWT Autentiseringssystem

Denne delen av dokumentasjonen fokuserer på klientdelen av JWT autentiseringssystemet. Klienten består av en HTML-side som gir brukeren mulighet til å logge inn, samt en JavaScript-funksjon som håndterer innloggingsprosessen.

### Innholdsfortegnelse

- [HTML Struktur](#html-struktur)
- [JavaScript Funksjonalitet](#javascript-funksjonalitet)

### HTML Struktur

HTML-siden er designet for å være enkel og brukervennlig. Den består av:

- Et innloggingsskjema hvor brukeren kan skrive inn sitt brukernavn og passord.
- En seksjon som viser den genererte JWT-token informasjonen etter vellykket innlogging.

**Kodeutdrag:**

- Innloggingsskjema:

```html
<div>
	<input type="text" id="username" placeholder="Username" />
	<input type="password" id="password" placeholder="Password" />
	<button onclick="login()">Login</button>
</div>
```

- JWT-token informasjonsseksjon:

```html
<div id="jwtInfo" style="display: none;">
	<h2>JWT Token</h2>
	<textarea id="encodedToken" rows="5" cols="50" placeholder="Encoded JWT will appear here..."></textarea>
	<h2>Decoded JWT</h2>
	<pre id="decodedToken">Decoded JWT will appear here...</pre>
</div>
```

### JavaScript Funksjonalitet

JavaScript-delen håndterer innloggingsprosessen ved hjelp av en asynkron funksjon kalt `login`.

**Hovedpunkter:**

- Henter brukernavn og passord fra input-feltene.
- Sender en POST forespørsel til serveren for autentisering.
- Ved vellykket innlogging, vises den mottatte JWT-token informasjonen på siden.

**Kodeutdrag:**

- Henting av brukerdata og POST forespørsel:

```js
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const response = await fetch("http://localhost:3000/login", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ username, password, sub: username, aud: "myAppId" }),
});
```

- Håndtering av respons og visning av JWT-token informasjon:

```js
if (data.token) {
	localStorage.setItem("jwt", data.token);
	document.getElementById("encodedToken").textContent = data.token;
	const decodedPayload = atob(data.token.split(".")[1]);
	document.getElementById("decodedToken").textContent = JSON.stringify(JSON.parse(decodedPayload), null, 2);
	document.getElementById("jwtInfo").style.display = "block";
}
```
