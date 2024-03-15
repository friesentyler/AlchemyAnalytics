
// Q&A Card functionality

const cards = document.querySelectorAll('.qa-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        let cardChild = card.children[1];
        card.classList.toggle('open');

        if (card.classList.contains('open')) {
            // Set a custom transition duration for opening
            cardChild.style.transitionDuration = (cardChild.scrollHeight / 200) + 's';
        } else {
            // Set the default transition duration for closing
            cardChild.style.transitionDuration = "0.5s";
        }        cardChild.style.height = cardChild.style.height ? null : cardChild.scrollHeight + 'px';

        console.log(cardChild.style.transitionDuration);
    })
})