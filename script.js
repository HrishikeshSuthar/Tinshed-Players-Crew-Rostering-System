// ========================================
// Tinshed Players Crew Rostering System
// ========================================


// ========================================
// Volunteer Management
// ========================================

const volunteerForm =
    document.getElementById("volunteerForm");

const volunteerBody =
    document.getElementById("volunteerBody");

const volunteerMessage =
    document.getElementById("message");


// Save new volunteer
volunteerForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("fullName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();


    // Required information validation
    if (
        name === "" ||
        phone === "" ||
        email === ""
    ) {

        volunteerMessage.textContent =
            "Please complete all required fields.";

        volunteerMessage.style.color = "red";

        return;
    }


    // Email validation
    if (
        !email.includes("@") ||
        !email.includes(".")
    ) {

        volunteerMessage.textContent =
            "Please enter a valid email address.";

        volunteerMessage.style.color = "red";

        return;
    }


    // Create volunteer record
    const row = document.createElement("tr");


    row.innerHTML = `
        <td class="volunteer-name">
            ${name}
        </td>

        <td class="volunteer-phone">
            ${phone}
        </td>

        <td class="volunteer-email">
            ${email}
        </td>

        <td class="volunteer-status">
            Active
        </td>

        <td>
            <button
                type="button"
                onclick="editVolunteer(this)"
            >
                Edit
            </button>

            <button
                type="button"
                onclick="deactivateVolunteer(this)"
            >
                Deactivate
            </button>
        </td>
    `;


    volunteerBody.appendChild(row);


    volunteerMessage.textContent =
        "Volunteer saved successfully.";

    volunteerMessage.style.color = "green";


    volunteerForm.reset();
});


// ========================================
// Edit Volunteer
// ========================================

function editVolunteer(button) {

    const row =
        button.closest("tr");


    const nameCell =
        row.querySelector(".volunteer-name");

    const phoneCell =
        row.querySelector(".volunteer-phone");

    const emailCell =
        row.querySelector(".volunteer-email");


    const updatedName = prompt(
        "Update volunteer name:",
        nameCell.textContent.trim()
    );


    // Cancel editing
    if (updatedName === null) {
        return;
    }


    const updatedPhone = prompt(
        "Update phone number:",
        phoneCell.textContent.trim()
    );


    if (updatedPhone === null) {
        return;
    }


    const updatedEmail = prompt(
        "Update email address:",
        emailCell.textContent.trim()
    );


    if (updatedEmail === null) {
        return;
    }


    // Required information validation
    if (
        updatedName.trim() === "" ||
        updatedPhone.trim() === "" ||
        updatedEmail.trim() === ""
    ) {

        alert(
            "Name, phone and email are required. Changes were not saved."
        );

        return;
    }


    // Email validation
    if (
        !updatedEmail.includes("@") ||
        !updatedEmail.includes(".")
    ) {

        alert(
            "Please enter a valid email address. Changes were not saved."
        );

        return;
    }


    // Save changes
    nameCell.textContent =
        updatedName.trim();

    phoneCell.textContent =
        updatedPhone.trim();

    emailCell.textContent =
        updatedEmail.trim();


    volunteerMessage.textContent =
        "Volunteer record updated successfully.";

    volunteerMessage.style.color = "green";
}


// ========================================
// Deactivate Volunteer
// ========================================

function deactivateVolunteer(button) {

    const row =
        button.closest("tr");

    const statusCell =
        row.querySelector(".volunteer-status");


    // Check existing status
    if (statusCell.textContent.trim() === "Inactive") {

        volunteerMessage.textContent =
            "This volunteer is already inactive.";

        volunteerMessage.style.color = "red";

        return;
    }


    // Change status instead of deleting record
    statusCell.textContent = "Inactive";


    // Disable deactivate button
    button.disabled = true;


    volunteerMessage.textContent =
        "Volunteer deactivated successfully. Existing records are retained.";

    volunteerMessage.style.color = "green";
}


// ========================================
// Crew Role Management
// ========================================

const crewRoleForm =
    document.getElementById("crewRoleForm");

const roleName =
    document.getElementById("roleName");

const roleMessage =
    document.getElementById("roleMessage");

const crewRoleList =
    document.getElementById("crewRoleList");


crewRoleForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const newRole =
        roleName.value.trim();


    // Validate crew role
    if (newRole === "") {

        roleMessage.textContent =
            "Please enter a crew role.";

        roleMessage.style.color = "red";

        return;
    }


    // Add crew role
    const listItem =
        document.createElement("li");

    listItem.textContent =
        newRole;


    crewRoleList.appendChild(listItem);


    roleMessage.textContent =
        "Crew role added successfully.";

    roleMessage.style.color = "green";


    roleName.value = "";
});


// ========================================
// Assign Volunteer to Crew Role
// ========================================

const assignmentForm =
    document.getElementById("assignmentForm");

const assignmentMessage =
    document.getElementById("assignmentMessage");

const rosterBody =
    document.getElementById("rosterBody");


assignmentForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const performance =
        document.getElementById("performance").value;

    const crewRole =
        document.getElementById("assignmentRole").value;

    const volunteer =
        document.getElementById("volunteer").value;


    // Validate selections
    if (
        performance === "" ||
        crewRole === "" ||
        volunteer === ""
    ) {

        assignmentMessage.textContent =
            "Please select a performance, crew role and volunteer.";

        assignmentMessage.style.color = "red";

        return;
    }


    // New assignments start as unconfirmed
    const status =
        "Unconfirmed";


    // Create roster row
    const row =
        document.createElement("tr");


    row.innerHTML = `
        <td>${performance}</td>
        <td>${crewRole}</td>
        <td>${volunteer}</td>
        <td>${status}</td>
    `;


    rosterBody.appendChild(row);


    assignmentMessage.textContent =
        "Volunteer assigned successfully.";

    assignmentMessage.style.color =
        "green";


    assignmentForm.reset();
});