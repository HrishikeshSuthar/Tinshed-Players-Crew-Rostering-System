// ========================================
// VOLUNTEER MANAGEMENT
// ========================================

const volunteerForm =
    document.getElementById("volunteerForm");

const volunteerBody =
    document.getElementById("volunteerBody");

const volunteerMessage =
    document.getElementById("message");


volunteerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("fullName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();


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


    if (
        !email.includes("@") ||
        !email.includes(".")
    ) {

        volunteerMessage.textContent =
            "Please enter a valid email address.";

        volunteerMessage.style.color = "red";

        return;
    }


    const row =
        document.createElement("tr");


    row.innerHTML = `
        <td class="volunteer-name">${name}</td>
        <td class="volunteer-phone">${phone}</td>
        <td class="volunteer-email">${email}</td>
        <td class="volunteer-status">Active</td>

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
// EDIT VOLUNTEER
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


    if (
        !updatedEmail.includes("@") ||
        !updatedEmail.includes(".")
    ) {

        alert(
            "Please enter a valid email address. Changes were not saved."
        );

        return;
    }


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
// DEACTIVATE VOLUNTEER
// ========================================

function deactivateVolunteer(button) {

    const row =
        button.closest("tr");

    const statusCell =
        row.querySelector(".volunteer-status");


    if (
        statusCell.textContent.trim() === "Inactive"
    ) {

        volunteerMessage.textContent =
            "This volunteer is already inactive.";

        volunteerMessage.style.color = "red";

        return;
    }


    statusCell.textContent =
        "Inactive";


    button.disabled =
        true;


    volunteerMessage.textContent =
        "Volunteer deactivated successfully. Existing records are retained.";

    volunteerMessage.style.color =
        "green";
}


// ========================================
// REQUIRED CREW ROLE MANAGEMENT
// ========================================

const crewRoleForm =
    document.getElementById("crewRoleForm");

const rolePerformance =
    document.getElementById("rolePerformance");

const roleName =
    document.getElementById("roleName");

const roleMessage =
    document.getElementById("roleMessage");

const crewRoleBody =
    document.getElementById("crewRoleBody");


crewRoleForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const performance =
        rolePerformance.value;

    const role =
        roleName.value.trim();


    // Validate required information
    if (
        performance === "" ||
        role === ""
    ) {

        roleMessage.textContent =
            "Please select a performance and enter a crew role.";

        roleMessage.style.color =
            "red";

        return;
    }


    const row =
        document.createElement("tr");


    row.innerHTML = `
        <td class="role-performance">
            ${performance}
        </td>

        <td class="role-title">
            ${role}
        </td>

        <td class="role-status">
            Unfilled
        </td>

        <td>

            <button
                type="button"
                onclick="editCrewRole(this)"
            >
                Edit
            </button>

            <button
                type="button"
                onclick="removeCrewRole(this)"
            >
                Remove
            </button>

        </td>
    `;


    crewRoleBody.appendChild(row);


    roleMessage.textContent =
        "Required crew role added successfully.";

    roleMessage.style.color =
        "green";


    crewRoleForm.reset();
});


// ========================================
// EDIT REQUIRED CREW ROLE
// BN - PER4-32
// ========================================

function editCrewRole(button) {

    const row =
        button.closest("tr");

    const roleCell =
        row.querySelector(".role-title");


    const updatedRole = prompt(
        "Update crew role:",
        roleCell.textContent.trim()
    );


    if (updatedRole === null) {
        return;
    }


    if (updatedRole.trim() === "") {

        roleMessage.textContent =
            "Crew role cannot be empty. Changes were not saved.";

        roleMessage.style.color =
            "red";

        return;
    }


    roleCell.textContent =
        updatedRole.trim();


    roleMessage.textContent =
        "Crew role updated successfully.";

    roleMessage.style.color =
        "green";
}


// ========================================
// REMOVE REQUIRED CREW ROLE
// BN - PER4-33
// ========================================

function removeCrewRole(button) {

    const row =
        button.closest("tr");

    const role =
        row.querySelector(".role-title")
           .textContent.trim();

    const performance =
        row.querySelector(".role-performance")
           .textContent.trim();


    const confirmed =
        confirm(
            "Remove " +
            role +
            " from " +
            performance +
            "?"
        );


    if (!confirmed) {
        return;
    }


    row.remove();


    roleMessage.textContent =
        "Crew role removed successfully.";

    roleMessage.style.color =
        "green";
}


// ========================================
// ASSIGN VOLUNTEER TO CREW ROLE
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


    if (
        performance === "" ||
        crewRole === "" ||
        volunteer === ""
    ) {

        assignmentMessage.textContent =
            "Please select a performance, crew role and volunteer.";

        assignmentMessage.style.color =
            "red";

        return;
    }


    const status =
        "Unconfirmed";


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