const containerFinal = document.querySelector('.final');
const containerResult = document.querySelector('.result');
const containerDetail = document.querySelector('.detail');
const containerScore = document.querySelector('.score');
let wonGames = 0;
let lostGames = 0;
let tiedGames = 0;
let roundsPlayed = 0;

function computerPlay(){
let randomNumber = Math.floor(Math.random() * 3); 
    let options = ['rock', 'paper', 'scissors'];
    res = options[randomNumber];
    return res;
}

function resultCalc(wonGames, lostGames){
    if (wonGames > lostGames){
        return 'Game Won'
    }else if (lostGames > wonGames){
        return 'Game lost'
    }else{
        return 'Game Tied'
    }
}

function refreshDetail(roundDetail){
    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = roundDetail;
    if (containerDetail.firstChild === null) {
        containerDetail.appendChild(content);
    }else{
        containerDetail.removeChild(containerDetail.firstChild);
        containerDetail.appendChild(content);
    }
}

function refreshScore(score){
    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = score;
    if (containerScore.firstChild === null) {
        containerScore.appendChild(content);
    }else{
        containerScore.removeChild(containerScore.firstChild);
        containerScore.appendChild(content);
    }
}

function cleanResults(){
    containerFinal.removeChild(containerFinal.firstChild);
    containerScore.removeChild(containerScore.firstChild);
    containerDetail.removeChild(containerDetail.firstChild);
    roundsPlayed = 1;
    lostGames = 0;
    tiedGames = 0;
    wonGames = 0;
}

function showResult(){
    const finalResult = document.createElement('div');
    finalResult.classList.add('content');
    finalResult.textContent = resultCalc(wonGames, lostGames);
    containerFinal.appendChild(finalResult);
    
}

function playRound(playerSelection, computerSelection){
    let roundDetail = '';
    if ((playerSelection == 'rock' && computerSelection == 'paper') || (playerSelection == 'paper' && computerSelection == 'scissors') || (playerSelection == 'scissors' && computerSelection == 'rock')){
        roundDetail = `Lost with ${playerSelection} against ${computerSelection}`;
        lostGames++;
    }else if ((playerSelection == 'rock' && computerSelection == 'scissors') || (playerSelection == 'paper' && computerSelection == 'rock') || (playerSelection == 'scissors' && computerSelection == 'paper')) {
        roundDetail = `Won with ${playerSelection} against ${computerSelection}`;
        wonGames++;
    }else if (playerSelection == computerSelection){
        roundDetail = `Tied with ${playerSelection} against ${computerSelection}`;
        tiedGames++;
    }else{
        console.log('error');
    }
    console.log(roundDetail);
    let score = `Player: ${wonGames} Computer: ${lostGames} Tied: ${tiedGames}`;
    refreshDetail(roundDetail);
    refreshScore(score);

}

function game(playerSelection){
    roundsPlayed++;
    if (roundsPlayed > 5){
        cleanResults();
        computerSelection = computerPlay();
        playRound(playerSelection, computerSelection);
    }
    else if (roundsPlayed < 5){
        computerSelection = computerPlay();
        playRound(playerSelection, computerSelection);
        
    }else if (roundsPlayed == 5){
        console.log(roundsPlayed);
        computerSelection = computerPlay();
        playRound(playerSelection, computerSelection);
        showResult();
    }
}


const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => game(button.id));
});
