/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
 * INITIAL FUNCTION
 */
const init = () => {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    totalRollScore = [0, 0];
    totalHoldScore = [0, 0];

    // Reset all score and hide the dice
    elements.score_0.textContent = 0;
    elements.score_1.textContent = 0;
    elements.current_0.textContent = 0;
    elements.current_1.textContent = 0;
    elements.dice.style.display = 'none';
    elements.player_0_panel.classList.add('active');
    elements.player_1_panel.classList.remove('active');
    elements.player_0_panel.classList.remove('winner');
    elements.player_1_panel.classList.remove('winner');
    elements.name_0.textContent = 'PLAYER 1';
    elements.name_1.textContent = 'PLAYER 2';
    gameStatistic('none');
    elements.finalScore.value = 100;
}

// Game statistic
const gameStatistic = action => {
    elements.roll_score_0.style.display = action;
    elements.roll_score_1.style.display = action;
    elements.hold_score_0.style.display = action;
    elements.hold_score_1.style.display = action;
    elements.player_roll_label_0.style.display = action;
    elements.player_roll_label_1.style.display = action;
    elements.player_hold_label_0.style.display = action;
    elements.player_hold_label_1.style.display = action;
}


// DOM Elements
const elements = {
    name_0: document.getElementById('name-0'),
    name_1: document.getElementById('name-1'),
    score_0: document.getElementById('score-0'),
    score_1: document.getElementById('score-1'),
    current_0: document.getElementById('current-0'),
    current_1: document.getElementById('current-1'),
    dice: document.querySelector('.dice'),
    player_0_panel: document.querySelector('.player-0-panel'),
    player_1_panel: document.querySelector('.player-1-panel'),
    btnRoll: document.querySelector('.btn-roll'),
    btnHold: document.querySelector('.btn-hold'),
    btnNew: document.querySelector('.btn-new'),
    roll_score_0: document.getElementById('roll-score-0'),
    roll_score_1: document.getElementById('roll-score-1'),
    hold_score_0: document.getElementById('hold-score-0'),
    hold_score_1: document.getElementById('hold-score-1'),
    player_roll_label_0: document.getElementById('player-roll-label-0'),
    player_roll_label_1: document.getElementById('player-roll-label-1'),
    player_hold_label_0: document.getElementById('player-hold-label-0'),
    player_hold_label_1: document.getElementById('player-hold-label-1'),
    finalScore: document.querySelector('.final-result')
}

let score, activePlayer, roundScore, gamePlaying, totalRollScore, totalHoldScore;

// Initial
init();


/*
 * NEXT PLAYER TURN
 */
const nextPlayer = () => {
    // Reset active Player UI current score 0
    document.getElementById(`current-${activePlayer}`).textContent = 0;

    // Hide the dice
    elements.dice.style.display = 'none';

    // player now inactive
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

    // Toggle activePlayer
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // Also round score start from 0
    roundScore = 0;

    // Next player now active class
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
}


/*
 * DICE ROLL CONTROLL
 */
const controlDiceRoll = () => {
    if (gamePlaying) {
        // 1) Get random number between 1 to 6
        const dice = Math.floor(Math.random() * 6) + 1;

        // 2) Display dice
        elements.dice.style.display = 'block';
        elements.dice.setAttribute('src', `img/dice-${dice}.png`);

        // 3) Check IF dice number is not 1
        if (dice !== 1) {
            // Add dice score to the roundScore
            roundScore += dice;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;

        } else {
            // Next Player turn
            nextPlayer();
        }
    }

};

/*
 * DICE ROLL CONTROLL
 */
const controlHoldBtn = () => {
    if (gamePlaying) {
        // Add round score to the GLOBAl score of this active player
        score[activePlayer] += roundScore;

        // Add score to UI
        document.getElementById(`score-${activePlayer}`).textContent = score[activePlayer];

        // Check IF user reach score 100 then he is winner
        // Get Final score from input field 
        const input = elements.finalScore.value;
        let winningScore;
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        if (score[activePlayer] >= winningScore) {
            // Add winner class
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!!!';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');

            // Game is over
            gamePlaying = false;

            // Remove dice
            elements.dice.style.display = 'none';

            // Remove active class
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

            // Add game statistic to UI
            gameStatistic('inline-block');
            elements.roll_score_0.textContent = totalRollScore[0];
            elements.roll_score_1.textContent = totalRollScore[1];
            elements.hold_score_0.textContent = totalHoldScore[0];
            elements.hold_score_1.textContent = totalHoldScore[1];

        } else {
            // Next Player turn
            nextPlayer();
        }
    }

};


// Handle DICE ROLL button Event
elements.btnRoll.addEventListener('click', () => {
    if (gamePlaying) totalRollScore[activePlayer]++;
    controlDiceRoll();
});

// Handle HOLD BUTTON Event
elements.btnHold.addEventListener('click', () => {
    if (gamePlaying) totalHoldScore[activePlayer]++;
    controlHoldBtn();
});

// Handle NEW BUTTON Event
elements.btnNew.addEventListener('click', init);
