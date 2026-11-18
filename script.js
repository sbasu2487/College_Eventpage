const EVENTS = [
    { id: 1, name: "HackIEM 2026", date: "2026-09-26T09:00:00", venue: "AIML Lab, Gurukul Campus", category: "Technical", desc: "24-hour hackathon on applied machine learning. Teams of 2–4. Problem statements released at the opening ceremony; mentors available through the night." },
    { id: 2, name: "Hands-on Deep Learning with PyTorch", date: "2026-10-03T10:00:00", venue: "Lab 4, Ashram Building", category: "Workshops", desc: "Two-day workshop covering tensors, autograd, CNNs and a small speech-emotion classifier. Bring a laptop; no prior PyTorch experience needed." },
    { id: 3, name: "Guest lecture: Large language models for Indian languages", date: "2026-10-10T14:30:00", venue: "Seminar Hall, 2nd floor", category: "Lectures", desc: "An industry researcher discusses building and evaluating language models for low-resource Indic languages, followed by an open Q&A." },
    { id: 4, name: "Sharod Sandhya — cultural evening", date: "2026-10-16T17:00:00", venue: "Main Auditorium", category: "Cultural", desc: "Pre-Puja cultural evening with music, dance and drama performances by students of the department. Open to families." },
    { id: 5, name: "Line-follower robotics challenge", date: "2026-11-07T10:00:00", venue: "IoT Lab", category: "Technical", desc: "Build and race an autonomous line-following robot. Kits available on request; judging on speed, accuracy and build quality." },
    { id: 6, name: "Innovacion 2026 — annual tech fest", date: "2026-11-20T09:00:00", venue: "Gurukul Campus, all blocks", category: "Technical", desc: "Three days of coding contests, project exhibitions, paper presentations and gaming. The biggest event on the department calendar." }
];

function renderEvents(filter = "all") {
    const grid = document.getElementById("eventsGridList");
    const select = document.getElementById("regEventSelect");
    grid.innerHTML = "";
    select.innerHTML = '<option value="">Select an event</option>';

    EVENTS.forEach(ev => {
        const opt = document.createElement("option");
        opt.value = ev.name;
        opt.textContent = ev.name;
        select.appendChild(opt);

        if (filter !== "all" && ev.category !== filter) return;

        const d = new Date(ev.date);
        const dayStr = d.getDate();
        const monthStr = d.toLocaleString('en', { month: 'short' });
        const yearStr = d.getFullYear();

        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
            <div class="event-date-box">
                <div class="day">${dayStr}</div>
                <div class="month">${monthStr} ${yearStr}</div>
            </div>
            <div class="event-details">
                <h4>${ev.name}</h4>
                <div class="meta">${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} · ${ev.venue}</div>
                <p>${ev.desc}</p>
                <span class="badge">${ev.category}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
        document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
        e.target.classList.add("active");
        renderEvents(e.target.getAttribute("data-filter"));
    });
});

const toggleEventsBtn = document.getElementById("toggleEventsBtn");
const toggleRegisterBtn = document.getElementById("toggleRegisterBtn");

let eventsViewToggled = false;
toggleEventsBtn.addEventListener("click", () => {
    eventsViewToggled = !eventsViewToggled;
    document.getElementById("events").scrollIntoView({ behavior: 'smooth' });
    toggleEventsBtn.style.transform = eventsViewToggled ? "scale(1.05)" : "scale(1)";
});

let registerViewToggled = false;
toggleRegisterBtn.addEventListener("click", () => {
    registerViewToggled = !registerViewToggled;
    document.getElementById("register").scrollIntoView({ behavior: 'smooth' });
    toggleRegisterBtn.style.transform = registerViewToggled ? "scale(1.05)" : "scale(1)";
});

