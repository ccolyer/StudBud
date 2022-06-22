// -- HTML elements -- //
const signUpForm = document.getElementById('signUpForm');
const signUpEmailInput = document.getElementById('signUpEmail');
const signUpNameInput = document.getElementById('signUpName');
const signUpPasswordInput = document.getElementById('signUpPassword');

// -- HTML event listeners -- //
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    createUser(
        signUpEmailInput.value,
        signUpNameInput.value,
        signUpPasswordInput.value
    );
});

// -- Functions that actually do stuff -- //
function createUser(email, name, password) {
    console.log('Creating a user!!');
    localStorage.setItem('studBudUser', JSON.stringify({
        email,
        name,
        password
    }));
    alert(`Congratulations ${name}, you are now a StudBud!`);
    console.log('User is:', localStorage.getItem('studBudUser'));
    document.location.href = '/login';
}