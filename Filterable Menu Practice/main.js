const buttons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.getAttribute("data-category");
      
      menuItems.forEach((item) => {
        if (category === 'all' || category === item.getAttribute("data-category")) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
      });
    });
});


/*
if i click on the button with the data-category attribute set to "all", all menu items will be displayed. If I click on a button with a specific category, only the menu items that match that category will be displayed, while the others will be hidden.
 */
