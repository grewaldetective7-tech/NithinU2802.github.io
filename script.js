var typed= new Typed(".text", {
    strings: ["Final Year Student", "President of Mastro Club", "Fresher"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => { 
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    const projects = document.querySelectorAll('.port-box');

    const allBtn = document.querySelector('.btn[data-filter="all"]');
    if (allBtn) allBtn.classList.add('active');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            projects.forEach(project => {
                project.style.display = 'none';
            });

            if (filterValue === 'all') {
                projects.forEach(project => {
                    project.style.display = 'block';
                });
            } else {
                const filteredProjects = document.querySelectorAll('.port-box.' + filterValue);
                filteredProjects.forEach(project => {
                    project.style.display = 'block';
                });
            }
        });
    });
});

function closeBanner() {
    document.getElementById('notification-banner').style.display = 'none';
    document.querySelector('.header').style.top = '0px';
}

document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.getElementById('copyright');
    if (copyrightElement) {
        copyrightElement.innerHTML = `Copyright &copy; ${currentYear} by Nithin U || All Right Reserved.`;
    }
});

