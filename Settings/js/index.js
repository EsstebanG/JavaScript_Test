// We define a constant variable to store the base URL of the API (in this case, our JSON Server).
const APP_URL = "http://localhost:3000";  // URL of the backend API

// We obtain the values of the form fields according to their ID.
let form = document.getElementById("loginForm");

// Listen to the “submit” event of the form.
form.addEventListener("submit", (e) => {
    e.preventDefault(); // We prevent the form from reloading the page.

    auth(); // Call the authentication function
});

// ----------------------------------------------------------------------------------------

async function auth() {
    try {
        // We obtain the values of the form fields according to their ID.
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        // Fetch all users from the backend
        const res = await fetch(APP_URL + "/users");
        const users = await res.json();

        const userAdmin = users.find(user =>
            email == "RIWI123@gmail.com" && password == "123"
        );

        // Find user matching email and password.
        const userFound = users.find(user =>
            email == user.email && password == user.password
        );
        
        // ----------------------------------------------------------------------------------------

        // Validations.

        // Check if fields are empty
        if (!email || !password) {
            Swal.fire({
                icon: "warning",
                title: "Fields required",
                text: "Please fill in all fields before continuing.",
            });
        } else if(userAdmin) {
            localStorage.setItem("role", "admin");
            sessionStorage.setItem("role", "admin");
            sessionStorage.setItem("fullName", "Robinson");

            // Show success alert and then redirect to ???.
            Swal.fire({
                icon: "success",
                title: "Welcome Admin!",
                text: "Session started successfully.",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "/Settings/pages/events.html"; // Redirect to events.html
            });
        } else if (userFound) {
            // Save user data in session and localStorage
            localStorage.setItem("role", "visitor");
            sessionStorage.setItem("role", "visitor");
            
            // Show success alert and then redirect to index.html
            Swal.fire({
                icon: "success",
                title: "Welcome Visitor!",
                text: "Session started successfully.",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "/Settings/pages/events.html"; // Redirect to events.html
            });
        } else {
            // Show error if user not found
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "This user does not exist or password is incorrect.",
            });
        }

    } catch (error) {
        console.log("ERROR", error);
        // Show general error alert
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Internal server error.",
        });
    }
}