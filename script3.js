// ---------------- GLOBAL VARIABLES ----------------
window.isAdmin = true; // set true for testing
window.currentUser = "Admin"; // set current user

// ---------------- LOAD STUDENTS ----------------
async function loadStudents() {
    const tableBody = document.getElementById("studentTable");
    tableBody.innerHTML = "<tr><td colspan='5' class='text-center py-4'>Loading...</td></tr>";

    try {
        const res = await fetch("http://localhost:5000/users"); // your API endpoint
        const users = await res.json();
        tableBody.innerHTML = "";

        if (users.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='5' class='text-center py-4'>No students found.</td></tr>";
            return;
        }

        users.forEach((user) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="px-4 py-2">
                    <input type="text" value="${user.name}" class="border px-2 py-1 w-full" id="name-${user._id}" disabled>
                </td>
                <td class="px-4 py-2">
                    <input type="email" value="${user.email}" class="border px-2 py-1 w-full" id="email-${user._id}" disabled>
                </td>
                <td class="px-4 py-2">${user.course || '-'}</td>
                <td class="px-4 py-2">${user.progress || '-'}</td>
                <td class="px-4 py-2">
                    <button class="text-blue-600 hover:underline mr-2" id="edit-${user._id}">Edit</button>
                    <button class="text-green-600 hover:underline mr-2 hidden" id="save-${user._id}">Save</button>
                    <button class="text-red-600 hover:underline" id="delete-${user._id}">Remove</button>
                </td>
            `;

            tableBody.appendChild(row);

            // Edit button
            document.getElementById(`edit-${user._id}`).addEventListener("click", () => {
                document.getElementById(`name-${user._id}`).disabled = false;
                document.getElementById(`email-${user._id}`).disabled = false;
                document.getElementById(`edit-${user._id}`).classList.add("hidden");
                document.getElementById(`save-${user._id}`).classList.remove("hidden");
            });

            // Save button
            document.getElementById(`save-${user._id}`).addEventListener("click", async () => {
                const newName = document.getElementById(`name-${user._id}`).value;
                const newEmail = document.getElementById(`email-${user._id}`).value;

                try {
                    const res = await fetch(`http://localhost:5000/users/${user._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: newName, email: newEmail }),
                    });

                    if (!res.ok) throw new Error("Update failed");

                    document.getElementById(`name-${user._id}`).disabled = true;
                    document.getElementById(`email-${user._id}`).disabled = true;
                    document.getElementById(`edit-${user._id}`).classList.remove("hidden");
                    document.getElementById(`save-${user._id}`).classList.add("hidden");

                    alert("User updated successfully!");
                } catch (err) {
                    alert("Error updating user");
                    console.error(err);
                }
            });

            // Delete button
            document.getElementById(`delete-${user._id}`).addEventListener("click", async () => {
                if (!confirm("Are you sure you want to delete this user?")) return;
                try {
                    const res = await fetch(`http://localhost:5000/users/${user._id}`, { method: "DELETE" });
                    if (!res.ok) throw new Error("Delete failed");
                    row.remove();
                    alert("User deleted successfully!");
                } catch (err) {
                    alert("Error deleting user");
                    console.error(err);
                }
            });
        });
    } catch (err) {
        console.error(err);
        tableBody.innerHTML = "<tr><td colspan='5' class='text-center py-4'>Error loading students</td></tr>";
    }
}

// Load students when page loads
window.addEventListener("DOMContentLoaded", loadStudents);
