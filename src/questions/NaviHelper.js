
import {QuestionHandler} from "./QuestionHandler";

let q = QuestionHandler.getQuestionArray();
let values = buildProgressArray();


export class NaviHelper {
    static getCurrentProgress([chapter, part]) { // this could be improved with binary search using an array
        //from QuestionHandler.getQuestionList(). However, since there are only about ~50 questions the impact is minor.
        let a = [0,1];
        let i = 0;
        while(a[0] !== chapter || a[1] !== part) {
            a = QuestionHandler.getNextStep(a);
            ++i;
        }
        return values[i];
    }

    static getMaxProgress() {
        return values[values.length -1];
    }
}

function calculateProgress(type) {
    if (type === "Front Page") return 1;
    if (type === "Text") return 1;
    if (type === "Dual Choice") return 1;
    if (type === "Overview") return 1;
    if (type === "Single Choice with Other" || type === "Single Choice") return 2;
    if (type === "Multiple Choice or none" || type === "Multiple Choice") return 4;
    if (type === "Telemetry") return 3;
    if(type === "End") return 1;
    console.log("Error in NaviHelper.calculateProgress. Illegal type: " + type);
    return 0;
}

function buildProgressArray() {
    const lst = QuestionHandler.getQuestionList();
    let c = [], a = [], prev = 0, next = 0;
    for(let i=0; i<lst.length; ++i) {
        a = lst[i];
        next = calculateProgress(q[a[0]]["questionContainer"][a[1]]["type"]);
        c.push(prev + next);
        prev = prev + next;
    }
    return c;
}