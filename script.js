const searchInput = document.querySelector(".search-box input");
const results = document.querySelector(".results")
const searchPlaceholder = document.querySelector(".search-placeholder");
const wordPara = document.querySelector(".word");
const pronounciation = document.querySelector(".pronounciation");
const adjective = document.querySelector(".adjective");
const MeaningResult = document.querySelector(".Meaning-result");
const ExampleResult = document.querySelector(".Example-result");
const SynonimsResult = document.querySelector(".Synonims-result");
const volumeIcon = document.querySelector(".volume-icon i");
const clearBtn = document.querySelector(".search-box button");

function data(result,word){
    if(result.title){
        searchPlaceholder.innerText = `Can't find the meaning of the word "${word}".Please try to search for another word.`
    }else{
        console.log(result);
        searchPlaceholder.style.display="none";
        results.style.display = "flex";  
        
        wordPara.innerText = result[0].word;
        pronounciation.innerText = result[0].phonetics[0].text;
        adjective.innerText = result[0].meanings[0].partOfSpeech ;

        MeaningResult.innerText = result[0].meanings[0].definitions[0].definition;
        ExampleResult.innerText = result[0].meanings[0].definitions[0].example;

        const synonyms = result[0].meanings[0].synonyms;
        SynonimsResult.textContent = synonyms.join(", ");

        let audioLink = "";

        for (let phonetic of result[0].phonetics) {
            if (phonetic.audio) { 
                audioLink = phonetic.audio;
                break; 
            }
        }
        const audio = new Audio(audioLink);
        volumeIcon.onclick = () => {
            if (audioLink) {
                new Audio(audioLink).play();
            } else {
                alert("No pronunciation audio available.");
            }
        };

    }
}

function fetchAPI(word){
   searchPlaceholder.innerText = `Searching the meaning of "${word}"`;
   let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
   fetch(url).then(res=>res.json()).then((result)=>{
    data(result,word);
   })
}

searchInput.addEventListener("keyup",(e)=>{
    if(e.key == "Enter" && e.target.value){
        fetchAPI(e.target.value);
    }
})

clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    results.style.display = "none"; 
    searchPlaceholder.style.display="flex";
    searchPlaceholder.innerText = `Type a word and press enter to know its meaning.`;
    searchInput.focus(); // optional: puts the cursor back in the box
});