import q0 from "./0_introduction.json";
import q1 from "./1_businessCase.json";
import q2 from "./2_organisationalPerspecive.json";
import q3 from "./3_identifyBenefits.json";
import q4 from "./4_CheckUsability.json";
import q5 from "./5_evaluateCompany.json";
import q6 from "./6_telemetry.json";
import q7 from "./7_end.json"

const q = [q0, q1, q2, q3, q4, q5, q6, q7]; //IMPORTANT if you add a new step (q8), you NEED to extend this array!
//ALSO, you need to import the new question above! (q8 recommended as name)
//Likely it would make sense to change the order as Telemetry and End should probably be at the end.
//Additionally, on FrontPage.js you need to add to line 18 the new chapter (8: {}) see below:
//const [answer, setAnswer] = useState({0:{}, 1: {}, 2: {}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}});

const qList = getQuestionList();

export class QuestionHandler {
    static getQuestion([chapter, part]) {
        return getQuestion([chapter, part]);
    }

    static getTitles(language="de") {
        return getTitles(language);
    }

    static getNextStep([chapter=0, part=0]) {
        return getNextStep([chapter, part]);
    }

    static getNextQuestion([chapter=0, part=0], answer) {
        return getNextQuestion([chapter, part], answer);
    }

    static getLastStep([chapter, part], answer) {
        return getLastStep([chapter, part], answer);
    }

    static getQuestionArray() {
        return q;
    }

    static getQuestionList() {
        return qList;
    }
}

function getQuestion([chapter, part]) {
    return q[chapter]["questionContainer"][part];
}

//returns the next entry regardless of previous answers
function getNextStep([chapter, part]) {
    if(q[chapter]["questionContainer"][part+1] !== undefined) return [chapter, part+1];
    if(q[chapter+1] !== undefined) {
        if(q[chapter+1]["questionContainer"][1] !== undefined) {
            return [chapter+1, 1];
        }
    }
    return null; //to signal end of questions
}

//returns the next question. Applies logic and skips questions given previous answers.
function getNextQuestion([chapter, part], answer) {
    //[1,2]: check if a governmental entity at
    if(chapter === 1 && part === 2) {
        if(answer[1][2]["normalized"][0] !== 0) part += 1; //skipping question [1,3]
    }

    let a = getNextStep([chapter, part]);
    //chapter 3: check if at least 1 thing is high relevance
    if(a[0] === 4 && a[1] === 1) {
        console.log(answer);
        for(let i = 2; i <= part; ++i) {
            if(answer[chapter][i]["normalized"][0] === 0) return [4,1];
        }
        return [7,1];
    }

    //chapter 4: check if answer was yes
    if(chapter === 4 && part > 1) {
        if(answer[chapter][part]["normalized"][0] !== 0) return [7,1];
    }

    //check if telemetry questions should be asked
    if(chapter === 6 && part === 1) {
        if(answer[chapter][part]["normalized"][0] !== 0) return [6,6];
    }

    //general case
    return a;
}

function getTitles(language="de") {
    let t = []
    for(let i=0; i< q.length; i++) {
        t.push(q[i]["title"][language]);
    }
    return t;
}

function getLastStep([chapter, part], answer) {
    //can't go back further but shouldn't be possible anyway.
    if(chapter === 0 && part === 1) return [0,1];

    let prev = [0,1];
    let next = getNextQuestion(prev, answer);
    while(next[0] !== chapter || next[1] !== part) {
        prev = next;
        next = getNextQuestion(prev, answer);
    }
    return prev;

    /*
    This solution below doesn't care about what the answers were. Might be useful again in the future as it's way faster

    if(chapter === 0 && part === 1) return [0,1];
    if(part - 1 >= 1) return [chapter, part-1];
    if(chapter-1 < 0) return [0,1];

    let q = [chapter-1, 1];
    while(getNextStep(q)[0] === q[0]) q=getNextStep(q);
    return q;
    */
}

function getQuestionList() {
    let a = [0,1];
    let c = [a];
    while(getNextStep(a) !== null) {
        a = getNextStep(a);
        c.push(a);
    }
    return c;
}