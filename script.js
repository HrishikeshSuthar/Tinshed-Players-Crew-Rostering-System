// ========================================
// TINSHED PLAYERS
// CREW ROSTERING SYSTEM
// ========================================


// ========================================
// DATA
// ========================================

const productions = [];
const performances = [];
const requiredCrewRoles = [];
const crewAssignments = [];


// ========================================
// REGISTERED USERS
// HS - PER4-11
// ========================================

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
        active: true,
        volunteerName: "John Smith"
    }
];

let currentUser = null;


// ========================================
// LOGIN ELEMENTS
// ========================================

const loginForm = document.getElementById("loginForm");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginMessage = document.getElementById("loginMessage");
const loginSection = document.getElementById("loginSection");
const mainSystem = document.getElementById("mainSystem");


// ========================================
// USER LOGIN
// HS - PER4-11
// ========================================

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = loginUsername.value.trim();
    const password = loginPassword.value;

    if (username === "" || password === "") {
        loginMessage.textContent =
            "Username and password are required.";
        loginMessage.style.color = "red";
        return;
    }

    const user = registeredUsers.find(function (registeredUser) {
        return (
            registeredUser.username.toLowerCase() ===
            username.toLowerCase()
        );
    });

    if (!user || user.password !== password) {
        loginMessage.textContent =
            "Invalid username or password. Access denied.";
        loginMessage.style.color = "red";
        return;
    }

    if (!user.active) {
        loginMessage.textContent =
            "This user account has been deactivated. Access denied.";
        loginMessage.style.color = "red";
        return;
    }

    currentUser = user;

    loginMessage.textContent = "Login successful.";
    loginMessage.style.color = "green";

    loginSection.style.display = "none";
    mainSystem.style.display = "block";

    applyRoleBasedAccess();
});


// ========================================
// ROLE BASED ACCESS
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

    const productionScheduleSection =
        document.getElementById("productionScheduleSection");

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


    loggedInUsername.textContent = currentUser.username;
    loggedInRole.textContent = currentUser.role;


    // ADMIN / VOLUNTEER COORDINATOR

    if (currentUser.role === "Admin") {

        productionSection.style.display = "block";
        performanceSection.style.display = "block";
        productionScheduleSection.style.display = "block";
        volunteerSection.style.display = "block";
        crewRoleSection.style.display = "block";
        assignmentSection.style.display = "block";
        rosterSection.style.display = "block";
        volunteerAssignmentSection.style.display = "none";

        accessMessage.textContent =
            "Volunteer Coordinator access granted. Administrative functions are available.";

        accessMessage.style.color = "green";

        return;
    }


    // VOLUNTEER

    if (currentUser.role === "User") {

        productionSection.style.display = "none";
        performanceSection.style.display = "none";
        productionScheduleSection.style.display = "none";
        volunteerSection.style.display = "none";
        crewRoleSection.style.display = "none";
        assignmentSection.style.display = "none";
        rosterSection.style.display = "none";
        volunteerAssignmentSection.style.display = "block";

        accessMessage.textContent =
            "Volunteer access granted. Administrative management functions are restricted.";

        accessMessage.style.color = "green";

        displayMyAssignments();

        return;
    }


    productionSection.style.display = "none";
    performanceSection.style.display = "none";
    productionScheduleSection.style.display = "none";
    volunteerSection.style.display = "none";
    crewRoleSection.style.display = "none";
    assignmentSection.style.display = "none";
    rosterSection.style.display = "none";
    volunteerAssignmentSection.style.display = "none";

    accessMessage.textContent = "Access denied.";
    accessMessage.style.color = "red";
}


// ========================================
// USER LOGOUT
// BN - PER4-16
// ========================================

const logoutButton =
    document.getElementById("logoutButton");

logoutButton.addEventListener("click", function () {

    currentUser = null;

    mainSystem.style.display = "none";
    loginSection.style.display = "block";

    loginUsername.value = "";
    loginPassword.value = "";
    loginMessage.textContent = "";

    document.getElementById("loggedInUsername").textContent = "";
    document.getElementById("loggedInRole").textContent = "";
    document.getElementById("accessMessage").textContent = "";

    loginUsername.focus();
});


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

const performanceProduction =
    document.getElementById("performanceProduction");


productionForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = productionTitle.value.trim();

    if (title === "") {
        productionMessage.textContent =
            "Please enter a production title.";
        productionMessage.style.color = "red";
        return;
    }

    productions.push({
        title: title
    });

    displayProductions();
    updateProductionOptions();

    productionMessage.textContent =
        "Production saved successfully.";

    productionMessage.style.color = "green";

    productionForm.reset();
});


