function createStudent(usn, subjectCode, subjectName, cieMarks, seeMarks) {
    // Private variables
    let cie = cieMarks;
    let see = seeMarks;

    return {
        getDetails: function() {
            return {
                USN: usn,
                SubjectCode: subjectCode,
                SubjectName: subjectName,
                TotalMarks: this.getTotalMarks()
            };
        },
        getTotalMarks: function() {
            return cie + see;
        }
    };
}

// Create a student
const student = createStudent("1MS23CS001", "CS101", "JavaScript", 45, 50);

// Display student details
const details = student.getDetails();
console.log("Student Details:");
console.log(`USN: ${details.USN}`);
console.log(`Subject Code: ${details.SubjectCode}`);
console.log(`Subject Name: ${details.SubjectName}`);
console.log(`Total Marks: ${details.TotalMarks}`);
