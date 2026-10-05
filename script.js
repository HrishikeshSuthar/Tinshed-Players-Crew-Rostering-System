// ========================================
// TINSHED PLAYERS CREW ROSTERING SYSTEM
// COMPLETE SCRIPT.JS
// ========================================


// ========================================
// DATA
// ========================================

let productions = [];

let performances = [];

let requiredCrewRoles = [];

let crewAssignments = [];


// ========================================
// REGISTERED USERS
// HS - PER4-11
// ========================================

const registeredUsers = [

    {
        username: "admin",
        password: "admin123",
        role: "Admin",
        active: true,
        volunteerName: null,
        volunteerEmail: null
    },

    {
        username: "user",
        password: "user123",
        role: "User",
        active: true,
        volunteerName: "John Smith",
        volunteerEmail: null
    }

];


let currentUser = null;


// ========================================
// LOGIN
// HS - PER4-11
// ========================================

const loginSection =
    document.getElementById("loginSection");

const loginForm =
    document.getElementById("loginForm");

const loginUsername =
    document.getElementById("loginUsername");

const loginPassword =
    document.getElementById("loginPassword");

const loginMessage =
    document.getElementById("loginMessage");

const mainSystem =
    document.getElementById("mainSystem");


loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const username =
            loginUsername.value.trim();

        const password =
            loginPassword.value;


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


        const foundUser =
            registeredUsers.find(
                function (user) {

                    return (
                        user.username === username &&
                        user.password === password
                    );

                }
            );


        if (!foundUser) {

            loginMessage.textContent =
                "Invalid username or password. Access denied.";

            loginMessage.style.color =
                "red";

            return;
        }


        if (!foundUser.active) {

            loginMessage.textContent =
                "This user account is inactive. Access denied.";

            loginMessage.style.color =
                "red";

            return;
        }


        currentUser = foundUser;


        loginMessage.textContent = "";

        loginSection.style.display =
            "none";

        mainSystem.style.display =
            "block";


        applyRoleBasedAccess();

    }
);


// ========================================
// ROLE-BASED ACCESS
// BN - PER4-12
// ========================================

function applyRoleBasedAccess() {

    if (!currentUser) {
        return;
    }


    const adminSections = [

        "productionManagementSection",

        "performanceManagementSection",

        "productionScheduleSection",

        "volunteerManagementSection",

        "crewRoleManagementSection",

        "assignmentManagementSection",

        "rosterSection"

    ];


    const volunteerAssignmentSection =
        document.getElementById(
            "volunteerAssignmentSection"
        );


    const loggedInUsername =
        document.getElementById(
            "loggedInUsername"
        );

    const loggedInRole =
        document.getElementById(
            "loggedInRole"
        );

    const accessMessage =
        document.getElementById(
            "accessMessage"
        );


    loggedInUsername.textContent =
        currentUser.username;

    loggedInRole.textContent =
        currentUser.role;


    if (currentUser.role === "Admin") {

        adminSections.forEach(
            function (sectionId) {

                const section =
                    document.getElementById(
                        sectionId
                    );

                if (section) {

                    section.style.display =
                        "block";

                }

            }
        );


        volunteerAssignmentSection.style.display =
            "none";


        accessMessage.textContent =
            "You have Volunteer Coordinator access.";

        accessMessage.style.color =
            "green";

    }


    else if (currentUser.role === "User") {

        adminSections.forEach(
            function (sectionId) {

                const section =
                    document.getElementById(
                        sectionId
                    );

                if (section) {

                    section.style.display =
                        "none";

                }

            }
        );


        volunteerAssignmentSection.style.display =
            "block";


        accessMessage.textContent =
            "You have Volunteer access. Administrative management functions are restricted.";

        accessMessage.style.color =
            "green";


        displayMyAssignments();

    }

}


// ========================================
// LOGOUT
// BN - PER4-16
// ========================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


logoutButton.addEventListener(
    "click",
    function () {

        currentUser = null;


        mainSystem.style.display =
            "none";

        loginSection.style.display =
            "block";


        loginUsername.value = "";

        loginPassword.value = "";

        loginMessage.textContent = "";


        document.getElementById(
            "loggedInUsername"
        ).textContent = "";


        document.getElementById(
            "loggedInRole"
        ).textContent = "";


        document.getElementById(
            "accessMessage"
        ).textContent = "";


        document.getElementById(
            "myAssignmentBody"
        ).innerHTML = "";


        loginUsername.focus();

    }
);


// ========================================
// PRODUCTION MANAGEMENT
// YM - PER4-3
// ========================================

const productionForm =
    document.getElementById(
        "productionForm"
    );

const productionTitle =
    document.getElementById(
        "productionTitle"
    );

const productionMessage =
    document.getElementById(
        "productionMessage"
    );

const productionBody =
    document.getElementById(
        "productionBody"
    );


productionForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title =
            productionTitle.value.trim();


        if (title === "") {

            productionMessage.textContent =
                "Production title is required.";

            productionMessage.style.color =
                "red";

            return;
        }


        const duplicate =
            productions.some(
                function (production) {

                    return (
                        production.title.toLowerCase() ===
                        title.toLowerCase()
                    );

                }
            );


        if (duplicate) {

            productionMessage.textContent =
                "This production already exists.";

            productionMessage.style.color =
                "red";

            return;
        }


        productions.push({

            title: title

        });


        displayProductions();

        updateProductionOptions();

        displayProductionSchedule();


        productionMessage.textContent =
            "Production created successfully.";

        productionMessage.style.color =
            "green";


        productionForm.reset();

    }
);


// ========================================
// DISPLAY PRODUCTIONS
// ========================================

function displayProductions() {

    productionBody.innerHTML = "";


    productions.forEach(
        function (
            production,
            index
        ) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${production.title}
                </td>

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


            productionBody.appendChild(
                row
            );

        }
    );

}


// ========================================
// UPDATE PRODUCTION OPTIONS
// ========================================

function updateProductionOptions() {

    const performanceProduction =
        document.getElementById(
            "performanceProduction"
        );


    performanceProduction.innerHTML =
        '<option value="">Select production</option>';


    productions.forEach(
        function (production) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                production.title;

            option.textContent =
                production.title;


            performanceProduction.appendChild(
                option
            );

        }
    );

}


// ========================================
// EDIT PRODUCTION
// ========================================

function editProduction(index) {

    const production =
        productions[index];


    const oldTitle =
        production.title;


    const newTitle =
        prompt(
            "Update production title:",
            oldTitle
        );


    if (newTitle === null) {
        return;
    }


    const cleanTitle =
        newTitle.trim();


    if (cleanTitle === "") {

        productionMessage.textContent =
            "Production title is required.";

        productionMessage.style.color =
            "red";

        return;
    }


    const duplicate =
        productions.some(
            function (
                item,
                itemIndex
            ) {

                return (
                    itemIndex !== index &&
                    item.title.toLowerCase() ===
                    cleanTitle.toLowerCase()
                );

            }
        );


    if (duplicate) {

        productionMessage.textContent =
            "This production already exists.";

        productionMessage.style.color =
            "red";

        return;
    }


    production.title =
        cleanTitle;


    performances.forEach(
        function (performance) {

            if (
                performance.production ===
                oldTitle
            ) {

                const oldReference =
                    getPerformanceReference(
                        performance
                    );


                performance.production =
                    cleanTitle;


                const newReference =
                    getPerformanceReference(
                        performance
                    );


                requiredCrewRoles.forEach(
                    function (item) {

                        if (
                            item.performance ===
                            oldReference
                        ) {

                            item.performance =
                                newReference;

                        }

                    }
                );


                crewAssignments.forEach(
                    function (assignment) {

                        if (
                            assignment.performance ===
                            oldReference
                        ) {

                            assignment.performance =
                                newReference;

                            assignment.production =
                                cleanTitle;

                        }

                    }
                );

            }

        }
    );


    displayProductions();

    displayPerformances();

    updateProductionOptions();

    updatePerformanceSelectors();

    displayRequiredRoles();

    displayAssignments();

    displayProductionSchedule();


    productionMessage.textContent =
        "Production updated successfully.";

    productionMessage.style.color =
        "green";

}


// ========================================
// REMOVE PRODUCTION
// ========================================

function removeProduction(index) {

    const production =
        productions[index];


    const hasPerformances =
        performances.some(
            function (performance) {

                return (
                    performance.production ===
                    production.title
                );

            }
        );


    if (hasPerformances) {

        productionMessage.textContent =
            "This production cannot be removed while performances are linked to it.";

        productionMessage.style.color =
            "red";

        return;
    }


    const confirmed =
        confirm(
            "Remove production " +
            production.title +
            "?"
        );


    if (!confirmed) {
        return;
    }


    productions.splice(
        index,
        1
    );


    displayProductions();

    updateProductionOptions();

    displayProductionSchedule();


    productionMessage.textContent =
        "Production removed successfully.";

    productionMessage.style.color =
        "green";

}


// ========================================
// PERFORMANCE MANAGEMENT
// YM - PER4-4
// ========================================

const performanceForm =
    document.getElementById(
        "performanceForm"
    );

const performanceMessage =
    document.getElementById(
        "performanceMessage"
    );

const performanceBody =
    document.getElementById(
        "performanceBody"
    );


performanceForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const production =
            document.getElementById(
                "performanceProduction"
            ).value;


        const date =
            document.getElementById(
                "performanceDate"
            ).value;


        const time =
            document.getElementById(
                "performanceTime"
            ).value;


        if (
            production === "" ||
            date === "" ||
            time === ""
        ) {

            performanceMessage.textContent =
                "Production, performance date and start time are required.";

            performanceMessage.style.color =
                "red";

            return;
        }


        const duplicate =
            performances.some(
                function (performance) {

                    return (
                        performance.production ===
                        production &&

                        performance.date ===
                        date &&

                        performance.time ===
                        time
                    );

                }
            );


        if (duplicate) {

            performanceMessage.textContent =
                "This performance already exists.";

            performanceMessage.style.color =
                "red";

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

        displayProductionSchedule();


        performanceMessage.textContent =
            "Performance created successfully.";

        performanceMessage.style.color =
            "green";


        performanceForm.reset();

    }
);