// ========================================
// DISPLAY PRODUCTIONS
// ========================================

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


// ========================================
// EDIT PRODUCTION
// ========================================

function editProduction(index) {

    const oldTitle = productions[index].title;

    const updatedTitle = prompt(
        "Update production title:",
        oldTitle
    );

    if (updatedTitle === null) {
        return;
    }

    if (updatedTitle.trim() === "") {
        productionMessage.textContent =
            "Production title cannot be empty.";
        productionMessage.style.color = "red";
        return;
    }

    const newTitle = updatedTitle.trim();

    productions[index].title = newTitle;

    performances.forEach(function (performance) {

        if (performance.production === oldTitle) {
            performance.production = newTitle;
        }
    });

    crewAssignments.forEach(function (assignment) {

        if (assignment.production === oldTitle) {
            assignment.production = newTitle;
        }
    });

    displayProductions();
    displayPerformances();
    updateProductionOptions();
    updatePerformanceSelectors();
    displayAssignments();

    productionMessage.textContent =
        "Production updated successfully.";

    productionMessage.style.color = "green";
}


// ========================================
// REMOVE PRODUCTION
// ========================================

function removeProduction(index) {

    const production = productions[index];

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
    updateProductionOptions();

    productionMessage.textContent =
        "Production removed successfully.";

    productionMessage.style.color = "green";
}


// ========================================
// UPDATE PRODUCTION OPTIONS
// ========================================

function updateProductionOptions() {

    performanceProduction.innerHTML =
        '<option value="">Select production</option>';

    productions.forEach(function (production) {

        const option =
            document.createElement("option");

        option.value = production.title;
        option.textContent = production.title;

        performanceProduction.appendChild(option);
    });
}


// ========================================
// PERFORMANCE MANAGEMENT
// YM - PER4-4
// ========================================

const performanceForm =
    document.getElementById("performanceForm");

const performanceDate =
    document.getElementById("performanceDate");

const performanceTime =
    document.getElementById("performanceTime");

const performanceMessage =
    document.getElementById("performanceMessage");

const performanceBody =
    document.getElementById("performanceBody");


performanceForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const production = performanceProduction.value;
    const date = performanceDate.value;
    const time = performanceTime.value;

    if (
        production === "" ||
        date === "" ||
        time === ""
    ) {
        performanceMessage.textContent =
            "Please select a production and enter the performance date and start time.";

        performanceMessage.style.color = "red";
        return;
    }

    performances.push({
        production: production,
        date: date,
        time: time
    });

    sortPerformances();
    displayPerformances();
    updatePerformanceSelectors();

    performanceMessage.textContent =
        "Performance saved successfully.";

    performanceMessage.style.color = "green";

    performanceForm.reset();
});


// ========================================
// PERFORMANCE REFERENCE
// YM - PER4-10
// ========================================

function getPerformanceReference(performance) {

    return (
        performance.production +
        " | " +
        performance.date +
        " | " +
        performance.time
    );
}


// ========================================
// UPDATE PERFORMANCE DROPDOWNS
// YM - PER4-10
// ========================================

function updatePerformanceSelectors() {

    const rolePerformance =
        document.getElementById("rolePerformance");

    const assignmentPerformance =
        document.getElementById("performance");

    const rosterPerformance =
        document.getElementById("rosterPerformance");

    const selectors = [
        rolePerformance,
        assignmentPerformance,
        rosterPerformance
    ];

    selectors.forEach(function (selector) {

        if (!selector) {
            return;
        }

        selector.innerHTML =
            '<option value="">Select performance</option>';

        performances.forEach(function (performance) {

            const option =
                document.createElement("option");

            const reference =
                getPerformanceReference(performance);

            option.value = reference;

            option.textContent =
                performance.production +
                " - " +
                performance.date +
                " - " +
                performance.time;

            selector.appendChild(option);
        });
    });
}


// ========================================
// SORT PERFORMANCES
// ========================================

function sortPerformances() {

    performances.sort(function (a, b) {

        const first =
            new Date(a.date + "T" + a.time);

        const second =
            new Date(b.date + "T" + b.time);

        return first - second;
    });
}


// ========================================
// DISPLAY PERFORMANCES
// ========================================

