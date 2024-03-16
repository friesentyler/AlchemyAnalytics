var slider = document.getElementById("price-range");
var val = document.getElementById("price-value");

val.innerHTML = slider.value;

slider.oninput = function() {
  val.innerHTML = this.value;
}

let sorter = document.getElementById("sortby");
let currentSort = 2;
let sortOptions = ["Price: Low", "Price: High", "Newest", "Oldest"];

sorter.addEventListener("click", function() {
    if(currentSort < 3) {
        currentSort++;
    } else {
        currentSort = 0;
    }
    sorter.innerHTML = sortOptions[currentSort];
    sorter.value = currentSort;
});
