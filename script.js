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
