let btnShowIcon_bar = document.querySelector('.btnShowIcon-bar')
let icon_bar = document.querySelector('#icon-bar')
btnShowIcon_bar.onclick = () => {
    icon_bar.classList.toggle("block");
    icon_bar.classList.toggle("hidden");
}
function myFunction(x) {
    x.classList.toggle("change");
}