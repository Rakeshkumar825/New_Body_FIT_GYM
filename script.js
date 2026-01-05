// ================= TOTAL CALCULATION =================
function calculateTotal() {
    let service = document.getElementById("service");
    let plan = document.getElementById("plan");

    let servicePrice = service.value ? parseInt(service.value) : 0;
    let planPrice = plan.value ? parseInt(plan.value) : 0;

    let total = servicePrice + planPrice;

    document.getElementById("total").innerText = total;

    if (service.value && plan.value) {
        document.getElementById("summary").style.display = "block";
        document.getElementById("summaryService").innerText =
            service.options[service.selectedIndex].text;
        document.getElementById("summaryPlan").innerText =
            plan.options[plan.selectedIndex].text;
        document.getElementById("summaryTotal").innerText = total;
    }
}


// ================= FORM SUBMIT + BACKEND =================
document.getElementById("joinForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // INPUT VALUES
    let name = document.getElementById("name").value.trim();
    let age = parseInt(document.getElementById("age").value);
    let gender = document.getElementById("gender").value;
    let phone = document.getElementById("phone").value.trim();

    let serviceSelect = document.getElementById("service");
    let planSelect = document.getElementById("plan");

    let serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
    let planText = planSelect.options[planSelect.selectedIndex].text;

    let total = parseInt(document.getElementById("total").innerText);


    // ================= VALIDATION =================
    if (age < 14 || age > 65) {
        Swal.fire({
            icon: "warning",
            title: "Invalid Age",
            text: "Age must be between 14 and 65 years",
            confirmButtonColor: "#d32f2f"
        });
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Mobile Number",
            text: "Please enter a valid 10-digit mobile number",
            confirmButtonColor: "#d32f2f"
        });
        return;
    }

    if (!serviceSelect.value || !planSelect.value) {
        Swal.fire({
            icon: "info",
            title: "Selection Required",
            text: "Please select service and membership plan",
            confirmButtonColor: "#d32f2f"
        });
        return;
    }


    // ================= BACKEND CALL (LIVE) =================
    fetch("https://new-body-fit-gym-backend.onrender.com/join", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
            plan: serviceText + " | " + planText,
            amount: total
        })
    })
    .then(res => res.json())
    .then(data => {
        Swal.fire({
            icon: "success",
            title: "Joined Successfully!",
            text: "Welcome to New Body Fit Gym 💪",
            confirmButtonColor: "#d32f2f"
        });

        // RESET FORM
        document.getElementById("joinForm").reset();
        document.getElementById("summary").style.display = "none";
        document.getElementById("total").innerText = "0";
    })
    .catch(err => {
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Please try again later",
            confirmButtonColor: "#d32f2f"
        });
    });
});
