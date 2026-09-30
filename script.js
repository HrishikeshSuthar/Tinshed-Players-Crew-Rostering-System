// ========================================
// USER LOGIN
// HS - PER4-11
// ========================================

// Prototype registered users

const registeredUsers = [
    {
        username: "admin",
        password: "admin123",
        role: "Admin",
        active: true
    },
    {
        username: "user",
        password: "user123",
        role: "User",
        active: true
    }
];


// Store the currently logged-in user.
// This can later be used for PER4-12
// Role-Based Access.

let currentUser = null;


const loginForm =
    document.getElementById("loginForm");

const loginUsername =
    document.getElementById("loginUsername");

const loginPassword =
    document.getElementById("loginPassword");

const loginMessage =
    document.getElementById("loginMessage");

const loginSection =
    document.getElementById("loginSection");

const mainSystem =
    document.getElementById("mainSystem");


loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        loginUsername.value.trim();

    const password =
        loginPassword.value;


    // Check required fields

    if (
        username === "" ||
        password === ""
    ) {

        loginMessage.textContent =
            "Username and password are required.";

        loginMessage.style.color =
            "red";

        return;
    }


    // Find registered user

    const user =
        registeredUsers.find(function (registeredUser) {

            return (
                registeredUser.username.toLowerCase() ===
                username.toLowerCase()
            );

        });


    // Check username and password

    if (
        !user ||
        user.password !== password
    ) {

        loginMessage.textContent =
            "Invalid username or password. Access denied.";

        loginMessage.style.color =
            "red";

        return;
    }


    // Check whether system access is active

    if (!user.active) {

        loginMessage.textContent =
            "This user account has been deactivated. Access denied.";

        loginMessage.style.color =
            "red";

        return;
    }


    // Successful login

    currentUser = user;

    loginMessage.textContent =
        "Login successful.";

    loginMessage.style.color =
        "green";


    // Hide login and show system

    loginSection.style.display =
        "none";

    mainSystem.style.display =
        "block";
    applyRoleBasedAccess();

    // ========================================
// ROLE-BASED ACCESS
// BN - PER4-12
// ========================================

function applyRoleBasedAccess() {

    const loggedInUsername =
        document.getElementById("loggedInUsername");

    const loggedInRole =
        document.getElementById("loggedInRole");

    const accessMessage =
        document.getElementById("accessMessage");


    const productionSection =
        document.getElementById("productionManagementSection");

    const performanceSection =
        document.getElementById("performanceManagementSection");

    const volunteerSection =
        document.getElementById("volunteerManagementSection");

    const crewRoleSection =
        document.getElementById("crewRoleManagementSection");

    const assignmentSection =
        document.getElementById("assignmentManagementSection");

    const rosterSection =
        document.getElementById("rosterSection");

    const volunteerAssignmentSection =
        document.getElementById("volunteerAssignmentSection");

    const productionScheduleSection =
    document.getElementById("productionScheduleSection");

    


    // Display the role for the whole login session.

    loggedInUsername.textContent =
        currentUser.username;

    loggedInRole.textContent =
        currentUser.role;


    // Volunteer Coordinator / Admin

    if (currentUser.role === "Admin") {

        productionSection.style.display = "block";
        performanceSection.style.display = "block";
        volunteerSection.style.display = "block";
        crewRoleSection.style.display = "block";
        assignmentSection.style.display = "block";
        rosterSection.style.display = "block";
        productionScheduleSection.style.display = "block";

        volunteerAssignmentSection.style.display =
            "none";


        accessMessage.textContent =
            "Volunteer Coordinator access granted. Administrative functions are available.";

        accessMessage.style.color =
            "green";

        return;
    }


    // Volunteer / User

    if (currentUser.role === "User") {

        productionSection.style.display = "none";
        performanceSection.style.display = "none";
        volunteerSection.style.display = "none";
        crewRoleSection.style.display = "none";
        assignmentSection.style.display = "none";
        rosterSection.style.display = "none";
        productionScheduleSection.style.display = "none";

        volunteerAssignmentSection.style.display =
            "block";


        accessMessage.textContent =
            "Volunteer access granted. Administrative management functions are restricted.";

        accessMessage.style.color =
            "green";


        displayMyAssignments();

        return;
    }


    // Any unknown role is denied access.

    productionSection.style.display = "none";
    performanceSection.style.display = "none";
    volunteerSection.style.display = "none";
    crewRoleSection.style.display = "none";
    assignmentSection.style.display = "none";
    rosterSection.style.display = "none";
    volunteerAssignmentSection.style.display = "none";


    accessMessage.textContent =
        "Access denied. Your role does not have permission to use these functions.";

    accessMessage.style.color =
        "red";
}


