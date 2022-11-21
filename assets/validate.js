let problems = { // all keys must be deleted by validateForm
    'name': '',
    'surname': '',
    'date': '',
    'street': '',
    'house': '',
    'flat': '',
    'payment': '',
    };

let gifts = {};

// activate button Submit only after fileds filled
const updateSubmit = (problems) => {
    let submit = document.getElementById('submit');
    submit.disabled = ((Object.keys(problems).length === 0) ? false : true);
    submit.value = ((submit.disabled) ? 'To Complete Order: Provide Data' : 'Complete Order');
}

const showSummary = (event) =>{
    event.preventDefault();
    let form = document.forms.form;
    let summary = `Delivery Date: ${form.date.value}
                    Address: Flat ${form.flat.value} House ${form.house.value} ${form.street.value} Street
                    For ${form.name.value} ${form.surname.value}`
    document.getElementById('summary').textContent = summary;
    document.getElementById('popup-confirmed').classList.add('active');
}

const validateForm = (event) => {
    let id = event.currentTarget.id // input or fieldset
    let problem = '';
    switch (id) {
        case 'name':
            if (event.target.value.length === 0){
                problem += 'Required.';
            }
            if (event.target.value.length < 4){
                problem += ' Must be at least 4 char.';
            }
            if ((/\s/).test(event.target.value)){
                problem += ' No white spaces.';
            }
            if (!(/^[a-zA-Z]+$/).test(event.target.value)) {
                problem += ' Only letters.';
            }
            break;
        case 'surname':
            if (event.target.value.length === 0){
                problem += 'Required.';
            }
            if (event.target.value.length < 5){
                problem += ' Must be at least 5 char.';
            }
            if ((/\s/).test(event.target.value)){
                problem += ' No white spaces.';
            }
            if (!(/^[a-zA-Z]+$/).test(event.target.value)) {
                problem += ' Only letters.';
            }
            break;
        case 'date':
            if (event.target.value.length === 0){
                problem += 'Required.';
            }
            let today = new Date();
            today.setHours(0,0,0,0); // make midnight
            let diffInMs = new Date(event.target.value) - today;
            // convert to days
            if ((diffInMs / (1000 * 60 * 60 * 24)) < 1) {
                problem += ' Delivery from tomorrow'
            }
            break;
        case 'street':
            if (event.target.value.length === 0){
                problem += 'Required.';
            }
            if (event.target.value.length < 5){
                problem += ' Must be at least 5 char.';
            }
            break;
        case 'house':
            if (event.target.value.length === 0){
                problem += 'Required.';
            }
            if (parseInt(event.target.value) < 0){
                problem += ' Positive numbers only.';
            }
            break;
        case 'flat':
            if (event.target.value.length === 0){
                problem += 'Required.';
            }
            if (!(/^\d+(-\d+)*$/).test(event.target.value)) {
                problem += ' Only digits or format like 11-2.';
            }
            break;
        case 'payment':
            if (document.forms.form.elements.payment.value.length === 0){
                problem += 'Required.';
            };
            break;
        case 'gifts': // on change
            if (event.target.checked === true) {
                if (Object.keys(gifts).length < 2) { // only 2 gifts
                    gifts[event.target.id] = '';
                }
                else {
                    event.target.checked = false // no more gifts
                }
            }
            else {
                delete gifts[event.target.id];
            }
            console.log(event.target.id, event.target.checked);
            break
    }
    if (problem.length === 0) {
        // no problem
        delete problems[id];
        event.target.classList.remove('error'); // red border
        event.target.parentElement.classList.remove('error');
        event.target.parentElement.setAttribute('data-errormsg', problem);
    }
    else {
        problems[id] = problem;
        event.target.classList.add('error'); // red border
        event.target.parentElement.classList.add('error');
        event.target.parentElement.setAttribute('data-errormsg', problem);

    }
    updateSubmit(problems);
}

updateSubmit(problems);
document.getElementById('name').addEventListener("blur", validateForm);
document.getElementById('surname').addEventListener("blur", validateForm);
document.getElementById('date').addEventListener("blur", validateForm);
document.getElementById('street').addEventListener("blur", validateForm);
document.getElementById('house').addEventListener("blur", validateForm);
document.getElementById('flat').addEventListener("blur", validateForm);
document.getElementById('payment').addEventListener("focusout", validateForm);
document.getElementById('gifts').addEventListener("change", validateForm);
document.getElementById('form').addEventListener("submit", showSummary);
