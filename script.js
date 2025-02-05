document.addEventListener("DOMContentLoaded", function () {
  const birthDaySelect = document.getElementById("birth-day");

  // Populate days (1-31)
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i < 10 ? `0${i}` : i;
    option.textContent = i;
    birthDaySelect.appendChild(option);
  }

  // Back to Top Button
  window.onscroll = function () {
    const backToTopButton = document.getElementById('back-to-top');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  };

  document.getElementById('back-to-top').addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});

document.getElementById('submit-btn').addEventListener('click', function (e) {
  e.preventDefault();

  // Show loading spinner
  const loadingSpinner = document.getElementById('loading-spinner');
  loadingSpinner.style.display = 'block';

  // Clear previous results
  const discountsList = document.getElementById('discounts-list');
  discountsList.innerHTML = '';

  // Simulate a delay for filtering results
  setTimeout(() => {
    // Hide loading spinner
    loadingSpinner.style.display = 'none';

    // Get user selections
    const selectedMonth = document.getElementById('birth-month').value;
    const selectedDay = document.getElementById('birth-day').value;
    const selectedCategory = document.getElementById('categories').value;
    const selectedRegion = document.getElementById('region').value;

    // Simulated discounts database
    const discounts = [
      { brand: 'Toverland Park', description: 'Free admission on your birthday.', category: 'games', region: 'de', link: 'https://www.toverland.com' },
      { brand: 'Holiday Park', description: 'Free entry for kids up to 11 years old.', category: 'games', region: 'de', link: 'https://www.holidaypark.de' },
      { brand: 'Nike', description: '25% off with membership.', category: 'shopping', region: 'de', link: 'https://www.nike.com' },
      { brand: 'H&M', description: '25% off one item on your birthday.', category: 'shopping', region: 'de', link: 'https://www.hm.com' },
      { brand: 'Adidas', description: '20% off during your birthday month.', category: 'shopping', region: 'de', link: 'https://www.adidas.com' },
      { brand: 'ASOS', description: '10% off on your birthday.', category: 'shopping', region: 'de', link: 'https://www.asos.com' },
      { brand: 'Sephora', description: '20% voucher code valid for seven days.', category: 'shopping', region: 'de', link: 'https://www.sephora.com' },
      { brand: 'Otto.de', description: '10€ extra through OTTO UP loyalty program.', category: 'shopping', region: 'de', link: 'https://www.otto.de' },
      { brand: 'Cinema City', description: 'Free popcorn on your birthday.', category: 'activities', region: 'de', link: 'https://www.cinemacity.de' },
      { brand: 'Apple', description: '10% off accessories on your birthday.', category: 'electronics', region: 'de', link: 'https://www.apple.com' },
      { brand: 'Local Gym', description: 'Free day pass on your birthday.', category: 'other', region: 'de', link: 'https://www.localgym.com' },
      { brand: 'McDonald\'s', description: 'Children can receive a small freebie if they are part of the "Junior Club." However, there are no widespread birthday offers for adults.', category: 'food', region: 'de', link: '' },
      { brand: 'Subway', description: 'You may receive a free cookie on your birthday, though this is not universally guaranteed.', category: 'food', region: 'de', link: '' },
      { brand: 'Burger King', description: 'Generally, these chains do not have specific birthday promotions. You might have some luck asking if they offer anything for your birthday, but it varies by location and is not a formal policy.', category: 'food', region: 'de', link: '' },
      { brand: 'KFC', description: 'Generally, these chains do not have specific birthday promotions. You might have some luck asking if they offer anything for your birthday, but it varies by location and is not a formal policy.', category: 'food', region: 'de', link: '' },
      { brand: 'EDEKA', description: 'A free Milka chocolate bar with the EDEKA APP (availability depends on region and status, can be redeemed multiple times by changing regions).', category: 'food', region: 'de', link: '' },
      { brand: 'Lindt', description: 'A small pack of Lindor chocolates (requires registration).', category: 'food', region: 'de', link: '' },
      { brand: 'XXXLutz', description: 'One of three meals free (requires registration).', category: 'food', region: 'de', link: '' },
      { brand: 'Alnatura', description: 'A birthday greeting with a small surprise.', category: 'food', region: 'de', link: '' },
      { brand: 'Hard Rock Cafe', description: 'Offers a free dessert.', category: 'food', region: 'de', link: '' },
      { brand: 'mömax', description: 'A free piece of cake (requires registration).', category: 'food', region: 'de', link: '' },
      { brand: 'Saurierpark', description: 'Freier Eintritt statt 16€.', category: 'activities', region: 'de', link: '' },
      { brand: 'BELANTIS', description: 'Freier Eintritt statt 44,90€.', category: 'activities', region: 'de', link: '' },
      { brand: 'Freizeitpark Plohn', description: 'Freier Eintritt statt 38€.', category: 'activities', region: 'de', link: '' },
      { brand: 'Madame Tussauds', description: 'Freier Eintritt statt 25€.', category: 'activities', region: 'de', link: '' },
      { brand: 'SEA LIFE', description: 'Freier Eintritt statt 18€.', category: 'activities', region: 'de', link: '' },
      { brand: 'Reederei Riedel', description: 'Freifahrt statt 19€.', category: 'activities', region: 'de', link: '' },
      { brand: 'Berlin Cityschiffsfahrten', description: '1 von 4 Fahrten umsonst.', category: 'activities', region: 'de', link: '' },
      { brand: 'Filmpark Babelsberg', description: 'Freier Eintritt statt 23€.', category: 'activities', region: 'de', link: '' }
    ];

    // Filter discounts based on selected category and region
    const filteredDiscounts = discounts.filter(discount => {
      const categoryMatch = selectedCategory !== 'all' ? discount.category === selectedCategory : true; // Show all if "All" is selected
      const regionMatch = selectedRegion !== 'none' ? discount.region === selectedRegion : true;
      return categoryMatch && regionMatch;
    });

    // Check if results are found
    if (filteredDiscounts.length === 0) {
      discountsList.innerHTML = '<p class="no-results">No discounts found for the selected filters. Try adjusting your search!</p>';
      return;
    }

    // Display filtered results
    filteredDiscounts.forEach((discount, index) => {
      const resultContainer = document.createElement('div');
      resultContainer.classList.add('result-container');

      // Add fade-in animation with a delay for each result
      resultContainer.style.animationDelay = `${index * 0.1}s`; // Stagger the animations
      resultContainer.classList.add('fade-in');
    
      // Make the entire result clickable
      const resultLink = document.createElement('a');
      resultLink.href = discount.link;
      resultLink.target = '_blank'; // Open link in a new tab
      resultLink.style.textDecoration = 'none'; // Remove underline
      resultLink.style.color = 'inherit'; // Inherit text color
      resultLink.style.display = 'flex'; // Ensure the link behaves like a flex container
      resultLink.style.alignItems = 'center'; // Vertically center the content
      resultLink.style.width = '100%'; // Take full width
    
      // Category Icon
      const icon = document.createElement('img');
      icon.classList.add('category-icon');
      switch (discount.category) {
        case 'food':
          icon.src = './assets/food-01.png';
          break;
        case 'shopping':
          icon.src = './assets/shopping-01.png';
          break;
        case 'games':
          icon.src = './assets/gaming-01.png';
          break;
        case 'activities':
          icon.src = './assets/activities-01.png'; // Add an icon for activities
          break;
        case 'electronics':
          icon.src = './assets/electronics-01.png'; // Add an icon for electronics
          break;
        case 'other':
          icon.src = './assets/other-01.png'; // Add an icon for other
          break;
        default:
          icon.src = '';
      }
      icon.alt = `${discount.category} icon`;
      resultLink.appendChild(icon);
    
      // Details
      const details = document.createElement('div');
      details.classList.add('result-details');
    
      // Brand Name
      const brand = document.createElement('h3');
      brand.textContent = discount.brand;
      brand.classList.add('result-brand');
      details.appendChild(brand);
    
      // Description
      const description = document.createElement('p');
      description.textContent = discount.description;
      description.classList.add('result-description');
      details.appendChild(description);
    
      // Append details to the link
      resultLink.appendChild(details);
    
      // Append the link to the container
      resultContainer.appendChild(resultLink);
    
      // Append the container to the discounts list
      discountsList.appendChild(resultContainer);
    });
  }, 1000); // Simulate a 1-second delay
});