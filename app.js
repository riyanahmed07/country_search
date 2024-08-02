document.querySelector('#submitBtn').addEventListener('click', getCountry);

function getCountry() {
    const inputValue = document.querySelector('#input').value.trim();

    // Clear previous data
    document.querySelector('#flag').src = '';
    document.querySelector('#name').innerHTML = '';
    document.querySelector('#capital').innerHTML = '';
    document.querySelector('#continent').innerHTML = '';
    document.querySelector('#population').innerHTML = '';
    document.querySelector('#currency').innerHTML = '';
    document.querySelector('#border').innerHTML = '';

    if (!inputValue) {
        alert('Please enter a country name.');
        return;
    }

    // Fetch country data from the API
    fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Country not found');
            }
            return res.json();
        })
        .then((data) => {
            if (data.length === 0) {
                throw new Error('No data available');
            }

            const country = data[0];

            document.querySelector('#flag').src = country.flags.png || '';
            document.querySelector('#name').innerHTML = country.name.common || 'N/A';
            document.querySelector('#capital').innerHTML = country.capital ? country.capital[0] : 'N/A';
            document.querySelector('#continent').innerHTML = country.continents ? country.continents[0] : 'N/A';
            document.querySelector('#population').innerHTML = country.population || 'N/A';
            document.querySelector('#currency').innerHTML = country.currencies ? Object.values(country.currencies)[0].name : 'N/A';

            // Handling borders
            let borders = [];
            if (country.borders) {
                country.borders.forEach((borderCountry) => {
                    borders.push(`<a href="#" class="btn btn-outline-danger">${borderCountry}</a>`);
                });
            }
            document.querySelector('#border').innerHTML = borders.join(' ');

            // Show the country info card
            document.querySelector('.card').classList.remove('hidden');
        })
        .catch((error) => {
            console.error('Error:', error);
            document.querySelector('#flag').src = '';
            document.querySelector('#name').innerHTML = 'Error: ' + error.message;
            document.querySelector('#capital').innerHTML = '';
            document.querySelector('#continent').innerHTML = '';
            document.querySelector('#population').innerHTML = '';
            document.querySelector('#currency').innerHTML = '';
            document.querySelector('#border').innerHTML = '';

            // Show the country info card even if there's an error
            document.querySelector('.card').classList.remove('hidden');
        });
}
