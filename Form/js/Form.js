
function filterVideos() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  const video1Items=document.querySelectorAll('.video1');
  const video1hindiItems=document.querySelectorAll('.video1hindi');
  const englishRadio = document.getElementById("englishRadio");
  const hindiRadio = document.getElementById("hindiRadio");
  if(englishRadio.checked){
    video1Items.forEach(item => item.style.display = "block");
    video1hindiItems.forEach(item => item.style.display = "none");
  }
  else{
    video1Items.forEach(item => item.style.display = "none");
  video1hindiItems.forEach(item => item.style.display = "block");
  }
  const videoItems = englishRadio.checked ? video1Items : video1hindiItems;
  videoItems.forEach(function(video) {
      const videoText = video.textContent.toLowerCase();  

      
      if (videoText.includes(searchQuery)) {
          video.style.display = 'block';
      } else {
          video.style.display = 'none';
      }
  });


}


function radioFunction() {
  const englishRadio = document.getElementById("englishRadio");
  const hindiRadio = document.getElementById("hindiRadio");
  const video1Items = document.querySelectorAll(".video1");
  const video1hindiItems = document.querySelectorAll(".video1hindi");

  
  englishRadio.addEventListener("change", function() {
      if (englishRadio.checked) {
      
          video1Items.forEach(item => item.style.display = "block");
          video1hindiItems.forEach(item => item.style.display = "none");
      }
  });

  
  hindiRadio.addEventListener("change", function() {
      if (hindiRadio.checked) {
      
          video1Items.forEach(item => item.style.display = "none");
          video1hindiItems.forEach(item => item.style.display = "block");
      }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  radioFunction();  
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', filterVideos);  
});
