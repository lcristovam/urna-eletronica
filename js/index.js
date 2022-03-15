

let yourVoteTo = document.querySelector('.d-1-1 span');
let position = document.querySelector('.d-1-2 span');
let numbers = document.querySelector('.d-1-3');
let description = document.querySelector('.d-1-4');
let warning = document.querySelector('.d-2');
let side = document.querySelector('.d-1-right');


//variáveis de ambiente

//etapas

let actualStep = 0;
let numbersPressed = '';
let whiteVote = false;
let votes = [];


function startStep(){
    let step = steps[actualStep];
    
    let numberHtml = '';
    numbersPressed = '';

    for (let i=0; i< step.numbersTitle; i++){
        if (i === 0){
            numberHtml += '<div class="number blink"></div>'
        }else{
            numberHtml += '<div class="number "></div>'
        }
    };


    yourVoteTo.style.display = 'none';
    position.innerHTML = step.title;
    description.innerHTML= '';
    warning.style.display = 'none';
    side.innerHTML = '';
    numbers.innerHTML = numberHtml;

}



//funções

function updateInterface(){    

        //busca pelo candidato
        let step = steps[actualStep];
        let candidate = step.candidates.filter((item)=>{

        if(item.number === numbersPressed){
            return true;
        }else{
            false;
        }
        });
        
        
        if (candidate.length > 0){
            candidate = candidate[0];
            
            //exibindo elementos do candidado na tela
            yourVoteTo.style.display = 'block';
            description.innerHTML = `Nome: ${candidate.name} <br> Partido: ${candidate.association} `;
            warning.style.display = 'block';

            let photosHtml = '';
            
            for( let i in candidate.photos){
                if(candidate.photos[i].small){
                        photosHtml += `<div class="d-1-image small"> <img  src="img/${candidate.photos[i].url}" alt="">${candidate.photos[i].subtitle}</div>`
                }else{
                    photosHtml += `<div class="d-1-image "> <img  src="img/${candidate.photos[i].url}" alt="">${candidate.photos[i].subtitle} </div>`
                }

                side.innerHTML = photosHtml;
            }
        }else{ //se nao encontrar nenhum candidato com o número 
            
            yourVoteTo.style.display = 'block';
            description.innerHTML = '<div class="big-warning blink">VOTO NULO</div>'
            warning.style.display = 'block';
        }
}


function clicked(n) {
     let elNumber = document.querySelector('.number.blink');

     if(elNumber != null){

        elNumber.innerHTML = n;

        numbersPressed = `${numbersPressed}${n}`;
     }

     elNumber.classList.remove('blink');

    if (elNumber.nextElementSibling != null){

     elNumber.nextElementSibling.classList.add('blink');

    }else{
        updateInterface();

    }
}


function white(){
    
    if (numbersPressed === ''){
        whiteVote = true;

        yourVoteTo.style.display = 'block';
        warning.style.display = 'block';
        numbers.innerHTML = '';
        description.innerHTML = '<div class="big-warning blink">VOTO EM BRANCO</div>'


    }else{
        alert("Para votar em branco, não pode ter digitado nenhum número");
    }
}

function fix(){
    startStep()
}


function confirm(){

    let step = steps[actualStep]

    let confirmedVote = false;
    if(whiteVote === true) {
        votes.push({
               etapa: steps[actualStep].title,
               voto:  'Branco'

        });
        console.log("confirmando como branco")
        confirmedVote = true;

    } else if (numbersPressed.length === step.numbersTitle){
        votes.push({
            etapa: steps[actualStep].title,
            voto:  numbersPressed
        });
        console.log(`confirmando como ${numbersPressed}`)
        confirmedVote = true;
    }
    if(confirmedVote){
        actualStep++;

        if(steps[actualStep] !== undefined){

            startStep();
        }else{
            document.querySelector('.screen').innerHTML = '<div class="BIG-BIG-warning blink">FIM</div>'
            console.log(votes)
        }
    }


}

startStep()
