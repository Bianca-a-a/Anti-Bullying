document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    const cardLinks = document.querySelectorAll('.card-btn');


    const isPageRefresh = performance.navigation.type === 1 ||
        performance.getEntriesByType('navigation')[0]?.type === 'reload';

    if (isPageRefresh) {

        resetAllCards();
    } else {

        checkCardsReadStatus();
    }


    cardLinks.forEach((link, index) => {
        link.addEventListener('click', function () {

            localStorage.setItem(`card-${index}-read`, 'true');
            markCardAsRead(cards[index], index);


            checkAllCardsRead();
        });
    });

    function checkCardsReadStatus() {
        cards.forEach((card, index) => {
            const isRead = localStorage.getItem(`card-${index}-read`) === 'true';
            if (isRead) {
                markCardAsRead(card, index);
            }
        });
    }

    function markCardAsRead(card, index) {

        const existingBadge = card.querySelector('.read-badge');
        if (existingBadge) {
            existingBadge.remove();
        }


        const readBadge = document.createElement('div');
        readBadge.className = 'read-badge';
        readBadge.textContent = '✓ Lido';
        readBadge.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #2ecc71;
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: bold;
            z-index: 10;
        `;
        card.style.position = 'relative';
        card.appendChild(readBadge);

        // Muda a cor do botão
        const button = card.querySelector('.card-btn');
        button.style.backgroundColor = '#95a5a6';
        button.style.cursor = 'default';
        button.onmouseenter = null;
        button.onmouseleave = null;
    }

    function checkAllCardsRead() {
        const allRead = Array.from(cards).every((card, index) => {
            return localStorage.getItem(`card-${index}-read`) === 'true';
        });

        if (allRead) {
            showCongratulations();
        }
    }

    function showCongratulations() {
        const congrats = document.createElement('div');
        congrats.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                text-align: center;
                z-index: 1000;
                max-width: 400px;
                width: 90%;
            ">
                <h2 style="color: #f14f88; margin-bottom: 15px;">Parabéns!</h2>
                <p style="margin-bottom: 20px; line-height: 1.5;">
                   Agora que você concluiu a leitura de todos os conteúdos sobre intolerância religiosa e homofobia, pode compreender em profundidade como tais atos são prejudiciais, constituindo-se como graves obstáculos para a construção de uma sociedade verdademente justa e inclusiva.
                </p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #f14f88;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1rem;
                ">
                    Fechar
                </button>
            </div>
        `;

        document.body.appendChild(congrats);
    }

    function resetAllCards() {

        cards.forEach((card, index) => {
            localStorage.removeItem(`card-${index}-read`);
        });


        const readBadges = document.querySelectorAll('.read-badge');
        readBadges.forEach(badge => badge.remove());


        cards.forEach((card, index) => {
            const button = card.querySelector('.card-btn');
            const originalColor = getOriginalButtonColor(index);

            button.style.backgroundColor = originalColor;
            button.style.cursor = 'pointer';

            button.onmouseenter = function () {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            };

            button.onmouseleave = function () {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            };
        });
    }

    function getOriginalButtonColor(index) {
        const colors = ['#f14f88', '#3498db', '#2ecc71'];
        return colors[index];
    }

    checkAllCardsRead();
});