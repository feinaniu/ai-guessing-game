// setups and stuff
const prompts = [
    "プロンプトジャンル: 未来的な都市景観", // 1
    "プロンプトジャンル: 中世建築", 
    "プロンプトジャンル: 水中の建物", 
    "プロンプトジャンル: 森の家",
    "プロンプトジャンル: 鯨", // 5
    "プロンプトジャンル: 氷の城",
    "プロンプトジャンル: スチームパンクシティy",
    "プロンプトジャンル: 櫻",
    "プロンプトジャンル: フェニックス",
    "プロンプトジャンル: にぎやかな市場", // 10
    "プロンプトジャンル: 冬の景色"
];

const folders = [];
for (let i = 1; i <= 15; i++) {
    folders.push(`prompt${i}`);
}

const correctImages = [
    [1, 3, 5], [4, 6], [2, 3, 5], [1, 4, 6], [3, 5],
    [3, 5, 6], [4, 6], [2, 3, 6], [2, 3, 4], [1, 2, 5, 6], 
    [2, 5, 6], 
]

let totalScore = 0;

// carousel code
document.addEventListener("DOMContentLoaded", function() {
    // getting elements of the document
    const checkButton = document.getElementById("check-button");
    const nextButton = document.getElementById("next-button");
    const prompt = document.getElementById("game-prompt");
    const scoreElement = document.getElementById("score");
    const totalScoreElement = document.getElementById("total-score");
    // const imageDiv = document.getElementById("image-holder");
    const imageElements = [];
    for (let i = 1; i <= 6; i++) {
        imageElements.push(document.getElementById(`carousel-image${i}`));
    }

    let index = 0;

    prompt.textContent = prompts[index];

    // change border of image if clicked
    for (let imageElement of imageElements) {
        imageElement.addEventListener("click", function() {
            if (imageElement.style.border === "10px solid black") {
                imageElement.style.border = "10px solid white";
            } else {
                imageElement.style.border = "10px solid black";
            }
        });
    }

    // check whether things were correct and display score and next button
    checkButton.addEventListener("click", function() {
        // list of correct indices for the prompt
        const correct = correctImages[index];
        let score = 0;
        // check if the user got it correct
        for (let i = 0; i < 6; i++) {
            let imageElement = imageElements[i];
            if (imageElement.style.border === "10px solid black") {
                if (correct.includes(i + 1)) {
                    imageElement.style.border = "10px solid green";
                    score += 1;
                }
                else {
                    imageElement.style.border = "10px solid red";
                }
            }
            else {
                if (correct.includes(i + 1)) {
                    imageElement.style.border = "3px solid red";
                    imageElement.style.padding = "7px";
                }
                else {
                    imageElement.style.border = "3px solid green";
                    imageElement.style.padding = "7px";
                    score += 1;
                }
            }
        }
        totalScore += score;

        scoreElement.textContent = score;
        totalScoreElement.textContent = totalScore;
        nextButton.style.display = "block";
        checkButton.style.display = "none";

    });

    // go to next prompt
    nextButton.addEventListener("click", function() {
        index = (index + 1);
        // display score and change next button to restart

        if (index == folders.length) {
            nextButton.textContent = "Restart";
            index = -1;
            totalScore = 0;
        }
        // display the next prompt and set of images
        else {
            nextButton.textContent = "Next";
            prompt.textContent = prompts[index];
            for (let i = 1; i <= 6; i++) {
                ix = i - 1;
                let imageElement = imageElements[ix];
                imageElement.src = "./images/" + folders[index] + `/image${i}.png`;
                imageElement.style.border = "10px solid white";
                imageElement.style.padding = "0px";
            }
        }

        scoreElement.textContent = "";
        nextButton.style.display = "none";
        checkButton.style.display = "block";
    });
});