// ========================================
// VOLUNTEER ASSIGNMENT INFORMATION
// ========================================

function displayMyAssignments() {

    const myAssignmentBody =
        document.getElementById("myAssignmentBody");

    const volunteerAccessMessage =
        document.getElementById("volunteerAccessMessage");


    myAssignmentBody.innerHTML = "";


    // Prototype User account displays only
    // crew assignment information and has
    // no administrative controls.

    const userAssignments =
        crewAssignments.filter(function (assignment) {

            if (currentUser.volunteerName) {

                return (
                    assignment.volunteer.toLowerCase() ===
                    currentUser.volunteerName.toLowerCase()
                );

            }


            // Default prototype User account.
            // John Smith is used only as the
            // demonstration volunteer account.

            return (
                currentUser.username === "user" &&
                assignment.volunteer === "John Smith"
            );

        });


    if (userAssignments.length === 0) {

        volunteerAccessMessage.textContent =
            "No crew assignments are currently available for this volunteer.";

        return;
    }


    volunteerAccessMessage.textContent =
        "Your current crew assignment information:";


    userAssignments.forEach(function (assignment) {

        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${assignment.performance}</td>
            <td>${assignment.role}</td>
            <td>${assignment.status}</td>
        `;


        myAssignmentBody.appendChild(row);

    });

}

});

// ========================================
// DATA
// ========================================

const productions = [];
const performances = [];
const requiredCrewRoles = [];
const crewAssignments = [];

// ========================================
// PRODUCTION MANAGEMENT
// YM - PER4-3
// ========================================

const productionForm = document.getElementById("productionForm");

const productionTitle = document.getElementById("productionTitle");

const productionMessage = document.getElementById("productionMessage");

const productionBody = document.getElementById("productionBody");

const performanceProduction = document.getElementById("performanceProduction");

productionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = productionTitle.value.trim();

  if (title === "") {
    productionMessage.textContent = "Please enter a production title.";

    productionMessage.style.color = "red";

    return;
  }

  productions.push({
    title: title,
  });

  displayProductions();
  updateProductionOptions();

  productionMessage.textContent = "Production saved successfully.";

  productionMessage.style.color = "green";

  productionForm.reset();
});

function displayProductions() {
  productionBody.innerHTML = "";

  productions.forEach(function (production, index) {
    const row = document.createElement("tr");

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

function editProduction(index) {
  const oldTitle = productions[index].title;

  const updatedTitle = prompt("Update production title:", oldTitle);

  if (updatedTitle === null) {
    return;
  }

  if (updatedTitle.trim() === "") {
    productionMessage.textContent =
      "Production title cannot be empty. Changes were not saved.";

    productionMessage.style.color = "red";

    return;
  }

  const newTitle = updatedTitle.trim();

  productions[index].title = newTitle;

  // Keep existing performances connected
  // to the renamed production.
  performances.forEach(function (performance) {
    if (performance.production === oldTitle) {
      performance.production = newTitle;
    }
  });

  displayProductions();
  displayPerformances();
  updateProductionOptions();

  productionMessage.textContent = "Production updated successfully.";

  productionMessage.style.color = "green";
}

function removeProduction(index) {
  const production = productions[index];

  const confirmed = confirm("Remove production " + production.title + "?");

  if (!confirmed) {
    return;
  }

  productions.splice(index, 1);

  displayProductions();
  updateProductionOptions();

  productionMessage.textContent = "Production removed successfully.";

  productionMessage.style.color = "green";
}

// ========================================
// UPDATE PRODUCTION DROPDOWN
// ========================================

function updateProductionOptions() {
  performanceProduction.innerHTML =
    '<option value="">Select production</option>';

  productions.forEach(function (production) {
    const option = document.createElement("option");

    option.value = production.title;

    option.textContent = production.title;

    performanceProduction.appendChild(option);
  });
}

// ========================================
// PERFORMANCE MANAGEMENT
// YM - PER4-4
// ========================================

const performanceForm = document.getElementById("performanceForm");

const performanceDate = document.getElementById("performanceDate");

const performanceTime = document.getElementById("performanceTime");

const performanceMessage = document.getElementById("performanceMessage");

const performanceBody = document.getElementById("performanceBody");

performanceForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const production = performanceProduction.value;

  const date = performanceDate.value;

  const time = performanceTime.value;

  if (production === "" || date === "" || time === "") {
    performanceMessage.textContent =
      "Please select a production and enter the performance date and start time.";

    performanceMessage.style.color = "red";

    return;
  }

  performances.push({
    production: production,
    date: date,
    time: time,
  });

  sortPerformances();
  displayPerformances();

  performanceMessage.textContent = "Performance saved successfully.";

  performanceMessage.style.color = "green";

  performanceForm.reset();
});

// ========================================
// SORT PERFORMANCES
// ========================================

function sortPerformances() {
  performances.sort(function (a, b) {
    const first = new Date(a.date + "T" + a.time);

    const second = new Date(b.date + "T" + b.time);

    return first - second;
  });
}

// ========================================
// DISPLAY PERFORMANCES
// ========================================

function displayPerformances() {
  performanceBody.innerHTML = "";

  performances.forEach(function (performance, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${performance.production}</td>
            <td>${performance.date}</td>
            <td>${performance.time}</td>

            <td>

                <button
                    type="button"
                    onclick="editPerformance(${index})"
                >
                    Edit
                </button>

                <button
                    type="button"
                    onclick="removePerformance(${index})"
                >
                    Remove
                </button>

            </td>
        `;

    performanceBody.appendChild(row);
  });
}

