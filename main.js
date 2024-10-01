let allUsers = [];

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            allUsers = data;
            populateFilters(allUsers);
            displayUsers(allUsers);
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
}

function populateFilters(users) {
    const nameFilter = document.getElementById('filter-name');
    const emailFilter = document.getElementById('filter-email');
    const cityFilter = document.getElementById('filter-city');

    const names = [...new Set(users.map(user => user.name))];
    const emails = [...new Set(users.map(user => user.email))];
    const cities = [...new Set(users.map(user => user.address.city))];

    populateSelect(nameFilter, names);
    populateSelect(emailFilter, emails);
    populateSelect(cityFilter, cities);
}

function populateSelect(selectElement, options) {
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}

function displayUsers(users) {
    const cardsContainer = document.getElementById('cards-container');
    const cardTemplate = document.querySelector('.card');
    cardsContainer.innerHTML = '';

    users.forEach(user => {
        const userCard = cardTemplate.cloneNode(true);
        userCard.style.display = 'block';
        userCard.querySelector('.first_name').textContent = user.name;
        userCard.querySelector('.username').textContent = user.username;
        userCard.querySelector('.mail').textContent = user.email;
        userCard.querySelector('.email a').setAttribute('href', `mailto:${user.email}`);
        userCard.querySelector('.detalis').textContent = user.address.city;
        cardsContainer.appendChild(userCard);
    });
}

function filterUsers() {
    const filterName = document.getElementById('filter-name').value;
    const filterEmail = document.getElementById('filter-email').value;
    const filterCity = document.getElementById('filter-city').value;

    const filteredUsers = allUsers.filter(user => {
        const nameMatch = filterName === '' || user.name === filterName;
        const emailMatch = filterEmail === '' || user.email === filterEmail;
        const cityMatch = filterCity === '' || user.address.city === filterCity;
        return nameMatch && emailMatch && cityMatch;
    });

    displayUsers(filteredUsers);
}

document.getElementById('filter-name').addEventListener('change', filterUsers);
document.getElementById('filter-email').addEventListener('change', filterUsers);
document.getElementById('filter-city').addEventListener('change', filterUsers);

document.getElementById('reset-filters').addEventListener('click', () => {
    document.getElementById('filter-name').value = '';
    document.getElementById('filter-email').value = '';
    document.getElementById('filter-city').value = '';
    displayUsers(allUsers);
});

document.addEventListener('DOMContentLoaded', fetchUsers);

document.querySelector('.burger-menu').addEventListener('click', function() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
    this.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', fetchUsers);

let modal = document.getElementById('user-modal');
let closeModalBtn = document.querySelector('.close-btn');

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            allUsers = data;
            populateFilters(allUsers);
            displayUsers(allUsers);
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
}

function displayUsers(users) {
    const cardsContainer = document.getElementById('cards-container');
    const cardTemplate = document.querySelector('.card');
    cardsContainer.innerHTML = '';

    users.forEach(user => {
        const userCard = cardTemplate.cloneNode(true);
        userCard.style.display = 'block';
        userCard.querySelector('.first_name').textContent = user.name;
        userCard.querySelector('.username').textContent = user.username;
        userCard.querySelector('.mail').textContent = user.email;
        userCard.querySelector('.email a').setAttribute('href', `mailto:${user.email}`);
        userCard.querySelector('.detalis').textContent = user.address.city;
        
        userCard.querySelector('.more').addEventListener('click', () => {
            showUserDetails(user);
        });

        cardsContainer.appendChild(userCard);
    });
}

function showUserDetails(user) {
    document.getElementById('modal-name').textContent = user.name;
    document.getElementById('modal-username').textContent = user.username;
    document.getElementById('modal-email').textContent = user.email;
    document.getElementById('modal-address').textContent = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
    document.getElementById('modal-phone').textContent = user.phone;
    document.getElementById('modal-website').textContent = user.website;
    document.getElementById('modal-company').textContent = user.company.name;

    modal.style.display = 'block';
}

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', event => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