// ========================================
// PERFORMANCE REFERENCE
// ========================================

function getPerformanceReference(
    performance
) {

    return (
        performance.production +
        " | " +
        performance.date +
        " | " +
        performance.time
    );

}


// ========================================
// SORT PERFORMANCES
// ========================================

function sortPerformances() {

    performances.sort(
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

}


// ========================================
// DISPLAY PERFORMANCES
// ========================================

function displayPerformances() {

    performanceBody.innerHTML = "";


    performances.forEach(
        function (
            performance,
            index
        ) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${performance.production}
                </td>

                <td>
                    ${performance.date}
                </td>

                <td>
                    ${performance.time}
                </td>

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


            performanceBody.appendChild(
                row
            );

        }
    );

}


// ========================================
// UPDATE PERFORMANCE SELECTORS
// ========================================

function updatePerformanceSelectors() {

    const selectors = [

        document.getElementById(
            "rolePerformance"
        ),

        document.getElementById(
            "performance"
        ),

        document.getElementById(
            "rosterPerformance"
        )

    ];


    selectors.forEach(
        function (selector) {

            if (!selector) {
                return;
            }


            selector.innerHTML =
                '<option value="">Select performance</option>';


            performances.forEach(
                function (performance) {

                    const reference =
                        getPerformanceReference(
                            performance
                        );


                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        reference;

                    option.textContent =
                        reference;


                    selector.appendChild(
                        option
                    );

                }
            );

        }
    );

}


// ========================================
// EDIT PERFORMANCE
// ========================================

function editPerformance(index) {

    const performance =
        performances[index];


    const oldReference =
        getPerformanceReference(
            performance
        );


    const newDate =
        prompt(
            "Update performance date (YYYY-MM-DD):",
            performance.date
        );


    if (newDate === null) {
        return;
    }


    const newTime =
        prompt(
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

        performanceMessage.style.color =
            "red";

        return;
    }


    const datePattern =
        /^\d{4}-\d{2}-\d{2}$/;


    const timePattern =
        /^([01]\d|2[0-3]):[0-5]\d$/;


    if (
        !datePattern.test(
            newDate.trim()
        ) ||

        !timePattern.test(
            newTime.trim()
        )
    ) {

        performanceMessage.textContent =
            "Please enter a valid date and start time.";

        performanceMessage.style.color =
            "red";

        return;
    }


    performance.date =
        newDate.trim();

    performance.time =
        newTime.trim();


    const newReference =
        getPerformanceReference(
            performance
        );


    requiredCrewRoles.forEach(
        function (item) {

            if (
                item.performance ===
                oldReference
            ) {

                item.performance =
                    newReference;

            }

        }
    );


    crewAssignments.forEach(
        function (assignment) {

            if (
                assignment.performance ===
                oldReference
            ) {

                assignment.performance =
                    newReference;

                assignment.production =
                    performance.production;

                assignment.performanceDate =
                    performance.date;

                assignment.startTime =
                    performance.time;

            }

        }
    );


    sortPerformances();

    displayPerformances();

    updatePerformanceSelectors();

    displayRequiredRoles();

    displayAssignments();

    displayProductionSchedule();


    if (
        currentUser &&
        currentUser.role === "User"
    ) {

        displayMyAssignments();

    }


    performanceMessage.textContent =
        "Performance updated successfully.";

    performanceMessage.style.color =
        "green";

}


// ========================================
// REMOVE PERFORMANCE
// ========================================

function removePerformance(index) {

    const performance =
        performances[index];


    const reference =
        getPerformanceReference(
            performance
        );


    const confirmed =
        confirm(
            "Remove this performance from " +
            performance.production +
            "?"
        );


    if (!confirmed) {
        return;
    }


    performances.splice(
        index,
        1
    );


    requiredCrewRoles =
        requiredCrewRoles.filter(
            function (item) {

                return (
                    item.performance !==
                    reference
                );

            }
        );


    crewAssignments =
        crewAssignments.filter(
            function (assignment) {

                return (
                    assignment.performance !==
                    reference
                );

            }
        );


    displayPerformances();

    updatePerformanceSelectors();

    displayRequiredRoles();

    displayAssignments();

    displayProductionSchedule();


    performanceMessage.textContent =
        "Performance removed successfully.";

    performanceMessage.style.color =
        "green";

}


// ========================================
// VOLUNTEER MANAGEMENT
//
// HS - PER4-1
// BN - PER4-2
// HS - PER4-17
// YM - PER4-15
// YM - PER4-18
// ========================================

const volunteerForm =
    document.getElementById(
        "volunteerForm"
    );

const volunteerBody =
    document.getElementById(
        "volunteerBody"
    );

const volunteerMessage =
    document.getElementById(
        "message"
    );


// ========================================
// UPDATE VOLUNTEER ASSIGNMENT DROPDOWN
// IMPORTANT FIX
// ========================================

