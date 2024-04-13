document.addEventListener('DOMContentLoaded', function() {
    const triggers = document.querySelectorAll('.trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Load map from JSON data
    fetch('map-data.json')
        .then(response => response.json())
        .then(data => {
            const mapElement = document.getElementById('map');
            mapElement.innerHTML = `<iframe src="${data.mapSrc}" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>`;
        })
        .catch(error => console.error('Error loading map data:', error));

    // Load grooming information from XML
    fetch('grooming-data.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'text/xml');
            const groomingDiv = document.getElementById('grooming');
            const groomingInfo = xml.querySelector('grooming').innerHTML;
            groomingDiv.innerHTML = groomingInfo;
        })
        .catch(error => console.error('Error loading grooming data:', error));
});
