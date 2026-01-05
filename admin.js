// LOAD MEMBERS
fetch("http://localhost:5000/members")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("userTable");

    data.forEach(user => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.phone}</td>
        <td>${user.plan}</td>
        <td>₹${user.amount}</td>
        <td>
          <button onclick="deleteUser('${user._id}')"
            style="background:red;color:white;border:none;padding:5px;">
            Delete
          </button>
        </td>
      `;

      table.appendChild(row);
    });
  });

// DELETE MEMBER
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
      fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(() => {
        Swal.fire("Deleted!", "Member deleted", "success");
        location.reload();
      });
    }
  });
}
