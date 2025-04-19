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
}

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
        let choice = prompt("Choose between these services: Logout | Withdraw | Deposit | Loan | Invest | History").toLowerCase();

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
                loan(user)
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

    if (isNaN(amount) || amount <= 0) {
        alert("Invalid input, please enter a valid amount of money.");
        return;
    }

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

    if (isNaN(amount) || amount <= 0) {
        alert("Invalid input, please enter a valid amount of money.");
        return;
    }

    if (amount <= 1000) {
        user.balance += amount
        alert(`${user.name} deposited ${amount.toFixed(2)}$`)
        user.history.push(`Deposit of ${amount.toFixed(2)}$`)
    }
    else {
        alert("You can't deposit more than 1000$")
    }
}

//& LOAN
function loan(user) {
    if (user.loan > 0) {
        alert(`You already have an active loan of ${user.loan.toFixed(2)}$. Please repay it before taking another one.`)
        return
    }

    let maxLoan = user.balance * 0.2
    let confirmLoan = prompt("How much you want to borrow ? (you can't exceed 20% of your actual balance)")
    let amount = parseFloat(confirmLoan)

    if (amount > maxLoan || isNaN(amount) || amount <= 0) {
        alert("Invalid loan amount! (do not exceed 20% of your balance)");
        return;
    }

    user.balance += amount;
    user.loan = amount;
    alert(`Loan successfully received.\nAmount credited: ${user.loan}`);
    user.history.push(`Took a loan of ${amount.toFixed(2)}$`);
}

//& HISTORY
function history(user) {
    if (user.history.length <= 0) {
        alert("No recent activity")
    } else {
        alert(`Recent activity:\n${user.history.join("\n")}`)
    }
}

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
