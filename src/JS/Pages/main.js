
// Q&A Card functionality

const cards = document.querySelectorAll('.qa-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('open');
    })
})