// ========================================
// EDIT PERFORMANCE
// ========================================

function editPerformance(index) {
  const performance = performances[index];

  const newDate = prompt(
    "Update performance date (YYYY-MM-DD):",
    performance.date,
  );

  if (newDate === null) {
    return;
  }

  const newTime = prompt("Update start time (HH:MM):", performance.time);

  if (newTime === null) {
    return;
  }

  if (newDate.trim() === "" || newTime.trim() === "") {
    performanceMessage.textContent =
      "Performance date and start time are required. Changes were not saved.";

    performanceMessage.style.color = "red";

    return;
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

  if (!datePattern.test(newDate.trim()) || !timePattern.test(newTime.trim())) {
    performanceMessage.textContent =
      "Please enter a valid date and start time.";

    performanceMessage.style.color = "red";

    return;
  }

  performance.date = newDate.trim();

  performance.time = newTime.trim();

  sortPerformances();
  displayPerformances();

  performanceMessage.textContent = "Performance updated successfully.";

  performanceMessage.style.color = "green";
}

// ========================================
// REMOVE PERFORMANCE
// ========================================

function removePerformance(index) {
  const performance = performances[index];

  const confirmed = confirm(
    "Remove this performance from " + performance.production + "?",
  );

  if (!confirmed) {
    return;
  }

  performances.splice(index, 1);

  displayPerformances();

  performanceMessage.textContent = "Performance removed successfully.";

  performanceMessage.style.color = "green";
}

// ========================================
// VOLUNTEER MANAGEMENT
// HS + BN
// PER4-17 - GRANT SYSTEM ACCESS
// ========================================

const volunteerForm = document.getElementById("volunteerForm");
const volunteerBody = document.getElementById("volunteerBody");
const volunteerMessage = document.getElementById("message");


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
        <td class="volunteer-name">${name}</td>

        <td class="volunteer-phone">${phone}</td>

        <td class="volunteer-email">${email}</td>

        <td class="volunteer-status">Active</td>

        <td class="volunteer-access">No Access</td>

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

            <button
                type="button"
                class="grant-access-button"
                onclick="grantVolunteerAccess(this)"
            >
                Grant Access
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


    const updatedName =
        prompt(
            "Update volunteer name:",
            nameCell.textContent.trim()
        );


    if (updatedName === null) {
        return;
    }


    const updatedPhone =
        prompt(
            "Update phone number:",
            phoneCell.textContent.trim()
        );


    if (updatedPhone === null) {
        return;
    }


    const updatedEmail =
        prompt(
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
// GRANT VOLUNTEER SYSTEM ACCESS
// HS - PER4-17
// ========================================

function grantVolunteerAccess(button) {

    const row =
        button.closest("tr");

    const nameCell =
        row.querySelector(".volunteer-name");

    const emailCell =
        row.querySelector(".volunteer-email");

    const statusCell =
        row.querySelector(".volunteer-status");

    const accessCell =
        row.querySelector(".volunteer-access");


    const volunteerName =
        nameCell.textContent.trim();

    const volunteerEmail =
        emailCell.textContent.trim();


    // Only active volunteer records can
    // be granted system access.

    if (statusCell.textContent.trim() !== "Active") {

        volunteerMessage.textContent =
            "System access cannot be granted to an inactive volunteer.";

        volunteerMessage.style.color =
            "red";

        return;
    }


    // Prevent duplicate system access
    // for the same volunteer.

    if (accessCell.textContent.trim() === "Active") {

        volunteerMessage.textContent =
            volunteerName +
            " already has active system access.";

        volunteerMessage.style.color =
            "red";

        return;
    }


    // Create a simple username from
    // the volunteer's name.

    const baseUsername =
        volunteerName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");


    let username =
        baseUsername;

    let number =
        1;


    // Make sure the username is unique.

    while (
        registeredUsers.some(function (user) {
            return (
                user.username.toLowerCase() ===
                username.toLowerCase()
            );
        })
    ) {

        username =
            baseUsername + number;

        number++;

    }


    // Prototype password for the account.

    const password =
        "welcome123";


    // Create the login account and link
    // it to this volunteer.

    registeredUsers.push({

        username: username,

        password: password,

        role: "User",

        active: true,

        volunteerName: volunteerName,

        volunteerEmail: volunteerEmail

    });


    // Show that this volunteer now has
    // active system access.

    accessCell.textContent =
        "Active";


    // Disable the button to provide another
    // clear indication and prevent duplicates.

    button.disabled =
        true;


    volunteerMessage.textContent =
        "System access granted to " +
        volunteerName +
        ". Username: " +
        username +
        " | Password: " +
        password +
        " | Role: User";


    volunteerMessage.style.color =
        "green";

}
// ========================================
// CREW ROLE MANAGEMENT
// HS + BN
// ========================================

const crewRoleForm = document.getElementById("crewRoleForm");

const rolePerformance = document.getElementById("rolePerformance");

const roleName = document.getElementById("roleName");

const roleMessage = document.getElementById("roleMessage");

const crewRoleBody = document.getElementById("crewRoleBody");

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
    role: role,
  });

  displayRequiredRoles();

  roleMessage.textContent = "Required crew role added successfully.";

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
  const currentRole = requiredCrewRoles[index].role;

  const updatedRole = prompt("Update crew role:", currentRole);

  if (updatedRole === null) {
    return;
  }

  if (updatedRole.trim() === "") {
    roleMessage.textContent = "Crew role cannot be empty.";

    roleMessage.style.color = "red";

    return;
  }

  requiredCrewRoles[index].role = updatedRole.trim();

  displayRequiredRoles();

  roleMessage.textContent = "Crew role updated successfully.";

  roleMessage.style.color = "green";
}

