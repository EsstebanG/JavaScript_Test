let userName = localStorage.getItem("role")
let welcomeUser = document.getElementById("userWelcome")

welcomeUser.innerHTML = `Welcome ${userName}!`