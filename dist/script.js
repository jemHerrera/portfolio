window.addEventListener('hashchange', (event) => {
    let hash = event.target.location.hash.replace('#', '');

    if(!hash) return closeProjects();
    openProject(hash);
})

window.addEventListener('scroll', activateScrollEvents)

function closeProjects(){
    let projectContents = document.querySelectorAll('.project-content');
    
    projectContents.forEach(element => element.classList.remove('active'))
    document.querySelector('body').classList.remove('overflow-hidden');
    ['side-nav', 'color-strip'].forEach(element => document.getElementById(element).classList.remove('z-index-0'))
    history.pushState({}, "", '#')
}

function openProject(id){
    const project = document.getElementById(id);

    if(!project.classList.contains('project')) return closeProjects();

    const content = project.querySelector('.project-content');

    content.classList.add('active');
    document.querySelector('body').classList.add('overflow-hidden');
    ['side-nav', 'color-strip'].forEach(element => document.getElementById(element).classList.add('z-index-0'))
    history.pushState({}, "", `#${id}`)
}


function activateScrollEvents(){
    navigateSections();
    paintColorStrip()
}

function navigateSections(){
    let scrollY = window.scrollY,
        sections = document.querySelectorAll('.main-section');

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        const sectionID = section.getAttribute("id");

        document.getElementById(`${sectionID}-link`).classList.remove('active');
        if(scrollY > sectionTop - 200 && scrollY <= sectionTop + sectionHeight - 200){
            document.getElementById(`${sectionID}-link`).classList.add('active')
        }
    });
}

function paintColorStrip(){
    let scrollY = window.scrollY,
        strip = document.getElementById('color-strip'),
        redPercent = Math.floor((scrollY*200/document.documentElement.scrollHeight)+20);

    strip.setAttribute('style', `background: linear-gradient(90deg, #00ffee, #00ffee, #2200fd, #f50e43, #f50e43 ${redPercent}%);`);
}

function show(selector){
    let toBeDisplayed = document.querySelectorAll(selector);
    toBeDisplayed.forEach(element => element.classList.remove('display-none'));
}
function hide(selector){
    let toBeHidden = document.querySelectorAll(selector);
    toBeHidden.forEach(element => element.classList.add('display-none'));
}