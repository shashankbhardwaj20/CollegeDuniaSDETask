function fetchColleges() {
    const searchQuery = document.getElementById('searchInput').value;
    const sortBy = document.getElementById('sortSelect').value;
    const order = document.getElementById('orderSelect').value;

    fetch(`/api/colleges?search=${searchQuery}&sort=${sortBy}&order=${order}`)
        .then(response => response.json())
        .then(data => {
            renderColleges(data);
        });
}

function renderColleges(colleges) {
    const tableBody = document.getElementById('collegeTableBody');
    tableBody.innerHTML = '';

    colleges.forEach((college) => {
        const row = tableBody.insertRow();
        if (college.featured) {
            row.classList.add('featured');
        }
        row.innerHTML = `
            <td>${college.featured ? '<span class="star">★</span> ' : ''}${college.cdRank}</td>
            <td>
                <div class="college-name">${college.name}</div>
                <div class="college-location">${college.location}</div>
                <div class="college-actions">
                    <a href="#" class="apply-now">Apply Now</a>
                    <a href="#" class="download-brochure">Download Brochure</a>
                </div>
                <label class="add-to-compare">
                    <input type="checkbox"> Add To Compare
                </label>
            </td>
            <td>
                <div class="fees">₹${college.courseFees.toLocaleString()}</div>
                <a href="#" class="compare-link">Compare Fees</a>
            </td>
            <td>
                <div class="placement">₹${college.placement.toLocaleString()}</div>
                <a href="#" class="compare-link">Compare Placement</a>
            </td>
            <td class="user-reviews">${college.userReviews}/10</td>
            <td class="ranking">${college.ranking}</td>
        `;
    });
}

document.getElementById('searchInput').addEventListener('input', fetchColleges);
document.getElementById('sortSelect').addEventListener('change', fetchColleges);
document.getElementById('orderSelect').addEventListener('change', fetchColleges);


fetchColleges();