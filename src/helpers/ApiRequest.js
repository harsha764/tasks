export function postData(url = '', data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: 'POST', 
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses JSON response into native JavaScript objects 
  }