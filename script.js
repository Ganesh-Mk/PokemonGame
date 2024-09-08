let p1Name;
let p2Name;
let p1 = document.querySelector('.p1');
let p2 = document.querySelector('.p2');
let pos1 = 0;
let pos2 = 0;
let isJumpingP1 = false;
let isJumpingP2 = false;
let isSittingP1 = false;
let isSittingP2 = false;
let movementSpeed = 4;
let healthDecrement = 2;
let p1CanFire = true;
let p2CanFire = true;
let getDamage;
let scoreP1 = 20;
let scoreP2 = 20;

loginPage();
function loginPage(){
    let options = document.querySelectorAll('.optionBtns');
    options.forEach((option) => {
        option.addEventListener('click', () => {
            if(option.name == 'PvP'){
                movement();


                let p1Name = document.getElementById('p1Name').value;
                let p2Name = document.getElementById('p2Name').value;
                
                if(p1Name == ''){
                    p1Name = "Dragon";
                }
                if(p2Name == ''){
                    p2Name = "Pikachu";
                }
                document.querySelector('.p1NameInNav').innerHTML = p1Name;
                document.querySelector('.p1Name').innerHTML = p1Name;
                document.querySelector('.p2NameInNav').innerHTML = p2Name;
                document.querySelector('.p2Name').innerHTML = p2Name;

                document.querySelector('.gameH1').style.display = "none";
                document.querySelector('.options').style.display = "none";
                document.querySelector('#firstPoki').style.display = "none";
                document.querySelector('#secondPoki').style.display = "none";
                document.querySelector('.main').style.right = "50%";
            }

            else if(option.name == 'how'){
                document.querySelector('.howToPlay').style.display = "block";
                document.querySelector('.loginPage').style.display = "none";
            }
        })
    })
}

initialization();
function initialization(){
    p1 = document.querySelector('.p1');
    p2 = document.querySelector('.p2');
    pos1 = 0;
    pos2 = 0;
    isJumpingP1 = false;
    isJumpingP2 = false;
    isSittingP1 = false;
    isSittingP2 = false;
    movementSpeed = 4;
    healthDecrement = 2;
    p1CanFire = true;
    p2CanFire = true;
    getDamage;
    scoreP1 = 20;
    scoreP2 = 20;
}

movement();
function movement() {
    document.addEventListener('keyup', (button) => {
        console.log("Applied keys")
        if (button.key == 'w' && !isJumpingP1) {
            isJumpingP1 = true;
            p1.classList.add('jump');
            setTimeout(() => {
                p1.classList.remove('jump');
                isJumpingP1 = false
            }, 1000);
        }
        else if (button.key == 'a') {
            if (isNotOutside(p1, 'left')) {
                pos1 -= movementSpeed;
                p1.style.left = `${pos1}rem`;
            }
        }
        else if (button.key == 'd') {
            if(checkAngleSide()){
                if (isNotOutside(p1, 'right')) {
                    pos1 += movementSpeed;
                    p1.style.left = `${pos1}rem`;
                }
            }
        }
        else if (button.key == 's' && !isSittingP1) {
            if (isDownSide(p1)) {
                isSittingP1 = true;
                let pImage = document.querySelector('.p1Image')
                pImage.classList.add('sit');

                setTimeout(() => {
                    pImage.classList.remove('sit');
                    isSittingP1 = false;
                }, 1000);
            }

        }
        else if (button.key == 'f' || button.key == 'q') {
            fireLeft();
        }


        else if (button.key == 'ArrowUp' && !isJumpingP2) {
            isJumpingP2 = true;
            p2.classList.add('jump');
            setTimeout(() => {
                p2.classList.remove('jump');
                isJumpingP2 = false;
            }, 1000);
        }
        else if (button.key == 'ArrowLeft') {
            if(checkAngleSide()){
                if (isNotOutside(p2, 'left')) {
                    pos2 -= movementSpeed;
                    p2.style.left = `${pos2}rem`;
                } 
            }
        }
        else if (button.key == 'ArrowRight') {
            if (isNotOutside(p2, 'right')) {
                pos2 += movementSpeed;
                p2.style.left = `${pos2}rem`;
            }
        }
        else if (button.key == 'ArrowDown' && !isSittingP2) {
            if (isDownSide(p2)) {
                isSittingP2 = true;
                let pImage = document.querySelector('.p2Image')
                pImage.classList.add('sit');

                setTimeout(() => {
                    isSittingP2 = false;
                    pImage.classList.remove('sit');
                }, 1000);
            }
        }
        else if (button.key == 'ShiftRight' || button.code == 'ShiftRight' || button.key == 'ControlRight' || button.code == 'ControlRight') {
            fireRight();
        }
    })
}

