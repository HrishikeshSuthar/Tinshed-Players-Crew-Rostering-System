// ========================================
// PRODUCTION MANAGEMENT
// YM - PER4-3
// ========================================

const productionForm =
    document.getElementById("productionForm");

const productionTitle =
    document.getElementById("productionTitle");

const productionMessage =
    document.getElementById("productionMessage");

const productionBody =
    document.getElementById("productionBody");


// Store productions during current session
const productions = [];


// ========================================
// CREATE PRODUCTION
// YM - PER4-26
// ========================================

productionForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const title =
        productionTitle.value.trim();


    // Validate required information
    if (title === "") {

        productionMessage.textContent =
            "Please enter a production title.";

        productionMessage.style.color =
            "red";

        return;
    }


    // Save production
    productions.push({
        title: title
    });


    displayProductions();


    productionMessage.textContent =
        "Production saved successfully.";

    productionMessage.style.color =
        "green";


    productionForm.reset();
});


// ========================================
// DISPLAY PRODUCTIONS
// ========================================

function displayProductions() {

    productionBody.innerHTML = "";


    productions.forEach(function (production, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${production.title}</td>

            <td>

                <button
                    type="button"
                    onclick="editProduction(${index})"
                >
                    Edit
                </button>

                <button
                    type="button"
                    onclick="removeProduction(${index})"
                >
                    Remove
                </button>

            </td>
        `;


        productionBody.appendChild(row);
    });
}


// ========================================
// UPDATE PRODUCTION
// YM - PER4-27
// ========================================

function editProduction(index) {

    const currentTitle =
        productions[index].title;


    const updatedTitle = prompt(
        "Update production title:",
        currentTitle
    );


    // Cancel update
    if (updatedTitle === null) {
        return;
    }


    // Validate update
    if (updatedTitle.trim() === "") {

        productionMessage.textContent =
            "Production title cannot be empty. Changes were not saved.";

        productionMessage.style.color =
            "red";

        return;
    }


    productions[index].title =
        updatedTitle.trim();


    displayProductions();


    productionMessage.textContent =
        "Production updated successfully.";

    productionMessage.style.color =
        "green";
}


// ========================================
// REMOVE PRODUCTION
// YM - PER4-27
// ========================================

function removeProduction(index) {

    const production =
        productions[index];


    const confirmed = confirm(
        "Remove production " +
        production.title +
        "?"
    );


    if (!confirmed) {
        return;
    }


    productions.splice(index, 1);


    displayProductions();


    productionMessage.textContent =
        "Production removed successfully.";

    productionMessage.style.color =
        "green";
}


// ========================================
// DATA FOR CREW ROSTERING
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


    if (
        name === "" ||
        phone === "" ||
        email === ""
    ) {

        volunteerMessage.textContent =
            "Please complete all required fields.";

        volunteerMessage.style.color =
            "red";

        return;
    }


    if (
        !email.includes("@") ||
        !email.includes(".")
    ) {

        volunteerMessage.textContent =
            "Please enter a valid email address.";

        volunteerMessage.style.color =
            "red";

        return;
    }


    const row =
        document.createElement("tr");


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

    volunteerMessage.style.color =
        "green";


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

    volunteerMessage.style.color =
        "green";
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

        volunteerMessage.style.color =
            "red";

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


    requiredCrewRoles.push({
        performance: performance,
        role: role
    });


    displayRequiredRoles();


    roleMessage.textContent =
        "Required crew role added successfully.";

    roleMessage.style.color =
        "green";


    crewRoleForm.reset();
});


// ========================================
// DISPLAY REQUIRED CREW ROLES
// ========================================

function displayRequiredRoles() {

    crewRoleBody.innerHTML = "";


    requiredCrewRoles.forEach(function (item, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>
                ${item.performance}
            </td>

            <td>
                ${item.role}
            </td>

            <td>
                Unfilled
            </td>

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


// ========================================
// EDIT REQUIRED CREW ROLE
// ========================================

function editCrewRole(index) {

    const currentRole =
        requiredCrewRoles[index].role;


    const updatedRole = prompt(
        "Update crew role:",
        currentRole
    );


    if (updatedRole === null) {
        return;
    }


    if (updatedRole.trim() === "") {

        roleMessage.textContent =
            "Crew role cannot be empty.";

        roleMessage.style.color =
            "red";

        return;
    }


    requiredCrewRoles[index].role =
        updatedRole.trim();


    displayRequiredRoles();


    roleMessage.textContent =
        "Crew role updated successfully.";

    roleMessage.style.color =
        "green";
}


// ========================================
// REMOVE REQUIRED CREW ROLE
// ========================================

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


    if (!confirmed) {
        return;
    }


    requiredCrewRoles.splice(
        index,
        1
    );


    displayRequiredRoles();


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

        assignmentMessage.style.color =
            "red";

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

    assignmentMessage.style.color =
        "green";


    assignmentForm.reset();
});


// ========================================
// VIEW PERFORMANCE ROSTER
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

        rosterTable.style.display =
            "none";


        rosterMessage.textContent =
            "Please select a performance.";

        rosterMessage.style.color =
            "red";

        return;
    }


    // Find required roles for selected performance
    const rolesForPerformance =
        requiredCrewRoles.filter(function (item) {

            return (
                item.performance ===
                selectedPerformance
            );

        });


    // No required roles = no roster
    if (
        rolesForPerformance.length === 0
    ) {

        rosterTable.style.display =
            "none";


        rosterMessage.textContent =
            "No crew roles have been created for this performance.";

        rosterMessage.style.color =
            "red";

        return;
    }


    rolesForPerformance.forEach(function (roleItem) {

        // Find volunteer assignment for role
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
            <td>
                ${selectedPerformance}
            </td>

            <td>
                ${roleItem.role}
            </td>

            <td>
                ${volunteer}
            </td>

            <td>
                ${status}
            </td>
        `;


        rosterBody.appendChild(row);
    });


    rosterTable.style.display =
        "table";


    rosterMessage.textContent =
        "Performance roster loaded successfully.";

    rosterMessage.style.color =
        "green";
});