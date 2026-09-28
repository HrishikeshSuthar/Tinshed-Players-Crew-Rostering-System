// --------------------------------
// Add Volunteer
// --------------------------------

const volunteerForm = document.getElementById("volunteerForm");
const message = document.getElementById("message");
const savedVolunteer = document.getElementById("savedVolunteer");

volunteerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (fullName === "" || phone === "" || email === "") {
    message.textContent = "Please complete all required fields.";
    message.style.color = "red";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    message.textContent = "Please enter a valid email address.";
    message.style.color = "red";
    return;
  }

  message.textContent = "Volunteer saved successfully.";
  message.style.color = "green";

  savedVolunteer.innerHTML = `
        <h3>Volunteer Record</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Status:</strong> Active</p>
    `;
});

// --------------------------------
// Crew Role Management
// --------------------------------

const crewRoleForm = document.getElementById("crewRoleForm");
const roleName = document.getElementById("roleName");
const roleMessage = document.getElementById("roleMessage");
const crewRoleList = document.getElementById("crewRoleList");

crewRoleForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newRole = roleName.value.trim();

  // Check if role name is empty
  if (newRole === "") {
    roleMessage.textContent = "Please enter a crew role.";
    roleMessage.style.color = "red";
    return;
  }

  // Add new role to list
  const listItem = document.createElement("li");
  listItem.textContent = newRole;

  crewRoleList.appendChild(listItem);

  roleMessage.textContent = "Crew role added successfully.";
  roleMessage.style.color = "green";

  roleName.value = "";
});


// --------------------------------
// Assign Volunteer to Crew Role
// --------------------------------

const assignmentForm = document.getElementById("assignmentForm");
const assignmentMessage = document.getElementById("assignmentMessage");
const rosterBody = document.getElementById("rosterBody");

assignmentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const performance = document.getElementById("performance").value;
    const crewRole = document.getElementById("assignmentRole").value;
    const volunteer = document.getElementById("volunteer").value;

    // Validate selections
    if (performance === "" || crewRole === "" || volunteer === "") {
        assignmentMessage.textContent =
            "Please select a performance, crew role and volunteer.";
        assignmentMessage.style.color = "red";
        return;
    }

    // Every new assignment starts as unconfirmed
    const status = "Unconfirmed";

    // Add assignment to performance roster
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${performance}</td>
        <td>${crewRole}</td>
        <td>${volunteer}</td>
        <td>${status}</td>
    `;

    rosterBody.appendChild(row);

    assignmentMessage.textContent =
        "Volunteer assigned successfully.";
    assignmentMessage.style.color = "green";

    assignmentForm.reset();
});