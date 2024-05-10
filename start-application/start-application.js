console.log('dadada')


var prevL = document.getElementById('prevLink')
prevL.addEventListener('click', ()=>{

})
var nextL = document.getElementById('nextLink')
nextL.addEventListener('click', ()=>{
    console.log('bobobo')
})

document.getElementById('searchInput').addEventListener('input', function() {
    // Get the search query from the input field
    var query = this.value.toLowerCase();

    // Get the container where search results will be displayed
    var searchResultsContainer = document.getElementById('searchResults');

    // Clear previous search results
    searchResultsContainer.innerHTML = '';

    // Simulated data (replace with actual search logic)
    var data = [
        { title: 'Result 1', content: 'Description of result 1.' },
        { title: 'Result 2', content: 'Description of result 2.' },
        { title: 'Result 3', content: 'Description of result 3.' }
    ];

    // Filter data based on search query
    var filteredData = data.filter(function(item) {
        return item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query);
    });

    // Display search results
    filteredData.forEach(function(item) {
        var resultItem = document.createElement('div');
        resultItem.innerHTML = `<h3>${item.title}</h3><p>${item.content}</p>`;
        searchResultsContainer.appendChild(resultItem);
    });
});
