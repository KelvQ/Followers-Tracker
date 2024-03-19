// Function to compare two HTML files and display unique names from the first file
function compareFiles() {
    // Get the uploaded files
    const file1 = document.getElementById('file1').files[0];
    const file2 = document.getElementById('file2').files[0];

    // Check if both files are selected
    if (!file1 || !file2) {
        alert("Please select two files.");
        return;
    }

    // Create file readers
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    // Read the first file
    reader1.onload = function (e) {
        // Extract names from the first file
        const content1 = extractNames(e.target.result);

        // Read the second file
        reader2.readAsText(file2);

        reader2.onload = function (e) {
            // Extract names from the second file
            const content2 = extractNames(e.target.result);

            // Find unique names in the first file
            const uniqueInFile1 = content1.filter(function (item) {
                return !content2.includes(item);
            });

            // Display unique names in the results container
            displayResults(uniqueInFile1);
        }
    }

    // Read the first file as text
    reader1.readAsText(file1);
}

// Function to extract names from HTML content
function extractNames(html) {
    // Parse HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find all anchor elements and extract their text content (assuming they contain names)
    const links = doc.querySelectorAll('a');
    const names = [];
    links.forEach(function (link) {
        names.push(link.textContent.trim());
    });
    return names;
}

// Function to display results in the results container
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        resultsContainer.textContent = 'No unique names found in the first file.';
    } else {
        const ul = document.createElement('ul');
        results.forEach(function (item) {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        resultsContainer.appendChild(ul);
    }
}
