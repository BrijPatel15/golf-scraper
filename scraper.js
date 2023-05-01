const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeGolfCourse(url) {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const data = {
      name: $('.course-name').text(),
      address: $('.course-address').text(),
      availability: []
    };
    $('.tee-times li').each((i, elem) => {
      const time = $(elem).find('.time').text();
      const price = $(elem).find('.price').text();
      data.availability.push({ time, price });
    });
    return data;
  }
  
const data = await scrapeGolfCourse('https://turnberry-golf-club.book.teeitup.com/?course=4886&date=2023-04-29');
console.log(data);

fs.writeFile('data.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Data saved to file!');
  });