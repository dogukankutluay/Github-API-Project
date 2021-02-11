class Storage {

    static getSearchedUsersFromStorage() {
        //tüm kullanıcıları getirir
        let users;
        if (localStorage.getItem("search") === null) {
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("search"));
        }
        return users;
    }
    static addSearchedUsersFromStorage(user) {
        let users = this.getSearchedUsersFromStorage();
        if (users.indexOf(user) === -1) {
            users.push(user);
        }

        localStorage.setItem("search", JSON.stringify(users));
    }
    static clearAllSearchedUsersFromStorage() {
        localStorage.removeItem("search");
    }
    static removeStorageItem(user) {
        let users = this.getSearchedUsersFromStorage();
        users.forEach(function (element, index) {
            if (element === user) {
                users.splice(index, 1);
                const alert1 = document.querySelector(".card-body");
                const div = document.createElement("div");
                div.className = `alert alert-success`;
                div.textContent = `Arama silindi`;
                alert1.appendChild(div);
                setTimeout(() => {
                    div.remove();
                }, 2000);
            }
        });

        localStorage.setItem("search", JSON.stringify(users));
    }

}