function displayPerformances() {

    performanceBody.innerHTML = "";

    performances.forEach(function (performance, index) {

        const row =
            document.createElement("tr");

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

    const performance =
        performances[index];

    const oldReference =
        getPerformanceReference(performance);

    const newDate = prompt(
        "Update performance date (YYYY-MM-DD):",
        performance.date
    );

    if (newDate === null) {
        return;
    }

    const newTime = prompt(
        "Update start time (HH:MM):",
        performance.time
    );

    if (newTime === null) {
        return;
    }

    if (
        newDate.trim() === "" ||
        newTime.trim() === ""
    ) {
        performanceMessage.textContent =
            "Performance date and start time are required.";

        performanceMessage.style.color = "red";
        return;
    }

    const datePattern =
        /^\d{4}-\d{2}-\d{2}$/;

    const timePattern =
        /^([01]\d|2[0-3]):[0-5]\d$/;

    if (
        !datePattern.test(newDate.trim()) ||
        !timePattern.test(newTime.trim())
    ) {
        performanceMessage.textContent =
            "Please enter a valid date and start time.";

        performanceMessage.style.color = "red";
        return;
    }

    performance.date = newDate.trim();
    performance.time = newTime.trim();

    const newReference =
        getPerformanceReference(performance);

    requiredCrewRoles.forEach(function (item) {

        if (item.performance === oldReference) {
            item.performance = newReference;
        }
    });

    crewAssignments.forEach(function (assignment) {

        if (assignment.performance === oldReference) {

            assignment.performance =
                newReference;

            assignment.production =
                performance.production;

            assignment.performanceDate =
                performance.date;

            assignment.startTime =
                performance.time;
        }
    });

    sortPerformances();
    displayPerformances();
    updatePerformanceSelectors();
    displayRequiredRoles();
    displayAssignments();

    if (
        currentUser &&
        currentUser.role === "User"
    ) {
        displayMyAssignments();
    }

    performanceMessage.textContent =
        "Performance updated successfully.";

    performanceMessage.style.color = "green";
}


// ========================================
// REMOVE PERFORMANCE
// ========================================

function removePerformance(index) {

    const performance =
        performances[index];

    const confirmed = confirm(
        "Remove this performance from " +
        performance.production +
        "?"
    );

    if (!confirmed) {
        return;
    }

    performances.splice(index, 1);

    displayPerformances();
    updatePerformanceSelectors();

    performanceMessage.textContent =
        "Performance removed successfully.";

    performanceMessage.style.color = "green";
}


// ========================================
// VOLUNTEER MANAGEMENT
// HS - PER4-1
// BN - PER4-2
// HS - PER4-17
// YM - PER4-15
// ========================================

const volunteerForm =
    document.getElementById("volunteerForm");

const volunteerBody =
    document.getElementById("volunteerBody");

const volunteerMessage =
    document.getElementById("message");


// ========================================
// ADD VOLUNTEER
// HS - PER4-1
// ========================================

volunteerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document
            .getElementById("fullName")
            .value
            .trim();

    const phone =
        document
            .getElementById("phone")
            .value
            .trim();

    const email =
        document
            .getElementById("email")
            .value
            .trim();

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

    <td class="volunteer-access">
        No Access
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
            Deactivate Volunteer
        </button>

        <button
            type="button"
            class="grant-access-button"
            onclick="grantVolunteerAccess(this)"
        >
            Grant Access
        </button>

        <button
            type="button"
            class="deactivate-access-button"
            onclick="deactivateVolunteerAccess(this)"
            disabled
        >
            Deactivate Access
        </button>

        <button
            type="button"
            onclick="viewVolunteerDetails(this)"
        >
            View Details
        </button>

    </td>
`;


    volunteerBody.appendChild(row);

    volunteerMessage.textContent =
        "Volunteer saved successfully.";

    volunteerMessage.style.color = "green";

    volunteerForm.reset();

    clearVolunteerSearch();
});


// ========================================
// EDIT VOLUNTEER
// BN - PER4-2
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
            "Name, phone and email are required."
        );
        return;
    }

    if (
        !updatedEmail.includes("@") ||
        !updatedEmail.includes(".")
    ) {
        alert(
            "Please enter a valid email address."
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

    closeVolunteerDetails();
}


// ========================================
// DEACTIVATE VOLUNTEER
// BN - PER4-2
// ========================================

function deactivateVolunteer(button) {

    const row =
        button.closest("tr");

    const statusCell =
        row.querySelector(".volunteer-status");

    statusCell.textContent =
        "Inactive";

    button.disabled = true;

    volunteerMessage.textContent =
        "Volunteer deactivated successfully. Existing records are retained.";

    volunteerMessage.style.color = "green";

    closeVolunteerDetails();
}


// ========================================
// GRANT VOLUNTEER SYSTEM ACCESS
// HS - PER4-17
// ========================================
// ========================================
// GRANT VOLUNTEER SYSTEM ACCESS
// HS - PER4-17
// ========================================

function grantVolunteerAccess(button) {

    const row =
        button.closest("tr");

    const nameCell =
        row.querySelector(
            ".volunteer-name"
        );

    const emailCell =
        row.querySelector(
            ".volunteer-email"
        );

    const statusCell =
        row.querySelector(
            ".volunteer-status"
        );

    const accessCell =
        row.querySelector(
            ".volunteer-access"
        );

    const deactivateAccessButton =
        row.querySelector(
            ".deactivate-access-button"
        );


    const volunteerName =
        nameCell.textContent.trim();

    const volunteerEmail =
        emailCell.textContent.trim();


    // Volunteer record must still be active.

    if (
        statusCell.textContent.trim() !==
        "Active"
    ) {

        volunteerMessage.textContent =
            "System access cannot be granted to an inactive volunteer.";

        volunteerMessage.style.color =
            "red";

        return;
    }


    // Check whether an account already exists.

    const existingUser =
        registeredUsers.find(
            function (user) {

                return (

                    user.volunteerName &&
                    user.volunteerName
                        .toLowerCase() ===
                    volunteerName
                        .toLowerCase()

                );

            }
        );


    // If an active account already exists,
    // do not create another account.

    if (
        existingUser &&
        existingUser.active
    ) {

        volunteerMessage.textContent =
            volunteerName +
            " already has active system access.";

        volunteerMessage.style.color =
            "red";

        return;
    }


    // If an old inactive account exists,
    // reactivate the same account.

    if (
        existingUser &&
        !existingUser.active
    ) {

        existingUser.active =
            true;


        accessCell.textContent =
            "Active";


        button.disabled =
            true;


        if (deactivateAccessButton) {

            deactivateAccessButton.disabled =
                false;

        }


        volunteerMessage.textContent =
            "System access reactivated for " +
            volunteerName +
            ". Username: " +
            existingUser.username;


        volunteerMessage.style.color =
            "green";


        return;

    }


    // Create username from volunteer name.

    const baseUsername =
        volunteerName
            .toLowerCase()
            .replace(
                /[^a-z0-9]/g,
                ""
            );


    let username =
        baseUsername;

    let number =
        1;


    // Prevent duplicate usernames.

    while (
        registeredUsers.some(
            function (user) {

                return (

                    user.username
                        .toLowerCase() ===
                    username
                        .toLowerCase()

                );

            }
        )
    ) {

        username =
            baseUsername +
            number;

        number++;

    }


    const password =
        "welcome123";


    // Create linked volunteer account.

    registeredUsers.push({

        username:
            username,

        password:
            password,

        role:
            "User",

        active:
            true,

        volunteerName:
            volunteerName,

        volunteerEmail:
            volunteerEmail

    });


    // Update display.

    accessCell.textContent =
        "Active";


    button.disabled =
        true;


    if (deactivateAccessButton) {

        deactivateAccessButton.disabled =
            false;

    }


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
// DEACTIVATE VOLUNTEER SYSTEM ACCESS
// YM - PER4-18
// ========================================

function deactivateVolunteerAccess(button) {

    const row =
        button.closest("tr");


    const nameCell =
        row.querySelector(
            ".volunteer-name"
        );

    const accessCell =
        row.querySelector(
            ".volunteer-access"
        );

    const grantAccessButton =
        row.querySelector(
            ".grant-access-button"
        );


    const volunteerName =
        nameCell.textContent.trim();


    // Find the linked system account.

    const linkedUser =
        registeredUsers.find(
            function (user) {

                return (

                    user.volunteerName &&
                    user.volunteerName
                        .toLowerCase() ===
                    volunteerName
                        .toLowerCase()

                );

            }
        );


    // Make sure an active account exists.

    if (
        !linkedUser ||
        !linkedUser.active
    ) {

        volunteerMessage.textContent =
            volunteerName +
            " does not currently have active system access.";

        volunteerMessage.style.color =
            "red";

        return;

    }


    // Acceptance Criteria:
    // Ask coordinator for confirmation first.

    const confirmed =
        confirm(
            "Are you sure you want to deactivate system access for " +
            volunteerName +
            "?"
        );


    if (!confirmed) {

        volunteerMessage.textContent =
            "System access deactivation cancelled.";

        volunteerMessage.style.color =
            "red";

        return;

    }


    // Only deactivate login access.
    // DO NOT delete volunteer details.
    // DO NOT delete crew assignments.
    // DO NOT delete historical information.

    linkedUser.active =
        false;


    // Clearly display inactive access.

    accessCell.textContent =
        "Inactive";


    // Allow access to be granted again later.

    if (grantAccessButton) {

        grantAccessButton.disabled =
            false;

    }


    button.disabled =
        true;


    volunteerMessage.textContent =
        "System access for " +
        volunteerName +
        " has been deactivated. " +
        "Volunteer records and existing crew assignments have been preserved.";


    volunteerMessage.style.color =
        "green";


    // Refresh details if currently open.

    if (
        volunteerDetails.style.display !==
        "none"
    ) {

        viewVolunteerDetails(
            row.querySelector(
                'button[onclick^="viewVolunteerDetails"]'
            )
        );

    }

}


// ========================================
// SEARCH AND VIEW VOLUNTEER RECORDS
// YM - PER4-15
// ========================================

const volunteerSearch =
    document.getElementById("volunteerSearch");

const searchVolunteerButton =
    document.getElementById("searchVolunteerButton");

const clearVolunteerSearchButton =
    document.getElementById(
        "clearVolunteerSearchButton"
    );

const volunteerSearchMessage =
    document.getElementById(
        "volunteerSearchMessage"
    );

const volunteerDetails =
    document.getElementById(
        "volunteerDetails"
    );

const closeVolunteerDetailsButton =
    document.getElementById(
        "closeVolunteerDetailsButton"
    );


// ========================================
// SEARCH BUTTON
// ========================================

searchVolunteerButton.addEventListener(
    "click",
    function () {

        searchVolunteerRecords();

    }
);


// ========================================
// SEARCH WHEN ENTER IS PRESSED
// ========================================

volunteerSearch.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            searchVolunteerRecords();
        }
    }
);


// ========================================
// SEARCH VOLUNTEER RECORDS
// YM - PER4-15
// ========================================

function searchVolunteerRecords() {

    const searchValue =
        volunteerSearch
            .value
            .trim()
            .toLowerCase();

    const rows =
        volunteerBody.querySelectorAll("tr");


    closeVolunteerDetails();


    // If search field is empty,
    // show all volunteer records.

    if (searchValue === "") {

        rows.forEach(function (row) {
            row.style.display = "";
        });

        volunteerSearchMessage.textContent =
            "Please enter a volunteer name to search.";

        volunteerSearchMessage.style.color =
            "red";

        return;
    }


    let matchCount = 0;


    rows.forEach(function (row) {

        const nameCell =
            row.querySelector(
                ".volunteer-name"
            );

        if (!nameCell) {
            return;
        }

        const volunteerName =
            nameCell
                .textContent
                .trim()
                .toLowerCase();


        if (
            volunteerName.includes(
                searchValue
            )
        ) {
            row.style.display = "";
            matchCount++;
        } else {
            row.style.display = "none";
        }
    });


    // No volunteer found.

    if (matchCount === 0) {

        volunteerSearchMessage.textContent =
            "No volunteer records found.";

        volunteerSearchMessage.style.color =
            "red";

        return;
    }


    // Matching records found.

    if (matchCount === 1) {

        volunteerSearchMessage.textContent =
            "1 matching volunteer record found.";

    } else {

        volunteerSearchMessage.textContent =
            matchCount +
            " matching volunteer records found.";
    }

    volunteerSearchMessage.style.color =
        "green";
}


// ========================================
// CLEAR VOLUNTEER SEARCH
// YM - PER4-15
// ========================================

clearVolunteerSearchButton.addEventListener(
    "click",
    function () {

        clearVolunteerSearch();

    }
);


function clearVolunteerSearch() {

    volunteerSearch.value =
        "";

    volunteerSearchMessage.textContent =
        "";

    const rows =
        volunteerBody.querySelectorAll("tr");

    rows.forEach(function (row) {
        row.style.display = "";
    });

    closeVolunteerDetails();
}


// ========================================
// VIEW VOLUNTEER DETAILS
// YM - PER4-15
// ========================================

function viewVolunteerDetails(button) {

    const row =
        button.closest("tr");

    const name =
        row
            .querySelector(
                ".volunteer-name"
            )
            .textContent
            .trim();

    const phone =
        row
            .querySelector(
                ".volunteer-phone"
            )
            .textContent
            .trim();

    const email =
        row
            .querySelector(
                ".volunteer-email"
            )
            .textContent
            .trim();

    const status =
        row
            .querySelector(
                ".volunteer-status"
            )
            .textContent
            .trim();

    const systemAccess =
        row
            .querySelector(
                ".volunteer-access"
            )
            .textContent
            .trim();


    document.getElementById(
        "detailVolunteerName"
    ).textContent = name;


    document.getElementById(
        "detailVolunteerPhone"
    ).textContent = phone;


    document.getElementById(
        "detailVolunteerEmail"
    ).textContent = email;


    document.getElementById(
        "detailVolunteerStatus"
    ).textContent = status;


    document.getElementById(
        "detailVolunteerAccess"
    ).textContent = systemAccess;


    volunteerDetails.style.display =
        "block";


    volunteerSearchMessage.textContent =
        "Volunteer details displayed.";

    volunteerSearchMessage.style.color =
        "green";
}


// ========================================
// CLOSE VOLUNTEER DETAILS
// YM - PER4-15
// ========================================

closeVolunteerDetailsButton.addEventListener(
    "click",
    function () {

        closeVolunteerDetails();

    }
);


function closeVolunteerDetails() {

    volunteerDetails.style.display =
        "none";

    document.getElementById(
        "detailVolunteerName"
    ).textContent = "";

    document.getElementById(
        "detailVolunteerPhone"
    ).textContent = "";

    document.getElementById(
        "detailVolunteerEmail"
    ).textContent = "";

    document.getElementById(
        "detailVolunteerStatus"
    ).textContent = "";

    document.getElementById(
        "detailVolunteerAccess"
    ).textContent = "";
}


// ========================================
// CREW ROLE MANAGEMENT
// HS + BN
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


crewRoleForm.addEventListener(
    "submit",
    function (event) {

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
    }
);


// ========================================
// DISPLAY REQUIRED ROLES
// ========================================

function displayRequiredRoles() {

    crewRoleBody.innerHTML = "";

    requiredCrewRoles.forEach(
        function (item, index) {

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
        }
    );
}


// ========================================
// EDIT CREW ROLE
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
// REMOVE CREW ROLE
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

    requiredCrewRoles.splice(index, 1);

    displayRequiredRoles();

    roleMessage.textContent =
        "Crew role removed successfully.";

    roleMessage.style.color =
        "green";
}


// ========================================
// ASSIGN VOLUNTEER
// HS PER4-6
// YM PER4-7
// YM PER4-10
// ========================================

const assignmentForm =
    document.getElementById("assignmentForm");

const assignmentMessage =
    document.getElementById("assignmentMessage");

const assignmentBody =
    document.getElementById("assignmentBody");


assignmentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const performanceReference =
            document
                .getElementById("performance")
                .value;

        const role =
            document
                .getElementById("assignmentRole")
                .value;

        const volunteer =
            document
                .getElementById("volunteer")
                .value;

        if (
            performanceReference === "" ||
            role === "" ||
            volunteer === ""
        ) {

            assignmentMessage.textContent =
                "Please select a performance, crew role and volunteer.";

            assignmentMessage.style.color =
                "red";

            return;
        }

        const selectedPerformance =
            performances.find(
                function (performance) {

                    return (
                        getPerformanceReference(
                            performance
                        ) ===
                        performanceReference
                    );
                }
            );

        if (!selectedPerformance) {

            assignmentMessage.textContent =
                "The selected performance could not be found.";

            assignmentMessage.style.color =
                "red";

            return;
        }

        const duplicateAssignment =
            crewAssignments.some(
                function (assignment) {

                    return (
                        assignment.performance ===
                            performanceReference &&

                        assignment.volunteer
                            .toLowerCase() ===
                            volunteer.toLowerCase()
                    );
                }
            );

        if (duplicateAssignment) {

            assignmentMessage.textContent =
                volunteer +
                " already has a crew role in this performance.";

            assignmentMessage.style.color =
                "red";

            return;
        }

        crewAssignments.push({

            performance:
                performanceReference,

            production:
                selectedPerformance.production,

            performanceDate:
                selectedPerformance.date,

            startTime:
                selectedPerformance.time,

            role:
                role,

            volunteer:
                volunteer,

            status:
                "Unconfirmed"
        });

        displayAssignments();

        assignmentMessage.textContent =
            "Volunteer assigned successfully.";

        assignmentMessage.style.color =
            "green";

        assignmentForm.reset();
    }
);


// ========================================
// CONFIRM ASSIGNMENT
// HS - PER4-13
// ========================================

function confirmAssignment(index) {

    const assignment =
        crewAssignments[index];

    if (!assignment) {
        return;
    }

    if (
        assignment.status ===
        "Confirmed"
    ) {

        assignmentMessage.textContent =
            "This crew assignment is already confirmed.";

        assignmentMessage.style.color =
            "red";

        return;
    }

    assignment.status =
        "Confirmed";

    displayAssignments();

    if (
        currentUser &&
        currentUser.role === "User"
    ) {
        displayMyAssignments();
    }

    assignmentMessage.textContent =
        "Crew assignment confirmed successfully.";

    assignmentMessage.style.color =
        "green";
}


// ========================================
// DISPLAY ASSIGNMENTS
// ========================================

function displayAssignments() {

    assignmentBody.innerHTML = "";

    crewAssignments.forEach(
        function (assignment, index) {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>
                    ${assignment.performance}
                </td>

                <td>
                    ${assignment.role}
                </td>

                <td>
                    ${assignment.volunteer}
                </td>

                <td>
                    ${assignment.status}
                </td>

                <td>

                    <button
                        type="button"
                        onclick="confirmAssignment(${index})"
                    >
                        Confirm
                    </button>

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
        }
    );
}


// ========================================
// CHANGE ASSIGNMENT
// HS - PER4-8
// ========================================

function changeAssignment(index) {

    const currentAssignment =
        crewAssignments[index];

    const newRole = prompt(
        "Enter new crew role:",
        currentAssignment.role
    );

    if (newRole === null) {
        return;
    }

    const newVolunteer = prompt(
        "Enter volunteer name:",
        currentAssignment.volunteer
    );

    if (newVolunteer === null) {
        return;
    }

    if (
        newRole.trim() === "" ||
        newVolunteer.trim() === ""
    ) {

        assignmentMessage.textContent =
            "Crew role and volunteer are required.";

        assignmentMessage.style.color =
            "red";

        return;
    }

    const duplicateAssignment =
        crewAssignments.some(
            function (
                assignment,
                assignmentIndex
            ) {

                return (
                    assignmentIndex !==
                        index &&

                    assignment.performance ===
                        currentAssignment.performance &&

                    assignment.volunteer
                        .toLowerCase() ===
                        newVolunteer
                            .trim()
                            .toLowerCase()
                );
            }
        );

    if (duplicateAssignment) {

        assignmentMessage.textContent =
            newVolunteer.trim() +
            " already has a crew role in this performance.";

        assignmentMessage.style.color =
            "red";

        return;
    }

    currentAssignment.role =
        newRole.trim();

    currentAssignment.volunteer =
        newVolunteer.trim();

    displayAssignments();

    if (
        currentUser &&
        currentUser.role === "User"
    ) {
        displayMyAssignments();
    }

    assignmentMessage.textContent =
        "Crew assignment updated successfully.";

    assignmentMessage.style.color =
        "green";
}


// ========================================
// REMOVE ASSIGNMENT
// HS - PER4-8
// ========================================

function removeAssignment(index) {

    const assignment =
        crewAssignments[index];

    const confirmed = confirm(
        "Remove " +
        assignment.volunteer +
        " from " +
        assignment.role +
        " for " +
        assignment.performance +
        "?"
    );

    if (!confirmed) {
        return;
    }

    crewAssignments.splice(index, 1);

    displayAssignments();

    if (
        currentUser &&
        currentUser.role === "User"
    ) {
        displayMyAssignments();
    }

    assignmentMessage.textContent =
        "Crew assignment removed successfully. The crew role is now unfilled.";

    assignmentMessage.style.color =
        "green";
}


// ========================================
// VIEW MY ASSIGNMENTS
// YM - PER4-10
// ========================================

function displayMyAssignments() {

    const myAssignmentBody =
        document.getElementById(
            "myAssignmentBody"
        );

    const volunteerAccessMessage =
        document.getElementById(
            "volunteerAccessMessage"
        );

    myAssignmentBody.innerHTML = "";

    if (!currentUser) {
        return;
    }

    const userAssignments =
        crewAssignments.filter(
            function (assignment) {

                if (
                    currentUser.volunteerName
                ) {

                    return (
                        assignment.volunteer
                            .toLowerCase() ===

                        currentUser.volunteerName
                            .toLowerCase()
                    );
                }

                return (
                    currentUser.username ===
                        "user" &&

                    assignment.volunteer ===
                        "John Smith"
                );
            }
        );

    if (
        userAssignments.length === 0
    ) {

        volunteerAccessMessage.textContent =
            "No crew assignments are currently available for this volunteer.";

        return;
    }

    userAssignments.sort(
        function (a, b) {

            const first =
                new Date(
                    a.performanceDate +
                    "T" +
                    a.startTime
                );

            const second =
                new Date(
                    b.performanceDate +
                    "T" +
                    b.startTime
                );

            return first - second;
        }
    );

    volunteerAccessMessage.textContent =
        "Your current crew assignments:";

    userAssignments.forEach(
        function (assignment) {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>
                    ${assignment.production}
                </td>

                <td>
                    ${assignment.performanceDate}
                </td>

                <td>
                    ${assignment.startTime}
                </td>

                <td>
                    ${assignment.role}
                </td>

                <td>
                    ${assignment.status}
                </td>
            `;

            myAssignmentBody.appendChild(row);
        }
    );
}


