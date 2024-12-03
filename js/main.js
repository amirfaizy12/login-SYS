var nameInput = document.getElementById('nameUp');
var emailInput = document.getElementById('emailUp');
var passInput = document.getElementById('passUp');

var email = document.getElementById('emailIn');
var pass = document.getElementById('passIn');

var userName = "";

var closeValidInfo  = document.getElementById('closeValidInfo');

var validInfo = document.getElementById('validationInfo');

var regex ={
    name: /^(\w){3,}/,
    email: /^(.){2,}@(\w){2,7}\.(\w){2,}/,
    pass: /^(.){8,}/
};

var signUpForm = document.querySelector('#signUpForm');
var signInform = document.querySelector('#signInForm');

var signUpButton = document.querySelector('#signUpBtn');
var users = JSON.parse(localStorage.getItem('users')) || [];

var successElm = document.querySelector('#succes');
var alertLogin = document.querySelector('#alertLogin');

var signInButton = document.querySelector('#goToSignIn');
var signUpButton = document.querySelector('#goToSignUp');
var logOutButton = document.querySelector('#logOut');

var signInCard = document.querySelector('.login-card');
var signUpCard = document.querySelector(".sign-up-card");
var homePage = document.querySelector('#homePage');

signUpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    for(var i = 0 ; i < users.length ; i++) {
        if(users[i].email === emailInput.value){
            displayError();
            return;
        }
    }
    
    if(regex["email"].test(emailInput.value) && regex["pass"].test(passInput.value) && regex["name"].test(nameInput.value) ){
        var user ={
            name: nameInput.value,
            email: emailInput.value,
            password: passInput.value
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        displaySuccess();
        formReset();
        signInCard.classList.remove("d-none");
        signUpCard.classList.add("d-none");
        nameInput.classList.remove("is-valid");
        emailInput.classList.remove("is-valid");
        passInput.classList.remove("is-valid");
    }else{
        validInfo.classList.remove("d-none");
    }

});

function formReset(){
    nameInput.value = '';
    emailInput.value = '';
    passInput.value = '';
}

function displaySuccess(){
    successElm.innerHTML =`<span class="text-success m-3">Success</span>`;
}
function displayError(){
    successElm.innerHTML = `<span class="text-danger m-3">email already exists</span>`;
}

signInButton.addEventListener('click', function(e){
    e.preventDefault();
    signInCard.classList.remove("d-none");
    signUpCard.classList.add("d-none");
});
signUpButton.addEventListener('click', function(e){
    e.preventDefault();
    signInCard.classList.add("d-none");
    signUpCard.classList.remove("d-none");

}); 


signInform.addEventListener('submit', function(e){
    e.preventDefault();
    for(var i = 0 ; i < users.length ; i++) {
        if(users[i].email === email.value && users[i].password === pass.value){
            userName = users[i].name;
            email.value = "";
            pass.value = "";
            openHome(userName);
            return;
        }
    }

    alertLoginFun()
});

var userNameElm = document.getElementById("userName");
function openHome(name){
    signInCard.classList.add("d-none");
    homePage.classList.remove("d-none");
    userNameElm.innerText = `Welcome ${name}`;
}

function alertLoginFun(){
    alertLogin.innerHTML = `<span class="p-2 text-danger">incorrect email or password</span>`;
}

logOutButton.addEventListener("click", function(e){
    e.preventDefault();
    signInCard.classList.remove("d-none");
    homePage.classList.add("d-none");
});

function validationElm(x){
    var y = regex[x.name].test(x.value);
    if(y){
        x.classList.add("is-valid");
        x.classList.remove("is-invalid");
    }else{
        x.classList.add("is-invalid");
        x.classList.remove("is-valid");
    }
}

validInfo.addEventListener("click", function(){
    validInfo.classList.add("d-none");
})

closeValidInfo.addEventListener("click", function(){
    validInfo.classList.add("d-none");
});