// ===============================
// LOAD MEMBERS (LIVE BACKEND)
// ===============================
fetch("https://new-body-fit-gym-backend.onrender.com/members")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("userTable");
    table.innerHTML = ""; // clear old rows

    data.forEach(user => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.phone}</td>
        <td>${user.plan}</td>
        <td>₹${user.amount}</td>
        <td>
          <button 
            onclick="deleteUser('${user._id}')"
            style="background:red;color:white;border:none;padding:6px 10px;cursor:pointer;">
            Delete
          </button>
        </td>
      `;

      table.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error loading members:", err);
    alert("Failed to load members");
  });


// ===============================
// DELETE MEMBER (LIVE BACKEND)
// ===============================
function deleteUser(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Member will be deleted permanently",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d32f2f",
    cancelButtonColor: "#555",
    confirmButtonText: "Yes, delete"
  }).then(result => {
    if (result.isConfirmed) {
      fetch(`https://new-body-fit-gym-backend.onrender.com/delete/${id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        Swal.fire("Deleted!", "Member deleted successfully", "success");
        location.reload(); // refresh table
      })
      .catch(err => {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete member", "error");
      });
    }
  });
}
