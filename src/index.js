// index.js

// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const ramenName = document.querySelector('.name');
  const ramenRestaurant = document.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  ramenName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;

  document.getElementById('ramen-detail').dataset.id = ramen.id;
};


const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    const newRamen = {
      name,
      restaurant,
      image,
      rating,
      comment,
    };

    // POST request to add the new ramen
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newRamen),
    })
      .then((response) => response.json())
      .then((ramen) => {
        // Append the new ramen image to the ramen-menu div
        const ramenMenu = document.getElementById('ramen-menu');
        const ramenImg = document.createElement('img');
        ramenImg.src = ramen.image;
        ramenImg.alt = ramen.name;
        ramenImg.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(ramenImg);

        // Optionally, display the newly added ramen in the detail section
        handleClick(ramen);

        // Reset the form fields
        form.reset();
      })
      .catch((error) => console.error('Error:', error));
  });
};


const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramens.forEach((ramen) => {
        const ramenImg = document.createElement('img');
        ramenImg.src = ramen.image;
        ramenImg.alt = ramen.name;
        ramenImg.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(ramenImg);
      });

      // Optionally, display the first ramen by default
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    })
    .catch((error) => console.error('Error fetching ramen data:', error));
};

const main = () => {
  displayRamens();  
  addSubmitListener();
};


main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