// ========================================
// VIEW PERFORMANCE ROSTER
// BN - PER4-9
// ========================================

const rosterPerformance =
    document.getElementById(
        "rosterPerformance"
    );

const viewRosterButton =
    document.getElementById(
        "viewRosterButton"
    );

const rosterMessage =
    document.getElementById(
        "rosterMessage"
    );

const rosterTable =
    document.getElementById(
        "rosterTable"
    );

const rosterBody =
    document.getElementById(
        "rosterBody"
    );


viewRosterButton.addEventListener(
    "click",
    function () {

        const selectedPerformance =
            rosterPerformance.value;

        rosterBody.innerHTML = "";

        if (
            selectedPerformance === ""
        ) {

            rosterTable.style.display =
                "none";

            rosterMessage.textContent =
                "Please select a performance.";

            rosterMessage.style.color =
                "red";

            return;
        }

        const rolesForPerformance =
            requiredCrewRoles.filter(
                function (item) {

                    return (
                        item.performance ===
                        selectedPerformance
                    );
                }
            );

        if (
            rolesForPerformance.length ===
            0
        ) {

            rosterTable.style.display =
                "none";

            rosterMessage.textContent =
                "No crew roles have been created for this performance.";

            rosterMessage.style.color =
                "red";

            return;
        }

        rolesForPerformance.forEach(
            function (roleItem) {

                const assignment =
                    crewAssignments.find(
                        function (item) {

                            return (
                                item.performance ===
                                    selectedPerformance &&

                                item.role ===
                                    roleItem.role
                            );
                        }
                    );

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
            }
        );

        rosterTable.style.display =
            "table";

        rosterMessage.textContent =
            "Performance roster loaded successfully.";

        rosterMessage.style.color =
            "green";
    }
);


