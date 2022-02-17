let timer_value = 30;
let holes = document.getElementsByClassName("hole");
let doggos = document.getElementsByClassName("doggo");
let scoreElem = document.getElementsByClassName("game_top");
let bestScore = 0;
let score = 0;
var bonkSound;

function startGame()
{
    bonkSound = new sound("bonk_sound.mp3")
    document.getElementById('start_button').style.visibility = 'hidden';
    startTimer();
    startCheems();
    
}

function startTimer()
{
    timer_value = 30;
    document.getElementById('timer').style.visibility = 'visible';
    document.getElementById('timer').innerHTML = timer_value +"s";
    
    let timerInterval = setInterval(function()
        {
            timer_value -= 1;
            document.getElementById('timer').innerHTML = timer_value +"s";
            if(timer_value <= 0)
            {
                clearInterval(timerInterval);
            }
        },1000);

    setTimeout(function()
    {
        document.getElementById('timer').style.visibility = 'hidden';
        document.getElementById('start_button').style.visibility = 'visible';
        hideAllCheems();
    }, (timer_value+2)*1000);
    
    
}

function startCheems()
{
    score = 0;
    scoreElem[0].innerHTML = "SCORE: " + score;
    let timerInterval = setInterval(function()
        {
            const randomHole = randomHoleValue();
            cheemsUp(randomHole);
            // holes[randomHole].onclick = function()
            // {
            //     bonk(randomHole);
                
            // };

            holes[randomHole].addEventListener("click", function() {

                bonk(randomHole);
            
            }, {once : true});


            holes[randomHole].removeAttribute(onclick);

            let timeOut = setTimeout(function(){
                cheemsDown(randomHole);
                doggos[randomHole].classList.remove("moveUp");
                doggos[randomHole].classList.remove("moveDown");
                
            }, 1400);

            

            if(timer_value <= 0)
            {
                clearInterval(timerInterval);
            }

            

        },1500);

    setTimeout(function()
    {
        if(score > bestScore)
        {
            bestScore = score;
        }
        scoreElem[0].innerHTML = "BEST SCORE: " + bestScore;
    }, (timer_value+2)*1000);

       
    
    
}

function randomHoleValue()
{
    return Math.floor(Math.random() * 9);
}

function cheemsUp(atHole)
{
    doggos[atHole].style.visibility = 'visible';
    //doggos[atHole].classList.add("moveUp");
    doggos[atHole].style.bottom = "20%";
}

function cheemsDown(atHole)
{
    doggos[atHole].style.bottom = "0%";
    //doggos[atHole].classList.add("moveDown");
    doggos[atHole].style.visibility = 'hidden';
}

function bonk(atHole)
{
    bonkSound.play();
    doggos[atHole].src = "bonk.png";
    doggos[atHole].style.bottom = "35%";
    let timeOut = setTimeout(function(){
        cheemsDown(atHole);
    }, 300);
    setTimeout(function(){
        doggos[atHole].src = "Cheems.png";
    }, 1000);

    score += 1;
    scoreElem[0].innerHTML = "SCORE: " + score;

}

function hideAllCheems()
{
    for(let i = 0; i < 9; i++)
    {
        doggos[i].style.visibility = 'hidden';
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }


