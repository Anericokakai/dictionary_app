// select the value of the form on submit

const form = document.querySelector("form");
const input = document.querySelector(".userinput");
form.onsubmit = (e) => {
  const inputValue = input.value;

  console.log(inputValue);

  console.log(typeof inputValue);

  var checkletter = /^[a-zA-z]+$/;
  if (inputValue.match(checkletter)) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
      .then((data) => {
        return data.json();
      })
      .then((fulldata) => {
        console.log(fulldata);
        console.log(fulldata[0].word);
        console.log(fulldata[0].meanings[0].partOfSpeech);
        console.log(fulldata[0].meanings[0]);

        // itterating through the array to find the meaning
        var lang = fulldata[0].meanings[0].definitions;
        let txt = "";
        for (let x in lang) {
          txt += lang[x].definition;
        }
        console.log(txt);

        // iteraring through the synonyms
        var syn = fulldata[0].meanings[0].synonyms;

        const result = syn.join(" , ");
        console.log(result);

        // sound

        console.log(fulldata[0].phonetics);

        // passing the values to html

        const header = document.querySelector(".heading");

        var innerHeader = `
<h1>${fulldata[0].word}</h1>
<div class="audio">
  <audio src="${fulldata[0].phonetics[0].audio}" controls preload="metadata">
      
  </audio>
</div>

`;

        const meaning = document.querySelector(".meaning");

        const meaningHtml = `

<h3>${fulldata[0].meanings[0].partOfSpeech}</h3>
        <h4>meaning</h4>
        <p>${txt}</p>
`;

        // synonym
        const synonym = document.querySelector(".synonym");

        var syntext = `
        <h3>synonyms</h3>
              <p>
        ${result}
        </p>
            `;
        synonym.innerHTML = syntext;

        meaning.innerHTML = meaningHtml;
        header.innerHTML = innerHeader;
      })
      .catch((err) => {
                const errormsg=document.querySelector('.errorHandler')
        if(err){
          errormsg.innerHTML='invalid word try something else'
          
        }else{
          errormsg.innerHTML=''
        }

        
      });

    e.preventDefault();
  } else {
      const errormsg=document.querySelector('.errorHandler')
    
      errormsg.innerHTML='only words are allowed'
    
    

    
    e.preventDefault()
  }
};

// dark mode

const moon = document.querySelector(".fa-moon");
const home = document.querySelector(".home");

moon.onclick = () => {
  moon.classList.toggle("fa-moon");

  if (moon.classList.toggle("fa-sun")) {
    home.style.backgroundColor = "#03001C";
    home.style.transition = ".5s";
    moon.style.color = "white";
    home.style.color = "white";
    input.style.backgroundColor = "grey";
    input.style.color = "white";
  } else {
    home.style.backgroundColor = "white";
    moon.style.color = "rgb(3,0,60)";
    home.style.color = "black";
    input.style.backgroundColor = "white";
  }
};
