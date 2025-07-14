// We define a constant variable to store the base URL of the API (in this case, our JSON Server).
const API_URL = 'http://localhost:3000';

// We obtain and ID and listen to the “submit” event of the form.
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // We prevent the form from reloading the page.

    // We obtain the values of the form fields according to their ID.
    const fullname = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Regular expression to validate that the name has NO numbers or special characters.
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    // A-Z, → Any capital letter is allowed here.
    // a-z, → Any lowercase letter is allowed here.
    // ÁÉÍÓÚ, → Here you allow accented capital letters.
    // áéíóú, → Here it allows accented lowercase letters.
    // Ññ, → Here you can use uppercase or lowercase ñ.
    // \s → Here allow any blank space.

    try {
        // We get all existing users from the API.
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();

        // We check if the email already exists.
        const emailExists = users.some(user => user.email === email);

        // Validations.

        // Here we validate that none of the form fields are empty.
        if (!fullname || !email || !password || !confirmPassword) {
            // If they are empty, we use the “SweetAlert” library to inform the user.
            Swal.fire({
                icon: "error",
                title: "Fields required",
                text: "Please fill in all fields before continuing.",
            });

            // If the entry does not meet the requirements, the user will be informed.
        } else if (!nameRegex.test(fullname)) {
            Swal.fire({
                icon: "error",
                text: "Name cannot contain numbers or special characters.",
            });
        } else if(emailExists) {
            Swal.fire({
                icon: "error",
                title: "Already exists!",
                text: "This email already exists.",
            });
        } else if (password != confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Passwords are not the same."
            });
        } else {
            // If the email do not exist, we send the data to the API using fetch with POST method.
            const res = await fetch(`${API_URL}/users`, {
                method: 'POST', // Here we indicate to the system that a POST (Create) method will be done.
                headers: { 'Content-Type': 'application/json' }, // Here we indicate that we send JSON.
                body: JSON.stringify({ fullname, email, password }) // We convert the JS object to JSON.
            });

            // If the request was successful, the user is informed of the user creation.
            Swal.fire({
                icon: "success",
                title: "Welcome!",
                text: "User registered successfully.",
                timer: 10000,
                showConfirmButton: false
            })
            
            if (res.ok) {
                setTimeout(() => {
                    document.getElementById('registerForm').reset(); // We clean the inputs of the form.
                }, 10000); // 10000 ms = 10 seconds.
            } else {
                Swal.fire('Error', 'Could not register the user', 'error');
            }
        }

    } catch (error) {
        // If an error occurs in the request (e.g. the server does not respond) the user is informed.
        console.error('Error:', error);
        Swal.fire('Error', 'An error occurred while registering the user', 'error');
    };
});
