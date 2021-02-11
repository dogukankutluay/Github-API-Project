///element seçme

const githubForm = document.getElementById("github-form");
const nameİnput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const lastSearch = document.getElementById("lastSearch");
const cardBody = document.querySelectorAll(".card-body")[0];
const profile = document.getElementById("profile");

///eventleri bağlama
const ui = new Ui();
const github = new Github();
eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);
    lastUsers.addEventListener("click", ui.clearItem);
    lastSearch.addEventListener("click", addDiv);
}


function getData(e) {
    let usernametrim = nameİnput.value;

    github.getGithubData(usernametrim)
        .then(response => {
            if (response.user.message === "Not Found") {
                ui.showAlert("danger", "Kullanıcı bulunamadı", cardBody);
            }
            else {
                ui.addSearchedUserId(usernametrim);
                Storage.addSearchedUsersFromStorage(usernametrim);

                ui.showAlert("success", "Kullanıcı bulundu", cardBody);
                ui.showDiv(response.user);
                ui.showRepo(response.repo);
                console.log(response.repo);
            }
        })
        .catch(err => {
            ui.showAlert("danger", `${err}`, cardBody)
        });
    ui.clearInput();
    e.preventDefault();
}
function addDiv(e) {
    if (e.target.className === "userID") {
        profile.innerHTML = "";
        let selected = e.target.parentElement.textContent.trim();
        github.getGithubData(selected)
            .then(user => { ui.showDiv(user.user); ui.showRepo(user.repo); })
            .catch(eror => ui.showAlert("danger", "Hata", cardBody))
    }
    e.preventDefault();
}
function clearAllSearched() {
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchedFromUı();
}

function getAllSearched() {
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";

    users.forEach(element => {
        result += `
            <a href="#">
                <li class="list-group-item" >${element}
                    <a href="#" class="delete-item" >
                        <i class="fa fa-remove" style="position:relative;float:right"></i>
                    </a>
                </li>
            </a>
        `;

    });
    lastUsers.innerHTML = result;
}


