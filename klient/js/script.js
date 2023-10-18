async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, sub: username, aud: 'myAppId' })
        });

        // Sjekk om responsen er OK (statuskode 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.token) {
            alert('Login success!');
            localStorage.setItem('jwt', data.token);
            document.getElementById('encodedToken').textContent = data.token;
            const decodedPayload = atob(data.token.split('.')[1]);
            document.getElementById('decodedToken').textContent = JSON.stringify(JSON.parse(decodedPayload), null, 2);
            document.getElementById('jwtInfo').style.display = 'block';
        } else {
            throw new Error('No token received');
        }
    } catch (error) {
        console.error('There was a problem with the login:', error);
        alert('Login failed!');
        document.getElementById('jwtInfo').style.display = 'none';
    }
}
