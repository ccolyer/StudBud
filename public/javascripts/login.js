// -- HTML elements -- //
const loginForm = document.getElementById('loginForm');
const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');

// -- HTML event listeners -- //
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    logIn(
        loginEmailInput.value,
        loginPasswordInput.value
    );
});

// -- Functions that actually do stuff -- //
function logIn(email, password) {
    console.log('Logging user in!');
    const stringUser = localStorage.getItem('studBudUser');
    if (stringUser) {
        const user = JSON.parse(stringUser);
        if (email === user.email && password === user.password) {
            document.location.href = '/dashboard';
        } else {
            alert('Wrong email or password.');
        }
    } else {
        alert('No user exists.');
    }
}