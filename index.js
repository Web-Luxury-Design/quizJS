class Question{
  constructor(text,choices,answer){
    this.text=text;
    this.choices=choices;
    this.answer=answer;
  }
  isCorrectAnswer(choice){
    return choice === this.answer
  }
}

const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

class Quiz{
  constructor(questions){
    this.score=0
    this.questions=questions
    this.currentQuestionIndex=0
  }
  getCurrentQuestion(){
    return this.questions[this.currentQuestionIndex]
  }
  guess(answer){
    if (this.getCurrentQuestion().isCorrectAnswer(answer)){
      this.score++
    }
    this.currentQuestionIndex++
  }
  hasEnded(){
    return this.currentQuestionIndex >=this.questions.length;
  }
}

// Quiz display

const display= {
  elementShow:function(id,text){
    let element=document.getElementById(id);
    element.innerHTML=text
  },
  question: function(){
    this.elementShow("question",quiz.getCurrentQuestion().text)
  },
  choices:function(){
    let choices =quiz.getCurrentQuestion().choices;

    guessHandler=(id,guess)=>{
      document.getElementById(id).onclick=function(){
        quiz.guess(guess)
        quizApp()
      }
    }
    for (let i=0 ; i<choices.length; i++){
      this.elementShow("choice" + i, choices[i])
      guessHandler('guess' + i, choices[i])
    }
  },
  progress: function(){
    this.elementShow("progress",`Question ${quiz.currentQuestionIndex +1} sur ${quiz.questions.length}`)
  },
  endQuiz:function(){
    let endQuizHTML=`
      <h1>quiz terminé ! </h1>
      <h3> votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
    `
    this.elementShow("quiz" , endQuizHTML)
  }
}


//game logic

quizApp=()=>{
  if (quiz.hasEnded()) {
    display.endQuiz()

  }else{
    display.question();
    display.choices()
    display.progress()
  }
}


// create quiz

let quiz=new Quiz(questions)
quizApp()