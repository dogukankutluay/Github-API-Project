class Ui {
    constructor() {
        this.profileDiv = document.getElementById("profile");
        this.repoDiv = document.getElementById("repos");
        this.lastUsers = document.getElementById("last-users");
        this.inputField = document.getElementById("githubname");
        this.alert = document.getElementsByClassName("card-body");
    }

    clearInput() {
        this.inputField.value = "";
    }
    showDiv(user) {
        this.profileDiv.innerHTML = `        
        <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-4">
            <a href="${user.html_url}" target = "_blank">
             <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
             <hr>
             <div id="fullName"><strong> ${user.name}</strong></div>
             <hr>
             <div id="bio">${user.bio}</div>
            </div>
          <div class="col-md-8">
                <button class="btn btn-secondary">
                      Takipçi  <span class="badge badge-light">${user.followers}</span>
                </button>
                <button class="btn btn-info">
                     Takip Edilen  <span class="badge badge-light">${user.following}</span>
                  </button>
                <button class="btn btn-danger">
                    Repolar  <span class="badge badge-light">${user.public_repos}</span>
                </button>
                <hr>
                <li class="list-group">
                    <li class="list-group-item borderzero">
                        <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                        
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>
                        
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/mail.png" width="30px"> <span id="company">${user.email}</span>
                        
                    </li>
                </div>               
          </div>
    </div>
        `;

    }
    showRepo(user) {
        this.repoDiv.innerHTML = "";
        user.forEach(element => {
            this.repoDiv.innerHTML += `
            <div class="mb-2 card-body">
                <div class="row">
                    <div class="col-md-2"> 
                        <a href="${element.html_url}" target = "_blank" id = "repoName">${element.name}</a>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-secondary">
                            Starlar  <span class="badge badge-light" id="repoStar">${element.stargazers_count}</span>
                        </button>

                        <button class="btn btn-info">
                            Forklar  <span class="badge badge-light" id ="repoFork">${element.forks_count}</span>
                        </button>    
                        <button class="btn btn-danger">
                            Detay  <span class="badge badge-light" id ="repoDetay"></span>
                        </button>      
                    </div>
                </div>
            </div>
            `;
        });
    }
    showAlert(alert, mesaage, classs) {
        const div = document.createElement("div");
        div.className = `alert alert-${alert}`;
        div.textContent = `${mesaage}`;
        classs.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 2000);
    }
    addSearchedUserId(user) {
        let users = Storage.getSearchedUsersFromStorage();
        if (users.indexOf(user) === -1) {
            lastUsers.innerHTML += `
            <a href="" class="userID">
                <li class="list-group-item" >${user}
                    <a href="#" class="delete-item" >
                        <i class="fa fa-remove" style="position:relative;float:right"></i>
                    </a>
                </li>
            </a>
            `;
        }
        localStorage.setItem("search", JSON.stringify(users));
    }
    clearAllSearchedFromUı() {
        while (this.lastUsers.firstElementChild !== null) {

            this.lastUsers.removeChild(this.lastUsers.firstElementChild);
        }
    }
    clearItem(e) {
        if (e.target.className === "fa fa-remove") {
            var selected = e.target.parentElement.parentElement.textContent.trim();
            e.target.parentElement.parentElement.remove();
            Storage.removeStorageItem(selected);

        }
    }


}