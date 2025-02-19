document.addEventListener("DOMContentLoaded", function () {
    function showSection(section) {
        if (section === "newEntry") {
            document.getElementById("content").innerHTML = ""; // Clear content area
            document.getElementById("farmerForm").style.display = "block";
        } else if (section === "home") {
            document.getElementById("content").innerHTML = `
                <h1>Welcome to the Dashboard</h1>
                <div class="image-container">
                    <img src="image 1.jpg" alt="Image 1" class="home-image">
                    <img src="images 2.jpg" alt="Image 2" class="home-image">
                    <img src="images 3.jpg" alt="Image 3" class="home-image">
                    <img src="images 4.jpg" alt="Image 4" class="home-image">
                    <img src="images 5.jpg" alt="Image 5" class="home-image">
                    <img src="image 6.jpg" alt="Image 6" class="home-image">
                </div>
            `;
            document.getElementById("farmerForm").style.display = "none";
        } else {
            document.getElementById("content").innerHTML = `<h1>Welcome</h1>`;
            document.getElementById("farmerForm").style.display = "none";
        }
    }

    window.showSection = showSection;

    function submitForm() {
        const name = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const landSize = document.getElementById("landSize").value;
        const cropType = document.getElementById("cropType").value;

        const farmerData = { name, contact, landSize, cropType };

        fetch("http://localhost:5000/addFarmer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(farmerData),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById("farmerForm").reset(); // Clear the form
        })
        .catch(error => console.error("Error:", error));
    }

    window.submitForm = submitForm;

    document.getElementById("csvFile").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            displayCSV(text);
        };
        reader.readAsText(file);
    });

    function displayCSV(data) {
        const rows = data.split("\n");
        let html = "<h3>CSV Data Preview</h3><table border='1'>";

        rows.forEach(row => {
            let cols = row.split(",");
            html += "<tr>";
            cols.forEach(col => {
                html += `<td>${col.trim()}</td>`;
            });
            html += "</tr>";
        });

        html += "</table>";
        document.getElementById("csvData").innerHTML = html;
    }
    

    // Initialize with "Welcome" content
    document.getElementById("content").innerHTML = `<h1>Welcome</h1>`;
    document.getElementById("farmerForm").style.display = "none";
});
