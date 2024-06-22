const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL of the target webpage
const url = 'http://localhost:8000/job_listings.html';

// Fetch the HTML content
axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const jobListings = [];

    $('.job-listing').each((index, element) => {
      const title = $(element).find('.title').text().trim();
      const company = $(element).find('.company').text().trim();
      const location = $(element).find('.location').text().trim();
      const description = $(element).find('.description').text().trim();

      jobListings.push({ title, company, location, description });
    });

    // Save data to a JSON file
    fs.writeFileSync('jobs.json', JSON.stringify(jobListings, null, 2));
    console.log('Job listings have been scraped and saved to jobs.json');
  })
  .catch(error => {
    console.error('Error fetching the webpage:', error);
  });
