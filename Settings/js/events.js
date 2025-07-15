// We define a constant variable to store the base URL of the API (in this case, our JSON Server).
export const APP_URL = "http://localhost:3000";  // URL of the backend API

let welcomeMessage = localStorage.getItem("role");
let welcomeUser = document.getElementById("userWelcome");

welcomeUser.innerHTML = `Welcome ${welcomeMessage}!`;

export const itsAdmin = sessionStorage.getItem("role") === "admin";
export const itsVisitor = sessionStorage.getItem("role") === "visitor";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Log Out section.

let btnLogOut = document.getElementById("logOutButton").addEventListener("click", (e)=> {

    e.preventDefault()

    if(itsAdmin || itsVisitor) {
        Swal.fire({
            title: "Do you want to log out?",
            showDenyButton: true,
            confirmButtonText: "Log Out",
            denyButtonText: `Cancel`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "See you soon!",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    sessionStorage.clear();
                    localStorage.clear();
                    setTimeout(() => {
                        window.location.href = "../../index.html"; // Redirect to index.html
                    }, 3000); // 3000 ms = 3 seconds.
                });
            }
        });
    } else {
        console.log("ERROR", error);

        // Show general error alert.
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Internal server error.",
        });
    };
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Events section.

if (itsAdmin) {
    let nameAdmin = sessionStorage.getItem("fullName")
    welcomeUser.innerHTML = `Welcome admin ${nameAdmin}!`;

    /* document.addEventListener('DOMContentLoaded', () => {
        const createButton = document.querySelectorAll('.create-button');
        const content = document.getElementById('content');

        const pages = {
            Table: `
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col"> Name </th>
                        <th scope="col"> Description </th>
                        <th scope="col"> Date </th>
                        <th scope="col"> Capacity </th>
                        <th scope="col"> Options </th>
                        </tr>
                    </thead>
                    <tbody id="data-form">
                        <tr>
                            <td> ${events.nameEvent} </td>
                            <td> ${events.description} </td>
                            <td> ${events.date} </td>
                            <td> ${events.capacity} </td>
                            <td>
                                <button id="buttonEdit" class="btn btn-warning"> Edit </button>
                                <button id="buttonDelete" class="btn btn-danger"> Delete </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
            Create: `
                <form class="createEventForm" id="createEventForm">
                    <h2 class="text-center"> Create Event </h2>

                    <div class="mt-3">
                        <label for="nameEvent"> Name: </label>
                        <input type="text" id="nameEvent" class="form-control" name="nameEvent" placeholder="Name event">
                    </div>

                    <div class="mt-3">
                        <label for="description"> Description: </label>
                        <input type="text" id="description" class="descriptionArea form-control" name="description" placeholder="Name event">
                    </div>
                
                    <div class="form-flex d-flex">
                        <div class="mt-3">
                            <label for="date"> Date: </label>
                            <input type="text" id="date" class="form-control" name="date" placeholder="Example: 12-31-2025">
                        </div>

                        <div class="mt-3">
                            <label for="capacity"> Capacity: </label>
                            <input type="text" id="capacity" class="form-control" name="capacity" placeholder="Capacity of event">
                        </div>
                    </div>

                    <button type="submit" id="btnCreateEvent" class="btn btn-primary"> Create </button>
                </form>
            `
        };

        function loadPage(pageName) {
            content.innerHTML = pages[pageName] || '<p> Page not found. </p>';
        }

        // Start view is "Table", its in the object "pages".
        loadPage('Table');

        createButton.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                loadPage('Create');
            });
        });
    }); */
};

if(itsVisitor){
    let createButton = document.getElementById("createButton");
    let separation = document.getElementById("hr")

    createButton.style.display = 'none';
    separation.style.display = 'none';
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

 /* async function showForm() {

    content.innerHTML = `
        
    `

    // We obtain the values of the form fields according to their ID.
    const nameEvent = document.getElementById('nameEvent').value.trim();
    const description = document.getElementById('description').value.trim();
    const date = document.getElementById('date').value.trim();
    const capacity = document.getElementById('capacity').value.trim();

    try {
        // We get all existing events from the API.
        const response = await fetch(`${APP_URL}/events`);
        const events = await response.json();

        // We check if the email already exists.
        const eventExists = events.some(event => event.name === nameEvent);

        // Validations.

        // Here we validate that none of the form fields are empty.
        if (!nameEvent || !description || !date || !capacity) {
            // If they are empty, we use the “SweetAlert” library to inform the user.
            Swal.fire({
                icon: "error",
                title: "Fields required",
                text: "Please fill in all fields before continuing.",
            });
        } else if(eventExists) {
            Swal.fire({
                icon: "error",
                title: "Already exists!",
                text: "This event already exists.",
            });
        } else {
            // If the email do not exist, we send the data to the API using fetch with POST method.
            const res = await fetch(`${APP_URL}/events`, {
                method: 'POST', // Here we indicate to the system that a POST (Create) method will be done.
                headers: { 'Content-Type': 'application/json' }, // Here we indicate that we send JSON.
                body: JSON.stringify({ nameEvent, description, date, capacity }) // We convert the JS object to JSON.
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
        
    };
}; */