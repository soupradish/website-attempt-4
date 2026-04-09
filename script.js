document.addEventListener('DOMContentLoaded', () => {
  // 1. Fetch data from JSON
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      populateProfile(data.profile);
      populateLists(data.skills, data.awards);
      populateExperience(data.experience);
      populateEducation(data.education);
    })
    .catch(error => console.error("Error loading resume data:", error));

  // 2. Tab Interaction Logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });
});

// Helper functions to inject JSON data into HTML
function populateProfile(profile) {
  document.getElementById('name').textContent = profile.name;
  document.getElementById('headline').textContent = profile.headline;
  document.getElementById('location').textContent = profile.location;
  document.getElementById('summary-text').textContent = profile.summary;
  
  document.getElementById('email-link').href = `mailto:${profile.email}`;
  document.getElementById('linkedin-link').href = `https://${profile.linkedin}`;
}

function populateLists(skills, awards) {
  const skillsContainer = document.getElementById('skills-container');
  skills.forEach(skill => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = skill;
    skillsContainer.appendChild(span);
  });

  const awardsContainer = document.getElementById('awards-container');
  awards.forEach(award => {
    const li = document.createElement('li');
    li.textContent = award;
    awardsContainer.appendChild(li);
  });
}

function populateExperience(experienceArray) {
  const container = document.getElementById('experience-container');
  experienceArray.forEach(job => {
    let tasksHtml = job.tasks.map(task => `<li>${task}</li>`).join('');
    
    container.innerHTML += `
      <div class="history-item">
        <div class="item-title">${job.role}</div>
        <div class="item-subtitle">${job.company}</div>
        <div class="item-date">${job.dates}</div>
        <ul class="task-list">${tasksHtml}</ul>
      </div>
    `;
  });
}

function populateEducation(educationArray) {
  const container = document.getElementById('education-container');
  educationArray.forEach(edu => {
    container.innerHTML += `
      <div class="history-item">
        <div class="item-title">${edu.school}</div>
        <div class="item-subtitle">${edu.degree}</div>
        <div class="item-date">${edu.dates}</div>
      </div>
    `;
  });
}