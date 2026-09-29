// ========================================
// DATA
// ========================================

const requiredCrewRoles = [];
const crewAssignments = [];


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


    if (name === "" || phone === "" || email === "") {

        volunteerMessage.textContent =
            "Please complete all required fields.";

        volunteerMessage.style.color = "red";
        return;
    }


    if (!email.includes("@") || !email.includes(".")) {

        volunteerMessage.textContent =
            "Please enter a valid email address.";

        volunteerMessage.style.color = "red";
        return;
    }


    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="volunteer-name">${name}</td>
        <td class="volunteer-phone">${phone}</td>
        <td class="volunteer-email">${email}</td>
        <td class="volunteer-status">Active</td>
        <td>
            <button type="button"
                onclick="editVolunteer(this)">
                Edit
            </button>

            <button type="button"
                onclick="deactivateVolunteer(this)">
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


function editVolunteer(button) {

    const row = button.closest("tr");

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

    if (updatedName === null) return;


    const updatedPhone = prompt(
        "Update phone number:",
        phoneCell.textContent.trim()
    );

    if (updatedPhone === null) return;


    const updatedEmail = prompt(
        "Update email address:",
        emailCell.textContent.trim()
    );

    if (updatedEmail === null) return;


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


    nameCell.textContent = updatedName.trim();
    phoneCell.textContent = updatedPhone.trim();
    emailCell.textContent = updatedEmail.trim();


    volunteerMessage.textContent =
        "Volunteer record updated successfully.";

    volunteerMessage.style.color = "green";
}


function deactivateVolunteer(button) {

    const row = button.closest("tr");

    const statusCell =
        row.querySelector(".volunteer-status");


    statusCell.textContent = "Inactive";

    button.disabled = true;


    volunteerMessage.textContent =
        "Volunteer deactivated successfully. Existing records are retained.";

    volunteerMessage.style.color = "green";
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

    const performance = rolePerformance.value;
    const role = roleName.value.trim();


    if (performance === "" || role === "") {

        roleMessage.textContent =
            "Please select a performance and enter a crew role.";

        roleMessage.style.color = "red";
        return;
    }


    requiredCrewRoles.push({
        performance: performance,
        role: role
    });


    displayRequiredRoles();


    roleMessage.textContent =
        "Required crew role added successfully.";

    roleMessage.style.color = "green";

    crewRoleForm.reset();
});


function displayRequiredRoles() {

    crewRoleBody.innerHTML = "";


    requiredCrewRoles.forEach(function (item, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.performance}</td>
            <td>${item.role}</td>
            <td>Unfilled</td>

            <td>
                <button
                    type="button"
                    onclick="editCrewRole(${index})"
                >
                    Edit
                </button>

                <button
                    type="button"
                    onclick="removeCrewRole(${index})"
                >
                    Remove
                </button>
            </td>
        `;

        crewRoleBody.appendChild(row);
    });
}


function editCrewRole(index) {

    const currentRole =
        requiredCrewRoles[index].role;


    const updatedRole = prompt(
        "Update crew role:",
        currentRole
    );


    if (updatedRole === null) return;


    if (updatedRole.trim() === "") {

        roleMessage.textContent =
            "Crew role cannot be empty.";

        roleMessage.style.color = "red";
        return;
    }


    requiredCrewRoles[index].role =
        updatedRole.trim();


    displayRequiredRoles();


    roleMessage.textContent =
        "Crew role updated successfully.";

    roleMessage.style.color = "green";
}


function removeCrewRole(index) {

    const item =
        requiredCrewRoles[index];


    const confirmed = confirm(
        "Remove " +
        item.role +
        " from " +
        item.performance +
        "?"
    );


    if (!confirmed) return;


    requiredCrewRoles.splice(index, 1);


    displayRequiredRoles();


    roleMessage.textContent =
        "Crew role removed successfully.";

    roleMessage.style.color = "green";
}


// ========================================
// ASSIGN VOLUNTEER
// ========================================

const assignmentForm =
    document.getElementById("assignmentForm");

const assignmentMessage =
    document.getElementById("assignmentMessage");


assignmentForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const performance =
        document.getElementById("performance").value;

    const role =
        document.getElementById("assignmentRole").value;

    const volunteer =
        document.getElementById("volunteer").value;


    if (
        performance === "" ||
        role === "" ||
        volunteer === ""
    ) {

        assignmentMessage.textContent =
            "Please select a performance, crew role and volunteer.";

        assignmentMessage.style.color = "red";
        return;
    }


    crewAssignments.push({
        performance: performance,
        role: role,
        volunteer: volunteer,
        status: "Unconfirmed"
    });


    assignmentMessage.textContent =
        "Volunteer assigned successfully.";

    assignmentMessage.style.color = "green";


    assignmentForm.reset();
});


// ========================================
// VIEW PERFORMANCE ROSTER
// BN - PER4-9
// ========================================

const rosterPerformance =
    document.getElementById("rosterPerformance");

const viewRosterButton =
    document.getElementById("viewRosterButton");

const rosterMessage =
    document.getElementById("rosterMessage");

const rosterTable =
    document.getElementById("rosterTable");

const rosterBody =
    document.getElementById("rosterBody");


viewRosterButton.addEventListener("click", function () {

    const selectedPerformance =
        rosterPerformance.value;


    rosterBody.innerHTML = "";


    if (selectedPerformance === "") {

        rosterTable.style.display = "none";

        rosterMessage.textContent =
            "Please select a performance.";

        rosterMessage.style.color = "red";

        return;
    }


    // Retrieve roles belonging to selected performance
    const rolesForPerformance =
        requiredCrewRoles.filter(function (item) {

            return (
                item.performance ===
                selectedPerformance
            );
        });


    // No roles = no roster
    if (rolesForPerformance.length === 0) {

        rosterTable.style.display = "none";

        rosterMessage.textContent =
            "No crew roles have been created for this performance.";

        rosterMessage.style.color = "red";

        return;
    }


    rolesForPerformance.forEach(function (roleItem) {

        // Find matching assignment
        const assignment =
            crewAssignments.find(function (item) {

                return (
                    item.performance ===
                        selectedPerformance &&
                    item.role ===
                        roleItem.role
                );
            });


        const volunteer =
            assignment
                ? assignment.volunteer
                : "Unfilled";


        const status =
            assignment
                ? assignment.status
                : "Unfilled";


        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${selectedPerformance}</td>
            <td>${roleItem.role}</td>
            <td>${volunteer}</td>
            <td>${status}</td>
        `;


        rosterBody.appendChild(row);
    });


    rosterTable.style.display = "table";


    rosterMessage.textContent =
        "Performance roster loaded successfully.";

    rosterMessage.style.color = "green";
});