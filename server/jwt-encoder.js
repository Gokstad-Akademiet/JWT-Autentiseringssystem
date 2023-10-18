const sign = require('jwt-encode');
const secret = 'morro med sikkerhet';
const data = {
  iss: 'Egil Skjelbred',
  sub: 'Undervisning i sikkerhet',
  aud: 'Studentene i Frontend-utvikling',
  exp: '2023-10-21T00:00+01.00',
  nbf: '2023-10-20T00:00+01.00',
  iat: '2023-10-18T14:27+01.00',
  jti: '1'
};

const jwt = sign(data, secret);
console.log(jwt);