function updateVolunteerOptions() {

    const volunteerSelect =
        document.getElementById(
            "volunteer"
        );


    if (!volunteerSelect) {
        return;
    }


    volunteerSelect.innerHTML =
        '<option value="">Select volunteer</option>';


    const volunteerRows =
        volunteerBody.querySelectorAll(
            "tr"
        );


    volunteerRows.forEach(
        function (row) {

            const nameCell =
                row.querySelector(
                    ".volunteer-name"
                );


            const statusCell =
                row.querySelector(
                    ".volunteer-status"
                );


            if (
                !nameCell ||
                !statusCell
            ) {

                return;
            }


            const volunteerName =
                nameCell.textContent.trim();


            const volunteerStatus =
                statusCell.textContent.trim();


            if (
                volunteerStatus ===
                "Active"
            ) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    volunteerName;

                option.textContent =
                    volunteerName;


                volunteerSelect.appendChild(
                    option
                );

            }

        }
    );

}


// ========================================
// ADD VOLUNTEER
// HS - PER4-1
// ========================================

volunteerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "fullName"
            ).value.trim();


        const phone =
            document.getElementById(
                "phone"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


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


        const existingVolunteer =
            Array.from(
                volunteerBody.querySelectorAll(
                    ".volunteer-name"
                )
            ).some(
                function (cell) {

                    return (
                        cell.textContent
                            .trim()
                            .toLowerCase() ===
                        name.toLowerCase()
                    );

                }
            );


        if (existingVolunteer) {

            volunteerMessage.textContent =
                "A volunteer with this name already exists.";

            volunteerMessage.style.color =
                "red";

            return;
        }


        const row =
            document.createElement(
                "tr"
            );


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


        volunteerBody.appendChild(
            row
        );


        // IMPORTANT:
        // Newly created volunteer is immediately
        // available for crew assignment.

        updateVolunteerOptions();


        volunteerMessage.textContent =
            "Volunteer saved successfully.";

        volunteerMessage.style.color =
            "green";


        volunteerForm.reset();

    }
);


// ========================================
// EDIT VOLUNTEER
// BN - PER4-2
// ========================================

function editVolunteer(button) {

    const row =
        button.closest("tr");


    const nameCell =
        row.querySelector(
            ".volunteer-name"
        );


    const phoneCell =
        row.querySelector(
            ".volunteer-phone"
        );


    const emailCell =
        row.querySelector(
            ".volunteer-email"
        );


    const oldName =
        nameCell.textContent.trim();


    const updatedName =
        prompt(
            "Update volunteer name:",
            oldName
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

        volunteerMessage.textContent =
            "Volunteer name, phone and email are required.";

        volunteerMessage.style.color =
            "red";

        return;
    }


    if (
        !updatedEmail.includes("@") ||
        !updatedEmail.includes(".")
    ) {

        volunteerMessage.textContent =
            "Please enter a valid email address.";

        volunteerMessage.style.color =
            "red";

        return;
    }


    const newName =
        updatedName.trim();


    nameCell.textContent =
        newName;


    phoneCell.textContent =
        updatedPhone.trim();


    emailCell.textContent =
        updatedEmail.trim();


    // Keep the login account connected
    // if the volunteer's name changes.

    registeredUsers.forEach(
        function (user) {

            if (
                user.volunteerName &&
                user.volunteerName
                    .toLowerCase() ===
                oldName.toLowerCase()
            ) {

                user.volunteerName =
                    newName;

                user.volunteerEmail =
                    updatedEmail.trim();

            }

        }
    );


    // Keep historical/current assignments
    // linked to the volunteer.

    crewAssignments.forEach(
        function (assignment) {

            if (
                assignment.volunteer &&
                assignment.volunteer
                    .toLowerCase() ===
                oldName.toLowerCase()
            ) {

                assignment.volunteer =
                    newName;

            }

        }
    );


    displayAssignments();

    updateVolunteerOptions();


    volunteerMessage.textContent =
        "Volunteer record updated successfully.";

    volunteerMessage.style.color =
        "green";

}


// ========================================
// DEACTIVATE VOLUNTEER RECORD
// BN - PER4-2
// ========================================

