const request = require('request');
const URL = 'https://api.thecatapi.com/v1/breeds/search/?q=';

const fetchBreedDescription = (breedName, callback) => {
  request(`${URL}${breedName}`, 'utf-8', (error, response, body) => {
    if (error) {
      callback(error, null)
    } else {
      const data = JSON.parse(body);
      if (data.length === 0) {
        callback('Requested breed is not found, please try again', null)
      } else if (response.statusCode === 404) {
        callback(data.message, null)
      } else {
        callback(null, data[0].description)
      }
    }
  })
};

module.exports = fetchBreedDescription;


// const fetchBreedDescription = (breed) => {
//   request(`${URL}${breed}`, (error, response, body) => {
//     if (error) {
//       console.log(error);
//       return;
//     }
//     const data = JSON.parse(body);
//     if (data.length === 0) {
//       console.log('Requested breed is not found, please try again');
//       return;
//     } else if (response.statusCode === 404) {
//       console.log(data.message);
//       return;
//     }
//     // console.log(data);
//     // console.log(typeof data);
//     console.log(data[0].description);
//   });
// };