function removeCrewRole(index) {
  const item = requiredCrewRoles[index];

  const confirmed = confirm(
    "Remove " + item.role + " from " + item.performance + "?",
  );

  if (!confirmed) {
    return;
  }

  requiredCrewRoles.splice(index, 1);

  displayRequiredRoles();

  roleMessage.textContent = "Crew role removed successfully.";

  roleMessage.style.color = "green";
}

// ========================================
// ASSIGN VOLUNTEER
// HS - PER4-6
// YM - PER4-7 DUPLICATE PREVENTION
// ========================================

const assignmentForm = document.getElementById("assignmentForm");

const assignmentMessage = document.getElementById("assignmentMessage");

const assignmentBody = document.getElementById("assignmentBody");

assignmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const performance = document.getElementById("performance").value;

  const role = document.getElementById("assignmentRole").value;

  const volunteer = document.getElementById("volunteer").value;

  if (performance === "" || role === "" || volunteer === "") {
    assignmentMessage.textContent =
      "Please select a performance, crew role and volunteer.";

    assignmentMessage.style.color = "red";

    return;
  }

  // Check whether the volunteer already has
  // another role in this performance.
  const duplicateAssignment = crewAssignments.some(function (assignment) {
    return (
      assignment.performance === performance &&
      assignment.volunteer.toLowerCase() === volunteer.toLowerCase()
    );
  });

  if (duplicateAssignment) {
    assignmentMessage.textContent =
      volunteer +
      " already has a crew role in " +
      performance +
      ". A volunteer cannot have more than one role in the same performance.";

    assignmentMessage.style.color = "red";

    return;
  }

  crewAssignments.push({
    performance: performance,
    role: role,
    volunteer: volunteer,
    status: "Unconfirmed",
  });

  displayAssignments();

  assignmentMessage.textContent = "Volunteer assigned successfully.";

  assignmentMessage.style.color = "green";

  assignmentForm.reset();
});

