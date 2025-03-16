const PROXY_URL = "http://localhost:3000/api/medication";

async function fetchMedicationInfo(query) {
    try {
        const response = await fetch(PROXY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            displayResults(data.choices[0].text.trim());
        } else {
            throw new Error("No results found.");
        }
    } catch (error) {
        console.error("Error fetching medication information:", error);
        medicationResults.innerHTML = `<p class='text-danger'>Failed to fetch information. Error: ${error.message}</p>`;
    }
}