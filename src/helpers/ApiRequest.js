export function backendActions(routeurl = '', methodType , data = {}) {
    var baseurl = 'http://localhost:80/react-template-backend/backend_code';
    var url = baseurl + routeurl;
    if(methodType === 'POST'){
        return fetch(url, {
            method: methodType, 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses JSON response into native JavaScript objects 
    }else{
        return fetch(url, {
            method: methodType, 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => response.json()); // parses JSON response into native JavaScript objects 
    }
    

    }