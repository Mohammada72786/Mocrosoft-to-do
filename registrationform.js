function validateForm() {
    let nameFormat = /^[a-zA-Z]+[ a-zA-Z]{1,30}$/;
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let trainerName = document.getElementById('trainer');
    let userComment = document.getElementById('comment');
    // let dateTimeInput = document.getElementById("dateTimeInput");
    // let currentDate = new Date();
    // let oneYearLater = new Date();
    // oneYearLater.setFullYear(currentDate.getFullYear() + 1);
    // dateTimeInput.min = currentDate.toISOString().substr(0, 16);
    // dateTimeInput.max = oneYearLater.toISOString().substr(0, 16);
    if (!nameFormat.test(firstName.value)) {
        let warning = document.getElementById("first-name-warning");
        warning.innerHTML = "Please do not use numbers or special symbols";
        warning.style.background = "red";
        firstName.style.color = "red";
        firstName.focus();
        alert('Invalid first name');
        console.log("My name is mohammad");
        return false;
    } else if (!nameFormat.test(lastName.value)) {
        let warning = document.getElementById("last-name-warning");
        warning.innerHTML = "Please do not use numbers or special symbols";
        lastName.style.color = "red";
        warning.style.background = "red";
        lastName.focus();
        alert('Invalid Last name');
        return false;
    } else if (!nameFormat.test(trainerName.value)) {
        let warning = document.getElementById("trainer-name-warning");
        warning.innerHTML = "Please do not use numbers or special symbols";
        warning.style.background = "red";
        trainerName.focus();
        return false;
    } else if ((userComment.value.length > 1000) || (userComment.value.length < 100)) {
        let warning = document.getElementById("comment-warning");
        warning.innerHTML = "A comment must be at least 100 characters to 1000 characters";
        warning.style.background = "red";
        alert("Make sure that length of your comment is between 100 to 1000 characters");
        userComment.focus();
        return false;
    } else {
        alert("everything is going well")
        return true;
    }
}