function checkAngleSide(){
    let posP1 = p1.getBoundingClientRect();
    let posP2 = p2.getBoundingClientRect();

    if(posP1.right >= posP2.left){
        return false;
    }
    return true;

}

function isDownSide(p) {
    let pos = p.getBoundingClientRect();
    if (pos.bottom <= 554) {
        return false;
    }
    return true;
}

function isNotOutside(p, pos) {
    let position = p.getBoundingClientRect();
    if (pos == 'left') {
        if (position.left <= 0) {
            return false;
        }
        return true;
    }
    else {
        if (position.right >= 1200) {
            return false;
        }
        return true;
    }
}

function fireLeft() {
    if (p1CanFire) {
        p1CanFire = false;

        let fire = document.createElement('span');
        fire.className = 'fireLeft';
        document.querySelector('.ground').appendChild(fire);
        //document.querySelector('.poki-container').appendChild(fire);  // How to Play Page

        let p1Positions = p1.getBoundingClientRect();
        fire.style.left = `${p1Positions.left + 100}px`;
        fire.style.top = `${p1Positions.top + 120}px`;
        fire.style.display = 'block';

        setTimeout(() => {
            fire.style.left = '2100px';
            damageP1(fire);
        }, 100)

        setTimeout(() => {
            p1CanFire = true;
            fire.remove();
            clearInterval(getDamageP1);
        }, 2000);
    }
}                           

function fireRight() {
    if (p2CanFire) {
        p2CanFire = false;

        let fire = document.createElement('span');
        fire.className = 'fireRight';
        document.querySelector('.ground').appendChild(fire);
        //document.querySelector('.poki-container').appendChild(fire);// How to Play Page

        let p2Positions = p2.getBoundingClientRect();
        fire.style.left = `${p2Positions.left + 100}px`;
        fire.style.top = `${p2Positions.top + 110}px`;
        fire.style.display = 'block';


        setTimeout(() => {
            fire.style.left = '-1000px';
            damageP2(fire);
        }, 100)

        setTimeout(() => {
            p2CanFire = true;
            fire.remove();
            clearInterval(getDamageP2);
        }, 2000);
    }
}

function damageP1(fire) {
    getDamageP1 = setInterval(() => {
        let firePos = fire.getBoundingClientRect();
        let p2Pos = p2.getBoundingClientRect();

        if (
            p2Pos.bottom >= firePos.top &&
            p2Pos.top <= firePos.bottom - 20 &&
            p2Pos.left <= firePos.right &&
            p2Pos.right >= firePos.left
        ) {
            let audio = new Audio('/Sounds/umph-47201.mp3');
            audio.play();
            clearInterval(getDamageP1);
            scoreP2 -= healthDecrement;
            document.querySelector('.fireLeft').style.display = "none";
            document.querySelector('.p2HealthRange').style.width = `${scoreP2}rem`
            checkOut(scoreP2, 'p2')
        }

    }, 50);
}

function damageP2(fire) {
    getDamageP2 = setInterval(() => {
        let firePos = fire.getBoundingClientRect();
        let p1Pos = p1.getBoundingClientRect();

        if (
            p1Pos.bottom >= firePos.top &&
            p1Pos.top <= firePos.bottom -20 &&
            p1Pos.left <= firePos.right &&
            p1Pos.right >= firePos.left
        ) {
            let audio = new Audio('/Sounds/ough-47202.mp3');
            audio.play();
            clearInterval(getDamageP2);
            scoreP1 -= healthDecrement;
            document.querySelector('.fireRight').style.display = "none";
            document.querySelector('.p1HealthRange').style.width = `${scoreP1}rem`
            checkOut(scoreP1, 'p1')
        }

    }, 50);
}

function checkOut(score, p) {
    if (score <= 0) {
        p1CanFire = false;
        p2CanFire = false;

        let pok1 = document.querySelector('.p1Image')
        let pok2 = document.querySelector('.p2Image')
        if(p == 'p1'){
            pok1.style.transform = "rotate(-90deg)";
            pok1.style.width = "5rem";
        }
        else{
            pok2.style.transform = "rotate(-90deg)";
            pok2.style.width = "5rem";
        }

        document.querySelector('.gameOver').style.display = "block";
        document.querySelector('.restart').style.display = "block";
        document.querySelector('.restart').addEventListener('click', () => {
            location.reload();
        })
        let audio = new Audio('/Sounds/negative_beeps-6008.mp3');
        audio.play();
        return true;
    }
    return false;



    
}