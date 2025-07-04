var dataurl = 'content.json';

const switchLanBtn = document.getElementById("lang-switcher")
switchLanBtn.addEventListener("click", () => {
    switchLanBtn.innerHTML = switchLanBtn.innerHTML === "SK" ? "EN" : "SK";
    dataurl = dataurl === 'content.json' ? 'content-en.json' : 'content.json';
    const main = document.querySelector('main');

    main.innerHTML = '';

    const left = document.createElement('div');
    left.className = 'left-container';

    const right = document.createElement('div');
    right.className = 'right-container';

    main.appendChild(left);
    main.appendChild(right);
    prepareData()
updatePopupContent()
})

var pageInteractionHistory = []
async function loadData() {
    return await fetch(dataurl)
        .then(response => response.json())
        .then(data => { 
            return data;
        })
}

var darkMode = false

  const toggle = document.getElementById('darkModeToggle');
  const isDark = localStorage.getItem('dark-mode') === 'true';

  if (isDark) {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
  });

function createPopup(title, message, github = null) {
    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');
    if(overlay){
        overlay.addEventListener("click", () => {
            try{
                document.body.removeChild(overlay)

            }catch{
                
            }
        })
    }
   
    const popup = document.createElement('div');
    popup.classList.add('popup-box');

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.classList.add('popup-close-x');
    closeBtn.onclick = () => document.body.removeChild(overlay);
    popup.appendChild(closeBtn);

    const popuptitle = document.createElement("h2");
    popuptitle.innerHTML = title;
    popup.appendChild(popuptitle);
    const text = document.createElement('p');
    text.innerHTML = message;
    popup.appendChild(text);

    if (github) {
        const link = document.createElement('a');
        link.href = extractFirstUrl(github);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        if (dataurl === 'content.json') {
            link.textContent = 'Pozrieť na GitHube';
        } else {
            link.textContent = 'View on GitHub';
        }
        link.classList.add('github-link');
        popup.appendChild(link);
    }

    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

function createCertificatesList(certificates) {
    const container = document.createElement('div');
    container.classList.add('certificates-block');

    const header = document.createElement('h3');
    header.textContent = dataurl === 'content.json' ? 'Certifikáty' : 'Certificates'
    header.style.marginBottom = '12px';
    container.appendChild(header);

    const list = document.createElement('div');
    list.classList.add('certificates-list');

    certificates.forEach(cert => {
        const item = document.createElement('div');
        item.classList.add('certificate-item', 'clickable');

        const title = document.createElement('h4');
        title.textContent = cert.name;
        item.appendChild(title);

        item.addEventListener("click", () => {
            pageInteractionHistory.push(`Opened certificate ${cert.name}`)
            createPopup(cert.name, cert.description);
        });

        list.appendChild(item);
    });

    container.appendChild(list);
    return container;
}


function createProjectsList(projects) {
    const container = document.createElement('div');
    container.classList.add('projects-block');

    const header = document.createElement('h3');
    header.textContent = dataurl === 'content.json' ? 'Projekty a zadania' : 'My projects'
    header.style.marginBottom = '12px';
    container.appendChild(header);

    const list = document.createElement('div');
    list.classList.add('projects-list');

    projects.forEach(project => {
        const item = document.createElement('div');
        item.classList.add('project-item');

        const title = document.createElement('h4');
        title.textContent = project.name;
        item.appendChild(title);

        item.addEventListener("click", () => {
            pageInteractionHistory.push(`Opened project ${project.name}`)
            createPopup(project.name, project.description, project.github || null)
        })
        item.classList.add("clickable")
        list.appendChild(item);
    });
    const github = document.createElement("div");
    github.classList.add("github-link");

    const linkLabel = document.createElement("span");
    linkLabel.textContent = dataurl === "content.json" ? "Link na GitHub: " : "Link on GitHub: ";

    const link = document.createElement("a");
    link.href = "https://github.com/Richard190104?tab=repositories";
    link.textContent = "https://github.com/Richard190104";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    github.appendChild(linkLabel);
    github.appendChild(link);
    

    container.appendChild(list);
   container.appendChild(github);
    return container;
}

function extractFirstUrl(text) {
    const match = text.match(/https?:\/\/[^\s]+/);
    return match ? match[0] : '#';
}


function createQualitiesList(qualities, languages) {
    const container = document.createElement('div');
    container.classList.add('qualities-block');

    const header1 = document.createElement('h3');
    header1.textContent =  dataurl === 'content.json' ? 'Vlastnosti' : 'Personal qualities'
    header1.style.marginBottom = '12px';
    container.appendChild(header1);

    const qualitiesList = document.createElement('div');
    qualitiesList.classList.add('qualities-list');

    qualities.forEach(q => {
        const badge = document.createElement('span');
        badge.classList.add('quality-badge');
        badge.textContent = q;
        qualitiesList.appendChild(badge);
    });

    container.appendChild(qualitiesList);

    const header2 = document.createElement('h3');
    header2.textContent = dataurl === 'content.json' ? 'Jazykové znalosti' : 'Languages'
    header2.style.margin = '24px 0 12px 0';
    container.appendChild(header2);

    const languagesList = document.createElement('div');
    languagesList.classList.add('qualities-list');

    languages.forEach(lang => {
        const badge = document.createElement('span');
        badge.classList.add('quality-badge');
        badge.textContent = lang;
        languagesList.appendChild(badge);
    });

    container.appendChild(languagesList);

    return container;
}

function createWorkExperienceList(workExperience) {
    const container = document.createElement('div');
    container.classList.add('work-block');

    const header = document.createElement('h3');
    header.textContent = dataurl === 'content.json' ? 'Pracovné skúsenosti' : 'Professional Experience'
    header.style.marginBottom = '12px';
    container.appendChild(header);

    workExperience.forEach(exp => {
        const item = document.createElement('div');
        item.classList.add('work-item');

        const topRow = document.createElement('div');
        topRow.classList.add('work-header');

        const position = document.createElement('strong');
        position.textContent = exp.position;
        position.style.marginRight = '15px'

        const company = document.createElement('span');
        company.textContent = ` - ${exp.company}`;
        company.style.color = '#4b5563';

        position.appendChild(company);
        topRow.appendChild(position);

        const dates = document.createElement('div');
        const start = formatDate(exp.startDate);
        const end = exp.endDate ? formatDate(exp.endDate) : dataurl === 'content.json' ? 'súčastnosť' : 'present';
        dates.textContent = `${start} – ${end}`;
        topRow.appendChild(dates);

        const location = document.createElement('div');
        location.classList.add('location');
        location.textContent = exp.location;
        item.classList.add("clickable")
        item.addEventListener("click", () => {
            pageInteractionHistory.push(`Opened work ${exp.position}`)
            createPopup(exp.position +" - " + exp.company, exp.description)
        })
      

        item.appendChild(topRow);
        item.appendChild(location);

        container.appendChild(item);
    });

    return container;
}

function createEducationList(education) {
    const container = document.createElement('div');
    container.classList.add('education-block');

    const header = document.createElement('h3');
    header.textContent = dataurl === 'content.json' ? 'Vzdelanie' : 'Education'
    header.style.marginBottom = '12px';
    container.appendChild(header);

    education.forEach(item => {
        const schoolItem = document.createElement('div');
        schoolItem.classList.add('education-item');

        const title = document.createElement('strong');
        title.textContent = item.institution;

        const dates = document.createElement('div');
        const start = formatDate(item.startDate);
        const end = item.endDate ? formatDate(item.endDate) : 'súčasnosť';
        dates.textContent = `${start} – ${end}`;

        const location = document.createElement('div');
        location.textContent = item.location;

        schoolItem.appendChild(title);
        schoolItem.appendChild(dates);
        schoolItem.appendChild(location);
        schoolItem.classList.add("clickable")
        schoolItem.addEventListener("click", () => {
            pageInteractionHistory.push(`Opened education ${item.institution}`)
            createPopup(item.institution, item.description )
        })
        container.appendChild(schoolItem);
    });

    return container;
}

function formatDate(dateString) {
    const [year, month] = dateString.split('-');
    return `${month}/${year}`;
}


function createList(items, title) {
    const container = document.createElement('div');
    container.classList.add('block');

    const header = document.createElement('h3');
    header.textContent = title;
    header.style.marginBottom = '12px';
    container.appendChild(header);

    items.forEach((item, index) => {
        const skillName = Object.keys(item)[0];
        const skillLevel = Object.values(item)[0];
        const fillPercent = (skillLevel / 5) * 100;

        const listItem = document.createElement('div');
        listItem.classList.add('ListItem');
        listItem.style.position = 'relative';

        const fill = document.createElement('div');
        fill.classList.add('fill-bar');
        listItem.appendChild(fill);

        const content = document.createElement('div');
        content.classList.add('content');

        const label = document.createElement('span');
        label.classList.add('label');
        label.textContent = skillName;

        const level = document.createElement('span');
        level.classList.add('level');
        level.textContent = `${skillLevel}/5`;

        content.appendChild(label);
        content.appendChild(level);
        listItem.appendChild(content);

        container.appendChild(listItem);

        setTimeout(() => {
            fill.style.width = `${fillPercent}%`;
        }, 100 + index * 100); 
    });

    return container;
}



function createBlock(content, title){
    const block = document.createElement('div');
    block.classList.add('block');
    block.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
    `;
    return block;
}

async function prepareData(){
loadData().then(data => {
    const leftContainer = document.querySelector('.left-container');
    const rightContainer = document.querySelector('.right-container');
    const doubleContainer1 = document.createElement("div");
    doubleContainer1.classList.add("double-container");
    const header = document.querySelector('header');
    header.innerHTML = `
        <h1>${data.name}</h1>
        <h2>${data.title}</h2>
    `;
    if (dataurl === 'content.json') {
    leftContainer.innerHTML = `
        <div class="contact-container">
        <h3>Kontakt</h3>
        <p>Email: ${data.contact.email}</p>
        <p>Tel. číslo: ${data.contact.phone}</p>
        <p>Adresa: ${data.contact.address}</p>
        </div>
    `;
    } else {
    leftContainer.innerHTML = `
        <div class="contact-container">
        <h3>Contact</h3>
        <p>Email: ${data.contact.email}</p>
        <p>Phone number: ${data.contact.phone}</p>
        <p>Address: ${data.contact.address}</p>
        </div>
    `;
    }


    rightContainer.appendChild(createBlock(data.Aboutme, dataurl === 'content.json' ? 'O mne' : 'About me'));
    leftContainer.appendChild(createList(data.skills,  dataurl === 'content.json' ? 'Zručnosti' : 'Skills'));
    doubleContainer1.appendChild(createEducationList(data.education));
    rightContainer.appendChild(doubleContainer1)
    doubleContainer1.appendChild(createQualitiesList(data.qualities, data.languages))
    rightContainer.appendChild(createWorkExperienceList(data.WorkExperience))
    leftContainer.appendChild(createProjectsList(data.Projects))
    rightContainer.appendChild(createCertificatesList(data.Certificates));

const clickableObjects = document.querySelectorAll(".clickable");

clickableObjects.forEach((obj, index) => {
    const delay = index * 50; 

    setTimeout(() => {
        obj.style.transform = 'scale(1.05)';
        obj.style.transition = 'transform 0.3s ease';
    }, delay);

    setTimeout(() => {
        obj.style.transform = '';
    }, delay + 300); 
});

}).catch(error => {
    console.error('Error loading data:', error);
});
} 

prepareData()

function updatePopupContent() {
    if (document.querySelector(".popup-info ")){
        document.querySelector(".popup-info ").remove()
    }
     const popup = document.createElement('div');
    popup.className = 'popup-info animate-popup-in';
        popup.innerHTML = `
            <span class="popup-close">&times;</span>
            <p>👋 ${
                dataurl === "content.json"
                ? 'Niektoré prvky na tejto stránke sú <b>interaktívne</b>. Skúste na ne kliknúť alebo prejsť myšou – napríklad na karty alebo zoznamy!'
                : 'Some elements on this page are <b>interactive</b>. Try clicking or hovering over them – for example, cards or lists!'
            }</p>
        `;

        popup.querySelector('.popup-close').addEventListener('click', () => {
            popup.remove();
        });
    document.body.appendChild(popup);

    }

window.addEventListener('DOMContentLoaded', () => {
   
    
    

    updatePopupContent();


});

window.pageLoadTime = Date.now();

function sendVisitStart() {
  fetch('https://nodejs-serverless-function-express-wheat-kappa-81.vercel.app/api/visit-start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startTime: new Date().toISOString(),
      userAgent: "",
      referrer: "",
      path: window.location.pathname
    }),
    keepalive: true,
  });
}

function sendUserActivity() {
    const data = {
        duration: Date.now() - window.pageLoadTime,
        clicks: pageInteractionHistory
    };

    navigator.sendBeacon('https://nodejs-serverless-function-express-wheat-kappa-81.vercel.app/api/hello', JSON.stringify(data));
    pageInteractionHistory = []
}

window.addEventListener('DOMContentLoaded', sendVisitStart);

window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    sendUserActivity();
  }
});
