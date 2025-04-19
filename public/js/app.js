let database = [
    {
        name: "Youssef Labib",
        email: "youssef@gmail.com",
        age: 19,
        password: '123456789#',
        balance: 1000,
        history: [],
        loan: 0
    }
];

class User {
    constructor(name, email, age, password) {
        this.name = name
        this.email = email
        this.age = age
        this.password = password
        this.balance = 1000
        this.history = []
        this.loan = 0
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

//& LOGIN
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
        dashboard(user)
    }
}

//& CHANGE PASSWORD
function changePassword() {
    let email = prompt("Enter your email.").trim().toLowerCase();
    let user = database.find(e => e.email === email)

    if (!user) {
        alert("This email does not exist!")
        return
    }

    let currentPassword = prompt("Enter your current password.")
    if (user.password !== currentPassword) {
        alert("Incorrect password!")
        return
    }

    let newPassword = prompt("Enter your new password.")
    newPasswordConfirmed = prompt("Confirm your password.")

    function verifChangedPassword() {
        while (newPassword.length < 7 || !/[@#\-+*/]/.test(newPassword) || /\s/.test(newPassword) || newPassword !== newPasswordConfirmed) {
            if (newPassword !== newPasswordConfirmed) {
                alert("Password does not match!");
            } else {
                alert("Enter a strong password with atleast 1 special character.");
            }
            newPassword = prompt("Enter a strong password!");
            newPasswordConfirmed = prompt("Confirm your password.");
        }
    }

    newPassword = verifChangedPassword();

    user.password = newPassword;
    alert("Password changed successfully!")

}

//& DASHBOARD
function dashboard(user) {
    while (true) {
        let choice = prompt("Choose between these services: Logout | Withdraw Money | Deposit Money | Take a Loan | Invest | History").toLowerCase();

        switch (choice) {
            case "logout":
                alert("Logout successful")
                return;
            case "withdraw":
                withdraw(user)
                break;
            case "deposit":
                deposit(user)
                break;
            case "loan":
                // ndkhlo lfunction d loan
                break;
            case "invest":
                // ndkhlo lfunction d invest
                break;
            case "history":
                history(user)
            break;

            default:
                alert("Please choose a valid service, try again!")
                break;
        }
    }
}

//& WITHDRAW 
function withdraw(user) {
    let amount = parseFloat(prompt("How much you want to withdraw ?"))

    if (amount <= user.balance) {
        user.balance -= amount
        alert(`${user.name} withdrawn ${amount.toFixed(2)}$.`)
        user.history.push(`Withdrawal of ${amount.toFixed(2)}$`)
    }
    else {
        alert("Insufficient balance")
    }
    return;
}

//& DEPOSIT
function deposit(user) {
    let amount = parseFloat(prompt("Enter an amount to deposit (do not exceed 1000 dollar)"))

    if (amount <= 1000) {
        user.balance += amount
        alert(`${user.name} deposited ${amount.toFixed(2)}$`)
        user.history.push(`Deposit of ${amount.toFixed(2)}$`)
    }
    else {
        alert("You can't deposit more than 1000$")
    }
}

//& HISTORY
function history(user) {
    if (user.history.length <= 0) {
        alert("No recent activity")
    } else {
        alert(`Recent activity:\n${user.history.join("\n")}`)
    }
} 

//! ## 3 - Instructions:
// - Account Creation and Management:
//     + Allow the user, via prompts, to choose between signing up, logging in, or changing the password.
//     + If the user only writes "exit," they exit the current process, and the choice question is asked again.

//         ~ After the user logs in, display the amount they have in their bank (user's choice) and offer them services:
//?             # Logout:
//             - If the user chooses this option, they are logged out and offered the option, as at the beginning, to sign up, log in, or change the password.

//?             # Withdraw Money:
//             - If the user chooses this option, they can withdraw an amount from their bank (not exceeding the available amount).

//?             # Deposit Money:
//             - If the user chooses this option, they can deposit the desired amount (not exceeding 1000 dirhams).

//?             # Take a Loan:
//             - If the user chooses this option, they can take a loan up to 20% of what they already have.
//             - They receive an additional 20%, but lose 10% with each login until reaching the amount of their loan.

//?             # Invest:
//             - If the user chooses this option, they can invest any amount in the bank.
//             - Upon the next login, they will receive 20% of their investment each time until reaching 120% (earning 20% on each investment).

//?             # History:
//             - Ability to view the entire transaction history.


//& MAIN PAGE PROMPT
let ask = prompt("Choose between: sign up | login | change password | exit").toLowerCase();

while (ask !== "exit") {
    if (ask === "sign up") {
        signup();
    } else if (ask === "login") {
        login();
    } else if (ask === "change password") {
        changePassword();
    } else {
        alert("Invalid choice, try again!");
    }

    ask = prompt("Choose between: sign up | login | change password | exit").toLowerCase();
}
alert("See you later.");
