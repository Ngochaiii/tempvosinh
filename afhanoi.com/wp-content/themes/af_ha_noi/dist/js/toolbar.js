let shToolbar = document.querySelector('#shToolbar');
let toolbar = document.querySelector('#toolbar');
let showTollbar = document.querySelector('.showTollbar');

shToolbar.onclick = () => {
    shToolbarFunction()
}

showTollbar.onclick = () => {
    shToolbarFunction()
}

let shToolbarFunction = () => {
    search_content.classList.add('hidden')
    toolbar.style.display = toolbar.style.display == 'none' ? '' : 'none';
    showTollbar.style.display = showTollbar.style.display == 'none' ? '' : 'none';
}

// search

let search_content = document.querySelector('#search-content');
let icon_search = document.querySelector('#icon_search');
let hiddenSearch = document.querySelector('#hiddenSearch');

icon_search.onclick = () => {
    document.body.classList.toggle("remove-scrolling");
    search_content.classList.toggle('hidden')
}

hiddenSearch.onclick = () => {
    document.body.classList.toggle("remove-scrolling");
    search_content.classList.toggle('hidden')
}
