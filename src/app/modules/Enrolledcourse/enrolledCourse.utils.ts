
export const calculateGradeAndPoints = (totalMarks:number) => {
    let result = {
        grade: 'NA',
        gradePoints: 0,
    }

    /**
     * 0-39 F ---> 0.00 --> Fail
     * 40-44 D --> 2.00 --> Third Class
     * 45-49 C --> 2.25 --> Second Class
     * 50-54 C+ --> 2.50 --> second class
     * 55-59 B- --> 2.75 --> second class
     * 60-64 B  --> 3.00 --> first class
     * 65-69 B+ --> 3.25 --> first class
     * 70-74 A- --> 3.50 --> first class
     * 75-79 A  --> 3.75 --> first class
     * 80-100 A+ --> 4.00 --> first class
    **/

    if(totalMarks >=0 && totalMarks <= 39){
        result = {
            grade: 'F',
            gradePoints: 0.00
        }
    }

    if(totalMarks >= 40 && totalMarks <= 44){
        result = {
            grade: 'D',
            gradePoints: 2.00
        }
    }

    if(totalMarks >= 45 && totalMarks <= 49){
        result = {
            grade: 'C',
            gradePoints: 2.25
        }
    }

    if(totalMarks >= 50 && totalMarks <= 54){
        result = {
            grade: 'C+',
            gradePoints: 2.50
        }
    }

    if(totalMarks >= 55 && totalMarks <= 59){
        result = {
            grade: 'B-',
            gradePoints: 2.75
        }
    }

    if(totalMarks >= 60 && totalMarks <= 64){
        result = {
            grade: 'B',
            gradePoints: 3.00
        }
    }

    if(totalMarks >= 65 && totalMarks <= 69){
        result = {
            grade: 'B+',
            gradePoints: 3.25
        }
    }

    if(totalMarks >= 70 && totalMarks <= 74){
        result = {
            grade: 'A-',
            gradePoints: 3.50
        }
    }

    if(totalMarks >= 75 && totalMarks <= 79){
        result = {
            grade: 'A',
            gradePoints: 3.75
        }
    }

    if(totalMarks >= 80 && totalMarks <= 100){
        result = {
            grade: 'A+',
            gradePoints: 4.00
        }
    }

    return result;
}