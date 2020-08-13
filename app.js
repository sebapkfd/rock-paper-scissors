const containerFinal = document.querySelector('.final');
const containerResult = document.querySelector('.result');
const containerDetail = document.querySelector('.detail');
const containerScore = document.querySelector('.score');
const containerUser = document.querySelector('#user');
const containerPc = document.querySelector('#pc');
let wonGames = 0;
let lostGames = 0;
let tiedGames = 0;
let roundsPlayed = 0;

function computerPlay(){
let randomNumber = Math.floor(Math.random() * 3); 
    let options = ['Rock', 'Paper', 'Scissors'];
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
    const userContent = document.createElement('div');
    userContent.classList.add('content');
    userContent.textContent = roundDetail[1];
    const pcContent = document.createElement('div');
    pcContent.classList.add('content');
    pcContent.textContent = roundDetail[2];

    if (roundDetail[0]=='Lost') {
        console.log('Lost');
        userContent.setAttribute('style', 'background-color: rgb(238, 137, 137); color: rgb(218, 42, 42);')
        pcContent.setAttribute('style', 'background-color: rgb(111, 180, 105); color: rgb(24, 110, 17);')
    }else if(roundDetail[0]=='Won') {
        console.log('Won');
        userContent.setAttribute('style', 'background-color: rgb(111, 180, 105); color: rgb(24, 110, 17);')
        pcContent.setAttribute('style', 'background-color: rgb(238, 137, 137); color: rgb(218, 42, 42);')
    }else if(roundDetail[0]=='Tied') {
        console.log('Tied');
        userContent.setAttribute('style', 'background-color: rgb(134, 194, 218); color: rgb(34, 76, 131);')
        pcContent.setAttribute('style', 'background-color: rgb(134, 194, 218); color: rgb(34, 76, 131);')
    }

    if (containerUser.firstChild === null) {
        containerUser.appendChild(userContent);
    }else{
        containerUser.removeChild(containerUser.firstChild);
        containerUser.appendChild(userContent);
    }
    
    if (containerPc.firstChild === null) {
        containerPc.appendChild(pcContent);
    }else{
        containerPc.removeChild(containerPc.firstChild);
        containerPc.appendChild(pcContent);
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
    containerUser.removeChild(containerUser.firstChild);
    containerPc.removeChild(containerPc.firstChild);
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
    let roundDetail = [];
    if ((playerSelection == 'Rock' && computerSelection == 'Paper') || (playerSelection == 'Paper' && computerSelection == 'Scissors') || (playerSelection == 'Scissors' && computerSelection == 'Rock')){
        roundDetail = ['Lost', playerSelection, computerSelection];
        lostGames++;
    }else if ((playerSelection == 'Rock' && computerSelection == 'Scissors') || (playerSelection == 'Paper' && computerSelection == 'Rock') || (playerSelection == 'Scissors' && computerSelection == 'Paper')) {
        roundDetail = ['Won', playerSelection, computerSelection];
        wonGames++;
    }else if (playerSelection == computerSelection){
        roundDetail = ['Tied', playerSelection, computerSelection];
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
