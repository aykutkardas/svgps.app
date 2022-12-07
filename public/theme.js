const localTheme= localStorage.getItem('theme');
const themeValue = JSON.parse(localTheme);

if(themeValue){
  document.querySelector('html').dataset.theme=themeValue.value;
}