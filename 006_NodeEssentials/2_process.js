process.stdout.write("Hello world");

const questions = ["what's your name?", "How are you?", "what are your programming skills?"];
const answers = [];

function askQuestion(i = 0) {
    process.stdout.write(`\n\n ${questions[i]} \n > `);
}

askQuestion();

process.stdin.on("data", function(data) {
    answers.push(data.toString().trim());

    if(answers.length == questions.length) {
        process.exit();
    }
    else {
        askQuestion(answers.length);
    }
});

process.on("exit", function() {
    process.stdout.write("\n\n\n");
    process.stdout.write(`Answers are \n ${answers[0]} \n ${answers[1]} \n ${answers[2]} `);
})