function computerPlay(){
    let randomNumber = Math.floor(Math.random() * 3); 
    let options = ['rock', 'paper', 'scissors'];
    res = options[randomNumber];
    return res;
}

function resultCalc(wonGames, lostGames){
    if (wonGames > lostGames) {
        return 'Game Won'
    }else if (lostGames > wonGames) {
        return 'Game lost'
    }else{
        return 'Game Tied'
    }
}

function refreshScoreboard(roundResult, score){
    const containerResult = document.querySelector('.container-result');
    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = `${roundResult} ${score}`;
    if (containerResult.firstChild === null) {
        containerResult.appendChild(content);
    }else{
        containerResult.removeChild(containerResult.firstChild);
        containerResult.appendChild(content);
    }

}

function cleanResults(){
    const containerFinal = document.querySelector('.container-final');
    containerFinal.removeChild(containerFinal.firstChild);
    const containerResult = document.querySelector('.container-result');
    containerResult.removeChild(containerResult.firstChild);
    roundsPlayed = 1;
    lostGames = 0;
    tiedGames = 0;
    wonGames = 0;
    
}

function showResult() {
    const containerFinal = document.querySelector('.container-final');
    const finalResult = document.createElement('div');
    finalResult.classList.add('content');
    finalResult.textContent = resultCalc(wonGames, lostGames);
    containerFinal.appendChild(finalResult)
    
}

function playRound(playerSelection, computerSelection){
    let roundResult = '';
    if ((playerSelection == 'rock' && computerSelection == 'paper') || (playerSelection == 'paper' && computerSelection == 'scissors') || (playerSelection == 'scissors' && computerSelection == 'rock')){
        roundResult = `Lost with ${playerSelection} against ${computerSelection}`;
        lostGames++;
    }else if ((playerSelection == 'rock' && computerSelection == 'scissors') || (playerSelection == 'paper' && computerSelection == 'rock') || (playerSelection == 'scissors' && computerSelection == 'paper')) {
        roundResult = `Won with ${playerSelection} against ${computerSelection}`;
        wonGames++;
    }else if (playerSelection == computerSelection){
        roundResult = `Tied with ${playerSelection} against ${computerSelection}`;
        tiedGames++;
    }else{
        console.log('error');
    }
    console.log(roundResult);
    let score = `Player: ${wonGames} Computer: ${lostGames} Tied: ${tiedGames}`;
    refreshScoreboard(roundResult, score);

}

function game(playerSelection){
    roundsPlayed++;
    if (roundsPlayed > 5) {
        cleanResults();
        computerSelection = computerPlay();
        playRound(playerSelection, computerSelection);
    }
    else if (roundsPlayed < 5) {
        computerSelection = computerPlay();
        playRound(playerSelection, computerSelection);
        
    }else if (roundsPlayed == 5) {
        console.log(roundsPlayed);
        computerSelection = computerPlay();
        playRound(playerSelection, computerSelection);
        showResult();
    }
}

let wonGames = 0;
let lostGames = 0;
let tiedGames = 0;
let roundsPlayed = 0;
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', () => game(button.id));
});