// ========================================
// PRODUCTION & PERFORMANCE SCHEDULE
// BN - PER4-14
// ========================================

const viewScheduleButton =
    document.getElementById(
        "viewScheduleButton"
    );

const scheduleMessage =
    document.getElementById(
        "scheduleMessage"
    );

const productionSchedule =
    document.getElementById(
        "productionSchedule"
    );


viewScheduleButton.addEventListener(
    "click",
    function () {

        displayProductionSchedule();
    }
);


function displayProductionSchedule() {

    productionSchedule.innerHTML = "";

    if (
        productions.length === 0
    ) {

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

    productions.forEach(
        function (production) {

            const productionContainer =
                document.createElement("div");

            const productionHeading =
                document.createElement("h3");

            productionHeading.textContent =
                production.title;

            productionContainer.appendChild(
                productionHeading
            );

            const productionPerformances =
                performances.filter(
                    function (performance) {

                        return (
                            performance.production ===
                            production.title
                        );
                    }
                );

            productionPerformances.sort(
                function (a, b) {

                    const first =
                        new Date(
                            a.date +
                            "T" +
                            a.time
                        );

                    const second =
                        new Date(
                            b.date +
                            "T" +
                            b.time
                        );

                    return first - second;
                }
            );

            if (
                productionPerformances.length ===
                0
            ) {

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

                            <td>
                                ${performance.date}
                            </td>

                            <td>
                                ${performance.time}
                            </td>
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
        }
    );
}