function deactivateVolunteer(button) {

    const row =
        button.closest("tr");


    const nameCell =
        row.querySelector(
            ".volunteer-name"
        );


    const statusCell =
        row.querySelector(
            ".volunteer-status"
        );


    const volunteerName =
        nameCell.textContent.trim();


    if (
        statusCell.textContent.trim() ===
        "Inactive"
    ) {

        volunteerMessage.textContent =
            "This volunteer is already inactive.";

        volunteerMessage.style.color =
            "red";

        return;
    }


    const confirmed =
        confirm(
            "Deactivate volunteer " +
            volunteerName +
            "?"
        );


    if (!confirmed) {
        return;
    }


    statusCell.textContent =
        "Inactive";


    // Existing assignments are NOT deleted.

    updateVolunteerOptions();


    volunteerMessage.textContent =
        "Volunteer deactivated successfully. Existing crew assignment history has been retained.";

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


    const name =
        row.querySelector(
            ".volunteer-name"
        ).textContent.trim();


    const email =
        row.querySelector(
            ".volunteer-email"
        ).textContent.trim();


    const status =
        row.querySelector(
            ".volunteer-status"
        ).textContent.trim();


    const accessCell =
        row.querySelector(
            ".volunteer-access"
        );


    if (status !== "Active") {

        volunteerMessage.textContent =
            "System access cannot be granted to an inactive volunteer.";

        volunteerMessage.style.color =
            "red";

        return;
    }


    const linkedAccount =
        registeredUsers.find(
            function (user) {

                return (
                    user.volunteerName &&
                    user.volunteerName
                        .toLowerCase() ===
                    name.toLowerCase()
                );

            }
        );


    // Existing linked account.

    if (linkedAccount) {

        if (linkedAccount.active) {

            volunteerMessage.textContent =
                name +
                " already has active system access.";

            volunteerMessage.style.color =
                "red";

            accessCell.textContent =
                "Active";

            return;
        }


        linkedAccount.active =
            true;

        linkedAccount.volunteerEmail =
            email;


        accessCell.textContent =
            "Active";


        volunteerMessage.textContent =
            "System access reactivated for " +
            name +
            ". Username: " +
            linkedAccount.username +
            " | Password: " +
            linkedAccount.password;

        volunteerMessage.style.color =
            "green";

        return;

    }


    // Generate username from volunteer name.

    let baseUsername =
        name
            .toLowerCase()
            .replace(
                /[^a-z0-9]/g,
                ""
            );


    if (baseUsername === "") {

        baseUsername =
            "volunteer";

    }


    let username =
        baseUsername;


    let counter =
        2;


    while (
        registeredUsers.some(
            function (user) {

                return (
                    user.username ===
                    username
                );

            }
        )
    ) {

        username =
            baseUsername +
            counter;

        counter++;

    }


    const newUser = {

        username: username,

        password: "welcome123",

        role: "User",

        active: true,

        volunteerName: name,

        volunteerEmail: email

    };


    registeredUsers.push(
        newUser
    );


    accessCell.textContent =
        "Active";


    volunteerMessage.textContent =
        "System access granted to " +
        name +
        ". Username: " +
        username +
        " | Password: welcome123";


    volunteerMessage.style.color =
        "green";

}


// ========================================
// DEACTIVATE VOLUNTEER SYSTEM ACCESS
// YM - PER4-18
// ========================================

function deactivateVolunteerAccess(
    button
) {

    const row =
        button.closest("tr");


    const volunteerName =
        row.querySelector(
            ".volunteer-name"
        ).textContent.trim();


    const accessCell =
        row.querySelector(
            ".volunteer-access"
        );


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


    if (!linkedUser) {

        volunteerMessage.textContent =
            "This volunteer does not have system access.";

        volunteerMessage.style.color =
            "red";

        return;
    }


    if (!linkedUser.active) {

        volunteerMessage.textContent =
            "This volunteer's system access is already inactive.";

        volunteerMessage.style.color =
            "red";

        accessCell.textContent =
            "Inactive";

        return;
    }


    const confirmed =
        confirm(
            "Deactivate system access for " +
            volunteerName +
            "?"
        );


    if (!confirmed) {
        return;
    }


    linkedUser.active =
        false;


    accessCell.textContent =
        "Inactive";


    // Volunteer details and crew assignments
    // are intentionally NOT deleted.

    volunteerMessage.textContent =
        "System access deactivated for " +
        volunteerName +
        ". Volunteer details and existing crew assignments have been retained.";


    volunteerMessage.style.color =
        "green";

}


// ========================================
// SEARCH VOLUNTEER
// YM - PER4-15
// ========================================

const volunteerSearch =
    document.getElementById(
        "volunteerSearch"
    );

const searchVolunteerButton =
    document.getElementById(
        "searchVolunteerButton"
    );

const clearVolunteerSearchButton =
    document.getElementById(
        "clearVolunteerSearchButton"
    );

const volunteerSearchMessage =
    document.getElementById(
        "volunteerSearchMessage"
    );


searchVolunteerButton.addEventListener(
    "click",
    searchVolunteerRecords
);


volunteerSearch.addEventListener(
    "keyup",
    function (event) {

        if (
            event.key ===
            "Enter"
        ) {

            searchVolunteerRecords();

        }

    }
);


function searchVolunteerRecords() {

    const searchValue =
        volunteerSearch.value
            .trim()
            .toLowerCase();


    const rows =
        volunteerBody.querySelectorAll(
            "tr"
        );


    if (searchValue === "") {

        volunteerSearchMessage.textContent =
            "Please enter a volunteer name.";

        volunteerSearchMessage.style.color =
            "red";

        return;
    }


    let matchFound =
        false;


    rows.forEach(
        function (row) {

            const nameCell =
                row.querySelector(
                    ".volunteer-name"
                );


            if (!nameCell) {
                return;
            }


            const name =
                nameCell.textContent
                    .trim()
                    .toLowerCase();


            if (
                name.includes(
                    searchValue
                )
            ) {

                row.style.display =
                    "";

                matchFound =
                    true;

            }

            else {

                row.style.display =
                    "none";

            }

        }
    );


    if (matchFound) {

        volunteerSearchMessage.textContent =
            "Matching volunteer records found.";

        volunteerSearchMessage.style.color =
            "green";

    }

    else {

        volunteerSearchMessage.textContent =
            "No volunteer information found.";

        volunteerSearchMessage.style.color =
            "red";

    }

}


