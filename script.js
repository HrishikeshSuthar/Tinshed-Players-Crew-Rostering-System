const volunteerForm = document.getElementById("volunteerForm");
const message = document.getElementById("message");
const savedVolunteer = document.getElementById("savedVolunteer");

volunteerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  // Check required fields
  if (fullName === "" || phone === "" || email === "") {
    message.textContent = "Please complete all required fields.";
    message.style.color = "red";
    return;
  }

  // Basic email validation
  if (!email.includes("@") || !email.includes(".")) {
    message.textContent = "Please enter a valid email address.";
    message.style.color = "red";
    return;
  }

  // Volunteer has passed validation
  message.textContent = "Volunteer saved successfully.";
  message.style.color = "green";

  // Display the saved volunteer
  savedVolunteer.innerHTML = `
        <h3>Volunteer Record</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Status:</strong> Active</p>
    `;
});
