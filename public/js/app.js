let database = []

class User {
    constructor(name, email, age, password) {
        this.name = name
        this.email = email
        this.age = age
        this.password = password
        this.balance = 1000
        this.history = []
    }
}

//& SIGN UP
function signup() {
    let name = prompt("Enter your full name.").trim();

    function verifName() {
        while (name.replace(/\s/g, '').length < 5 || /[0-9@#\-+*/$!%^&*_()?]/.test(name)) {
            name = prompt("Enter a valid name!").trim();
        }
        return name.split(' ').map(e => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(' ');
    };

    name = verifName();

    let email = prompt("Enter your email.").trim().toLowerCase();

    function verifEmail() {
        while (true) {
            if (email.length < 10 || email.includes(" ") || !email.includes('@') || email.split('@').length !== 2) {
                alert("Enter a valid email (at least 10 characters!).")
            } else if (database.some(e => e.email === email)) {
                alert("This email is already used!")
            } else {
                break;
            }
            email = prompt("Enter your email.").trim().toLowerCase()
        }
        return email
    };

    email = verifEmail();
    
    let age = prompt("Enter your age.").trim();
    
    function verifAge() {
        while (age.length === 0 || age.length > 2 || !/^\d+$/.test(age)) {
            age = prompt("Enter a valid age!").trim();
        }
        return parseInt(age);
    };
    
    age = verifAge();
    
    let password = prompt("Enter a strong password!");
    let passwordConfirmed = prompt("Confirm your password.");

    function verifPassword() {
        while (password.length < 7 || !/[@#\-+*/]/.test(password) || /\s/.test(password) || password !== passwordConfirmed) {
            if (password !== passwordConfirmed) {
                alert("Password does not match!");
            } else {
                alert("Enter a strong password with atleast 1 special character.");
            }
            password = prompt("Enter a strong password!");
            passwordConfirmed = prompt("Confirm your password.");
        }
        return password;
    };

    password = verifPassword();
    
    let user = new User(name, email, age, password);
    database.push(user);
    
    console.table(database);
};

// //& LOGIN
function login() {
    let email = prompt("Enter your email.").trim().toLowerCase();
    let user = database.find(e => e.email === email)
    if (!user) {
        alert("This email does not exist!")
        return
    }

    let password = prompt("Enter your password.")
    if (user.password !== password) {
        alert("Incorrect password!")
    } else {
        alert(`Login successful. Welcome back to your account, ${user.name} \nYour balance is ${user.balance.toFixed(2)}$`)
    }
}

//& MAIN PAGE PROMPT
let ask = prompt("Choose between: sign up | login | change password | exit").toLowerCase()

while (ask !== "exit") {
    if (ask === "sign up") {
        signup();
    } else if (ask === "login") {
        login();
    } else if (ask === "change password") {
        changePassword();
    }
    ask = prompt("Choose between: sign up | login | change password | exit").toLowerCase();
}
alert("See you later.");