// ========================================
// CLEAR VOLUNTEER SEARCH
// ========================================

clearVolunteerSearchButton.addEventListener(
    "click",
    function () {

        volunteerSearch.value =
            "";


        volunteerSearchMessage.textContent =
            "";


        const rows =
            volunteerBody.querySelectorAll(
                "tr"
            );


        rows.forEach(
            function (row) {

                row.style.display =
                    "";

            }
        );


        document.getElementById(
            "volunteerDetails"
        ).style.display =
            "none";

    }
);


// ========================================
// VIEW VOLUNTEER DETAILS
// YM - PER4-15
// ========================================

function viewVolunteerDetails(
    button
) {

    const row =
        button.closest("tr");


    document.getElementById(
        "detailVolunteerName"
    ).textContent =
        row.querySelector(
            ".volunteer-name"
        ).textContent.trim();


    document.getElementById(
        "detailVolunteerPhone"
    ).textContent =
        row.querySelector(
            ".volunteer-phone"
        ).textContent.trim();


    document.getElementById(
        "detailVolunteerEmail"
    ).textContent =
        row.querySelector(
            ".volunteer-email"
        ).textContent.trim();


    document.getElementById(
        "detailVolunteerStatus"
    ).textContent =
        row.querySelector(
            ".volunteer-status"
        ).textContent.trim();


    document.getElementById(
        "detailVolunteerAccess"
    ).textContent =
        row.querySelector(
            ".volunteer-access"
        ).textContent.trim();


    document.getElementById(
        "volunteerDetails"
    ).style.display =
        "block";

}


// ========================================
// CLOSE VOLUNTEER DETAILS
// ========================================

document.getElementById(
    "closeVolunteerDetailsButton"
).addEventListener(
    "click",
    function () {

        document.getElementById(
            "volunteerDetails"
        ).style.display =
            "none";

    }
);


// ========================================
// REQUIRED CREW ROLES
// HS + BN - PER4-5
// ========================================

const crewRoleForm =
    document.getElementById(
        "crewRoleForm"
    );

const roleMessage =
    document.getElementById(
        "roleMessage"
    );

const crewRoleBody =
    document.getElementById(
        "crewRoleBody"
    );


crewRoleForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const performance =
            document.getElementById(
                "rolePerformance"
            ).value;


        const role =
            document.getElementById(
                "roleName"
            ).value.trim();


        if (
            performance === "" ||
            role === ""
        ) {

            roleMessage.textContent =
                "Performance and crew role are required.";

            roleMessage.style.color =
                "red";

            return;
        }


        const duplicate =
            requiredCrewRoles.some(
                function (item) {

                    return (
                        item.performance ===
                        performance &&

                        item.role.toLowerCase() ===
                        role.toLowerCase()
                    );

                }
            );


        if (duplicate) {

            roleMessage.textContent =
                "This crew role already exists for the selected performance.";

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
// DISPLAY REQUIRED CREW ROLES
// ========================================

function displayRequiredRoles() {

    crewRoleBody.innerHTML = "";


    requiredCrewRoles.forEach(
        function (
            item,
            index
        ) {

            const assignment =
                crewAssignments.find(
                    function (crewAssignment) {

                        return (
                            crewAssignment.performance ===
                            item.performance &&

                            crewAssignment.role ===
                            item.role
                        );

                    }
                );


            const roleStatus =
                assignment
                    ? "Filled"
                    : "Unfilled";


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${item.performance}
                </td>

                <td>
                    ${item.role}
                </td>

                <td>
                    ${roleStatus}
                </td>

                <td>

                    <button
                        type="button"
                        onclick="editRequiredRole(${index})"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onclick="removeRequiredRole(${index})"
                    >
                        Remove
                    </button>

                </td>

            `;


            crewRoleBody.appendChild(
                row
            );

        }
    );

}


// ========================================
// EDIT REQUIRED ROLE
// ========================================

function editRequiredRole(index) {

    const item =
        requiredCrewRoles[index];


    const oldRole =
        item.role;


    const newRole =
        prompt(
            "Update crew role:",
            oldRole
        );


    if (newRole === null) {
        return;
    }


    if (
        newRole.trim() === ""
    ) {

        roleMessage.textContent =
            "Crew role is required.";

        roleMessage.style.color =
            "red";

        return;
    }


    item.role =
        newRole.trim();


    crewAssignments.forEach(
        function (assignment) {

            if (
                assignment.performance ===
                item.performance &&

                assignment.role ===
                oldRole
            ) {

                assignment.role =
                    newRole.trim();

            }

        }
    );


    displayRequiredRoles();

    displayAssignments();


    roleMessage.textContent =
        "Crew role updated successfully.";

    roleMessage.style.color =
        "green";

}


// ========================================
// REMOVE REQUIRED ROLE
// ========================================

function removeRequiredRole(index) {

    const item =
        requiredCrewRoles[index];


    const assigned =
        crewAssignments.some(
            function (assignment) {

                return (
                    assignment.performance ===
                    item.performance &&

                    assignment.role ===
                    item.role
                );

            }
        );


    if (assigned) {

        roleMessage.textContent =
            "This crew role cannot be removed while a volunteer is assigned to it.";

        roleMessage.style.color =
            "red";

        return;
    }


    const confirmed =
        confirm(
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
// ASSIGN VOLUNTEER
//
// HS - PER4-6
// YM - PER4-7
// YM - PER4-10
// ========================================

const assignmentForm =
    document.getElementById(
        "assignmentForm"
    );

const assignmentMessage =
    document.getElementById(
        "assignmentMessage"
    );

const assignmentBody =
    document.getElementById(
        "assignmentBody"
    );


assignmentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const performanceReference =
            document.getElementById(
                "performance"
            ).value;


        const role =
            document.getElementById(
                "assignmentRole"
            ).value;


        const volunteer =
            document.getElementById(
                "volunteer"
            ).value;


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


        // PER4-7
        // Prevent the same volunteer from receiving
        // more than one crew role for the same performance.

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


        // Prevent two volunteers filling the exact
        // same required role.

        const roleAlreadyFilled =
            crewAssignments.some(
                function (assignment) {

                    return (
                        assignment.performance ===
                        performanceReference &&

                        assignment.role ===
                        role
                    );

                }
            );


        if (roleAlreadyFilled) {

            assignmentMessage.textContent =
                role +
                " is already filled for this performance.";

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

        displayRequiredRoles();


        assignmentMessage.textContent =
            "Volunteer assigned successfully.";

        assignmentMessage.style.color =
            "green";


        assignmentForm.reset();

    }
);


// ========================================
// DISPLAY ASSIGNMENTS
// ========================================

function displayAssignments() {

    assignmentBody.innerHTML = "";


    crewAssignments.forEach(
        function (
            assignment,
            index
        ) {

            const row =
                document.createElement(
                    "tr"
                );


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
    ${
        assignment.status === "Confirmed"
            ? "Mark Unconfirmed"
            : "Confirm"
    }
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


            assignmentBody.appendChild(
                row
            );

        }
    );

}


// ========================================
// CHANGE ASSIGNMENT STATUS
// HS - PER4-13
// Admin / Coordinator
// ========================================

function confirmAssignment(index) {

    const assignment =
        crewAssignments[index];


    if (!assignment) {
        return;
    }


    if (
        assignment.status ===
        "Unconfirmed"
    ) {

        assignment.status =
            "Confirmed";

        assignmentMessage.textContent =
            "Crew assignment confirmed successfully.";

    }

    else {

        assignment.status =
            "Unconfirmed";

        assignmentMessage.textContent =
            "Crew assignment changed to unconfirmed.";

    }


    assignmentMessage.style.color =
        "green";


    displayAssignments();

    displayRequiredRoles();


    if (
        currentUser &&
        currentUser.role === "User"
    ) {

        displayMyAssignments();

    }

}


// ========================================
// CHANGE ASSIGNMENT
// HS - PER4-8
// ========================================

function changeAssignment(index) {

    const currentAssignment =
        crewAssignments[index];


    const newRole =
        prompt(
            "Enter new crew role:",
            currentAssignment.role
        );


    if (newRole === null) {
        return;
    }


    const newVolunteer =
        prompt(
            "Enter volunteer name:",
            currentAssignment.volunteer
        );


    if (newVolunteer === null) {
        return;
    }


    const cleanRole =
        newRole.trim();


    const cleanVolunteer =
        newVolunteer.trim();


    if (
        cleanRole === "" ||
        cleanVolunteer === ""
    ) {

        assignmentMessage.textContent =
            "Crew role and volunteer are required.";

        assignmentMessage.style.color =
            "red";

        return;
    }


    const volunteerExists =
        Array.from(
            volunteerBody.querySelectorAll(
                "tr"
            )
        ).some(
            function (row) {

                const nameCell =
                    row.querySelector(
                        ".volunteer-name"
                    );

                const statusCell =
                    row.querySelector(
                        ".volunteer-status"
                    );


                return (
                    nameCell &&
                    statusCell &&

                    nameCell.textContent
                        .trim()
                        .toLowerCase() ===
                    cleanVolunteer
                        .toLowerCase() &&

                    statusCell.textContent
                        .trim() ===
                    "Active"
                );

            }
        );


    if (!volunteerExists) {

        assignmentMessage.textContent =
            "The selected volunteer does not exist or is inactive.";

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
                    cleanVolunteer
                        .toLowerCase()
                );

            }
        );


    if (duplicateAssignment) {

        assignmentMessage.textContent =
            cleanVolunteer +
            " already has a crew role in this performance.";

        assignmentMessage.style.color =
            "red";

        return;
    }


    const roleAlreadyFilled =
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

                    assignment.role
                        .toLowerCase() ===
                    cleanRole
                        .toLowerCase()
                );

            }
        );


    if (roleAlreadyFilled) {

        assignmentMessage.textContent =
            cleanRole +
            " is already filled for this performance.";

        assignmentMessage.style.color =
            "red";

        return;
    }


    currentAssignment.role =
        cleanRole;


    currentAssignment.volunteer =
        cleanVolunteer;


    displayAssignments();

    displayRequiredRoles();


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


    if (!assignment) {
        return;
    }


    const confirmed =
        confirm(

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


    crewAssignments.splice(
        index,
        1
    );


    displayAssignments();

    displayRequiredRoles();


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


    myAssignmentBody.innerHTML =
        "";


    if (!currentUser) {
        return;
    }


    if (
        currentUser.role !==
        "User"
    ) {

        return;
    }


    if (
        !currentUser.volunteerName
    ) {

        volunteerAccessMessage.textContent =
            "This user account is not linked to a volunteer record.";

        return;
    }


    const loggedInVolunteerName =
        currentUser.volunteerName
            .trim()
            .toLowerCase();


    const userAssignments =
        crewAssignments
            .map(
                function (
                    assignment,
                    index
                ) {

                    return {
                        assignment:
                            assignment,

                        originalIndex:
                            index
                    };

                }
            )
            .filter(
                function (item) {

                    if (
                        !item.assignment.volunteer
                    ) {

                        return false;
                    }


                    return (
                        item.assignment.volunteer
                            .trim()
                            .toLowerCase() ===
                        loggedInVolunteerName
                    );

                }
            );


    if (
        userAssignments.length ===
        0
    ) {

        volunteerAccessMessage.textContent =
            "No crew assignments are currently available for this volunteer.";

        return;
    }


    userAssignments.sort(
        function (a, b) {

            const first =
                new Date(
                    a.assignment.performanceDate +
                    "T" +
                    a.assignment.startTime
                );


            const second =
                new Date(
                    b.assignment.performanceDate +
                    "T" +
                    b.assignment.startTime
                );


            return first - second;

        }
    );


    volunteerAccessMessage.textContent =
        "Your current crew assignments:";


    userAssignments.forEach(
        function (item) {

            const assignment =
                item.assignment;


            const assignmentIndex =
                item.originalIndex;


            const row =
                document.createElement(
                    "tr"
                );


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

                <td>

                    <button
                        type="button"
                        onclick="changeMyAssignmentStatus(${assignmentIndex})"
                    >
                        ${
                            assignment.status === "Confirmed"
                                ? "Mark Unconfirmed"
                                : "Confirm"
                        }
                    </button>

                </td>

            `;


            myAssignmentBody.appendChild(
                row
            );

        }
    );

}

// ========================================
// VOLUNTEER CHANGE OWN ASSIGNMENT STATUS
// ========================================

function changeMyAssignmentStatus(index) {

    if (
        !currentUser ||
        currentUser.role !== "User" ||
        !currentUser.volunteerName
    ) {

        return;
    }


    const assignment =
        crewAssignments[index];


    if (!assignment) {
        return;
    }


    if (
        assignment.volunteer
            .trim()
            .toLowerCase() !==
        currentUser.volunteerName
            .trim()
            .toLowerCase()
    ) {

        return;
    }


    if (
        assignment.status ===
        "Unconfirmed"
    ) {

        assignment.status =
            "Confirmed";

    }

    else {

        assignment.status =
            "Unconfirmed";

    }


    displayMyAssignments();

    displayAssignments();

    displayRequiredRoles();

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


        rosterBody.innerHTML =
            "";


        if (
            selectedPerformance ===
            ""
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
                    document.createElement(
                        "tr"
                    );


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


                rosterBody.appendChild(
                    row
                );

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


// ========================================
// DISPLAY PRODUCTION SCHEDULE
// ========================================

function displayProductionSchedule() {

    productionSchedule.innerHTML =
        "";


    if (
        productions.length ===
        0
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
                document.createElement(
                    "div"
                );


            const heading =
                document.createElement(
                    "h3"
                );


            heading.textContent =
                production.title;


            productionContainer.appendChild(
                heading
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

                const emptyMessage =
                    document.createElement(
                        "p"
                    );


                emptyMessage.textContent =
                    "No performances scheduled for this production.";


                productionContainer.appendChild(
                    emptyMessage
                );

            }

            else {

                const table =
                    document.createElement(
                        "table"
                    );


                table.innerHTML = `

                    <thead>

                        <tr>

                            <th>
                                Performance Date
                            </th>

                            <th>
                                Start Time
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                    </tbody>

                `;


                const body =
                    table.querySelector(
                        "tbody"
                    );


                productionPerformances.forEach(
                    function (performance) {

                        const row =
                            document.createElement(
                                "tr"
                            );


                        row.innerHTML = `

                            <td>
                                ${performance.date}
                            </td>

                            <td>
                                ${performance.time}
                            </td>

                        `;


                        body.appendChild(
                            row
                        );

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


// ========================================
// INITIAL DISPLAY SETUP
// ========================================

updateProductionOptions();

updatePerformanceSelectors();

updateVolunteerOptions();

displayProductions();

displayPerformances();

displayRequiredRoles();

displayAssignments();

displayProductionSchedule();