// ========================================
// TRACK CREW ASSIGNMENT CONFIRMATION
// HS - PER4-13
// ========================================

function confirmAssignment(index) {

    const assignment = crewAssignments[index];

    // Check that the assignment exists
    if (!assignment) {
        return;
    }

    // Do not change an assignment that is
    // already confirmed
    if (assignment.status === "Confirmed") {

        assignmentMessage.textContent =
            "This crew assignment is already confirmed.";

        assignmentMessage.style.color =
            "red";

        return;
    }

    // Only update the confirmation status.
    // Performance, crew role and volunteer
    // remain unchanged.
    assignment.status = "Confirmed";

    // Refresh the assignment table
    displayAssignments();

    assignmentMessage.textContent =
        "Crew assignment confirmed successfully.";

    assignmentMessage.style.color =
        "green";
}

// ========================================
// DISPLAY CREW ASSIGNMENTS
// ========================================

function displayAssignments() {
  assignmentBody.innerHTML = "";

  crewAssignments.forEach(function (assignment, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${assignment.performance}</td>
            <td>${assignment.role}</td>
            <td>${assignment.volunteer}</td>
            <td>${assignment.status}</td>

            <td>
            <button type="button" onclick="confirmAssignment(${index})">Confirm</button>
                <button
    type="button"
    onclick="changeAssignment(${index})"
>
    Change
</button>

<button
    type="button"
    onclick="removeAssignment(${index})"
>
    Remove
</button>
            </td>
        `;

    assignmentBody.appendChild(row);
  });
}

// ========================================
// CHANGE EXISTING ASSIGNMENT
// DUPLICATE RULE ALSO APPLIES HERE
// ========================================

function changeAssignment(index) {
  const currentAssignment = crewAssignments[index];

  const newRole = prompt("Enter new crew role:", currentAssignment.role);

  if (newRole === null) {
    return;
  }

  const newVolunteer = prompt(
    "Enter volunteer name:",
    currentAssignment.volunteer,
  );

  if (newVolunteer === null) {
    return;
  }

  if (newRole.trim() === "" || newVolunteer.trim() === "") {
    assignmentMessage.textContent =
      "Crew role and volunteer are required. Assignment was not changed.";

    assignmentMessage.style.color = "red";

    return;
  }

  // Ignore the current assignment itself.
  // Check all other assignments for a duplicate.
  const duplicateAssignment = crewAssignments.some(
    function (assignment, assignmentIndex) {
      return (
        assignmentIndex !== index &&
        assignment.performance === currentAssignment.performance &&
        assignment.volunteer.toLowerCase() === newVolunteer.trim().toLowerCase()
      );
    },
  );

  if (duplicateAssignment) {
    assignmentMessage.textContent =
      newVolunteer.trim() +
      " already has a crew role in " +
      currentAssignment.performance +
      ". The assignment was not changed.";

    assignmentMessage.style.color = "red";

    return;
  }

  // Only update after duplicate validation passes.
  currentAssignment.role = newRole.trim();

  currentAssignment.volunteer = newVolunteer.trim();

  displayAssignments();

  assignmentMessage.textContent = "Crew assignment updated successfully.";

  assignmentMessage.style.color = "green";
}

// ========================================
// REMOVE CREW ASSIGNMENT
// HS - PER4-8
// ========================================

function removeAssignment(index) {
  const assignment = crewAssignments[index];

  const confirmed = confirm(
    "Remove " +
      assignment.volunteer +
      " from " +
      assignment.role +
      " for " +
      assignment.performance +
      "?",
  );

  if (!confirmed) {
    return;
  }

  crewAssignments.splice(index, 1);

  displayAssignments();

  assignmentMessage.textContent =
    "Crew assignment removed successfully. The crew role is now unfilled.";

  assignmentMessage.style.color = "green";
}

// ========================================
// VIEW PERFORMANCE ROSTER
// BN - PER4-9
// ========================================

const rosterPerformance = document.getElementById("rosterPerformance");

const viewRosterButton = document.getElementById("viewRosterButton");

const rosterMessage = document.getElementById("rosterMessage");

const rosterTable = document.getElementById("rosterTable");

const rosterBody = document.getElementById("rosterBody");

viewRosterButton.addEventListener("click", function () {
  const selectedPerformance = rosterPerformance.value;

  rosterBody.innerHTML = "";

  if (selectedPerformance === "") {
    rosterTable.style.display = "none";

    rosterMessage.textContent = "Please select a performance.";

    rosterMessage.style.color = "red";

    return;
  }

  const rolesForPerformance = requiredCrewRoles.filter(function (item) {
    return item.performance === selectedPerformance;
  });

  if (rolesForPerformance.length === 0) {
    rosterTable.style.display = "none";

    rosterMessage.textContent =
      "No crew roles have been created for this performance.";

    rosterMessage.style.color = "red";

    return;
  }

  rolesForPerformance.forEach(function (roleItem) {
    const assignment = crewAssignments.find(function (item) {
      return (
        item.performance === selectedPerformance && item.role === roleItem.role
      );
    });

    const volunteer = assignment ? assignment.volunteer : "Unfilled";

    const status = assignment ? assignment.status : "Unfilled";

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${selectedPerformance}</td>
            <td>${roleItem.role}</td>
            <td>${volunteer}</td>
            <td>${status}</td>
        `;

    rosterBody.appendChild(row);
  });

  rosterTable.style.display = "table";

  rosterMessage.textContent = "Performance roster loaded successfully.";

  rosterMessage.style.color = "green";
});