function updateCountdown() {
    const now = Date.now();
    const futureEvents = [...EVENTS].filter(ev => new Date(ev.date) > now).sort((a,b) => new Date(a.date) - new Date(b.date));
    if (futureEvents.length === 0) return;
    const next = futureEvents[0];
    
    document.getElementById("nextEventName").textContent = next.name;
    document.getElementById("nextEventMeta").textContent = `${new Date(next.date).toDateString()} · ${next.venue}`;

    let diff = new Date(next.date) - now;
    if(diff < 0) diff = 0;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    document.getElementById("cdDays").textContent = String(days).padStart(2, '0');
    document.getElementById("cdHours").textContent = String(hours).padStart(2, '0');
    document.getElementById("cdMins").textContent = String(mins).padStart(2, '0');
    document.getElementById("cdSecs").textContent = String(secs).padStart(2, '0');
}
setInterval(updateCountdown, 1000);

function updateClock() {
    const now = new Date();
    document.getElementById("liveClock").textContent = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata' });
}
setInterval(updateClock, 1000);

const themeToggle = document.getElementById("themeToggle");
function applyTheme(mode) {
    const isDark = mode === 'dark';
    document.body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? '☀' : '☾';
    localStorage.setItem('iem-theme', mode);
}
themeToggle.addEventListener('click', () => {
    const currentDark = document.body.classList.contains('dark');
    applyTheme(currentDark ? 'light' : 'dark');
});
const savedTheme = localStorage.getItem('iem-theme') || 'light';
applyTheme(savedTheme);

const hamburgerBtn = document.getElementById("hamburgerBtn");
const siteNav = document.getElementById("siteNav");
hamburgerBtn.addEventListener('click', () => {
    siteNav.classList.toggle('open');
});
document.querySelectorAll('.site-nav a').forEach(link => {
    link.addEventListener('click', () => siteNav.classList.remove('open'));
});

const regForm = document.getElementById("regForm");
regForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("regName").value.trim();
    const enroll = document.getElementById("regEnroll").value.trim();
    const dept = document.getElementById("regDept").value;
    const year = document.getElementById("regYear").value;
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const eventVal = document.getElementById("regEventSelect").value;

    const nameOk = /^[A-Za-z][A-Za-z .'-]{1,59}$/.test(name);
    const enrollOk = /^\d{14}$/.test(enroll);
    const emailOk = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(email);
    const phoneOk = /^[6-9]\d{9}$/.test(phone);

    setValidationState("group-name", nameOk);
    setValidationState("group-enroll", enrollOk);
    setValidationState("group-dept", dept !== "");
    setValidationState("group-year", year !== "");
    setValidationState("group-email", emailOk);
    setValidationState("group-phone", phoneOk);
    setValidationState("group-gender", gender !== null);
    setValidationState("group-event", eventVal !== "");

    if (!nameOk || !enrollOk || dept === "" || year === "" || !emailOk || !phoneOk || !gender || eventVal === "") {
        isValid = false;
    }

    if (isValid) {
        const successMsg = document.getElementById("formSuccessMsg");
        successMsg.style.display = "block";
        successMsg.textContent = `Thank you for registering for ${eventVal} ${name}. We will reach out to you soon.`;
        regForm.reset();
    }
});

const fbForm = document.getElementById("feedbackForm");
fbForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let valid = true;
    
    const fbName = document.getElementById("fbName").value.trim();
    const fbEmail = document.getElementById("fbEmail").value.trim();
    const fbMsg = document.getElementById("fbMsg").value.trim();

    setValidationState("fb-group-name", fbName.length > 0);
    setValidationState("fb-group-email", /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(fbEmail));
    setValidationState("fb-group-msg", fbMsg.length >= 15);

    if(fbName.length === 0 || !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(fbEmail) || fbMsg.length < 15) {
        valid = false;
    }

    if(valid) {
        document.getElementById("fbSuccessMsg").style.display = "block";
        fbForm.reset();
    }
});

function setValidationState(groupId, isValid) {
    const group = document.getElementById(groupId);
    if (isValid) {
        group.classList.remove("is-invalid");
    } else {
        group.classList.add("is-invalid");
    }
}

renderEvents();
updateCountdown();
updateClock();