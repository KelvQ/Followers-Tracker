function compareFiles() {
    const file1 = document.getElementById('file1').files[0];
    const file2 = document.getElementById('file2').files[0];

    if (!file1 || !file2) {
        alert("Please select two files.");
        return;
    }

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function(e) {
        const content1 = extractLinks(e.target.result);
        
        reader2.readAsText(file2);

        reader2.onload = function(e) {
            const content2 = extractLinks(e.target.result);

            const uniqueInFile1 = content1.filter(function(item) {
                return !content2.includes(item);
            });

            displayResults(uniqueInFile1);
        }
    }

    reader1.readAsText(file1);
}

function extractLinks(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = doc.querySelectorAll('a');
    const linkTexts = [];
    links.forEach(function(link) {
        linkTexts.push(link.textContent.trim());
    });
    return linkTexts;
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        resultsContainer.textContent = 'No unique strings found in the first file.';
    } else {
        const ul = document.createElement('ul');
        results.forEach(function(item) {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        resultsContainer.appendChild(ul);
    }
}