// ========================================
// VIEW PRODUCTION & PERFORMANCE SCHEDULE
// BN - PER4-14
// ========================================

const viewScheduleButton =
    document.getElementById("viewScheduleButton");

const scheduleMessage =
    document.getElementById("scheduleMessage");

const productionSchedule =
    document.getElementById("productionSchedule");


viewScheduleButton.addEventListener("click", function () {

    displayProductionSchedule();

});


function displayProductionSchedule() {

    productionSchedule.innerHTML = "";


    // No productions have been scheduled.

    if (productions.length === 0) {

        scheduleMessage.textContent =
            "No productions are currently scheduled.";

        scheduleMessage.style.color =
            "red";

        return;
    }


    scheduleMessage.textContent =
        "Current production and performance schedule.";

    scheduleMessage.style.color =
        "green";


    productions.forEach(function (production) {

        const productionContainer =
            document.createElement("div");


        const productionHeading =
            document.createElement("h3");


        productionHeading.textContent =
            production.title;


        productionContainer.appendChild(
            productionHeading
        );


        // Retrieve performances belonging
        // to this production.

        const productionPerformances =
            performances.filter(function (performance) {

                return (
                    performance.production ===
                    production.title
                );

            });


        // Sort the displayed performances
        // by date and time.

        productionPerformances.sort(function (a, b) {

            const first =
                new Date(
                    a.date + "T" + a.time
                );

            const second =
                new Date(
                    b.date + "T" + b.time
                );


            return first - second;

        });


        if (productionPerformances.length === 0) {

            const noPerformance =
                document.createElement("p");


            noPerformance.textContent =
                "No performances scheduled.";


            productionContainer.appendChild(
                noPerformance
            );

        } else {

            const table =
                document.createElement("table");


            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                    </tr>
                </thead>

                <tbody></tbody>
            `;


            const tableBody =
                table.querySelector("tbody");


            productionPerformances.forEach(
                function (performance) {

                    const row =
                        document.createElement("tr");


                    row.innerHTML = `
                        <td>${performance.date}</td>
                        <td>${performance.time}</td>
                    `;


                    tableBody.appendChild(row);

                }
            );


            productionContainer.appendChild(
                table
            );

        }


        productionSchedule.appendChild(
            productionContainer
        );

    });

}