
// Q&A Card functionality

const cards = document.querySelectorAll('.qa-card');

console.log(cards);
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('open');
    })
})