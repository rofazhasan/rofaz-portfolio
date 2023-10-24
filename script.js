const data = {
    name: "Md. Rofaz Hasan Rafiu",
    university: "Rajshahi University of Engineering & Technology (RUET)",
    expertise: "Backend Developer | Software Engineer | AI Enthusiast",
    skills: ["C", "C++", "Python", "JavaScript"],
    projects: ["Project 1", "Project 2", "Project 3"],
    socialLinks: {
        facebook: "https://www.facebook.com/yourfacebookprofile",
        linkedin: "https://www.linkedin.com/in/yourlinkedinprofile",
    }
};

document.getElementById("name").textContent = data.name;
document.getElementById("university").textContent = data.university;
document.getElementById("expertise").textContent = data.expertise;

const skillsList = document.getElementById("skills-list");
data.skills.forEach(skill => {
    const skillItem = document.createElement("div");
    skillItem.textContent = skill;
    skillsList.appendChild(skillItem);
});

const projectsList = document.getElementById("projects-list");
data.projects.forEach(project => {
    const projectItem = document.createElement("div");
    projectItem.textContent = project;
    projectsList.appendChild(projectItem);
});

const socialLinksDiv = document.getElementById("social-links");
for (const [platform, link] of Object.entries(data.socialLinks)) {
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.target = "_blank";
    linkElement.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
    socialLinksDiv.appendChild(linkElement);
}
