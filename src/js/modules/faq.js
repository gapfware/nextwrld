const faqAccordion = document.querySelectorAll('.faq-accordion');

faqAccordion.forEach(function (btn) {
    btn.addEventListener('click', function () {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if (content.style.maxHeight === '200px') {
            content.style.maxHeight = '0px';
            content.style.padding = '0px 18px';
        } else {
            content.style.maxHeight = '200px';
            content.style.padding = '20px 18px';
        }
    });
});
