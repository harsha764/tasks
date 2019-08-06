export function backendActions(routeurl = '', methodType , data = null) {
    var baseurl = 'http://localhost:80/react-template-backend/backend_code';
    var url = baseurl + routeurl;
    if(methodType === 'POST'){
        return fetch(url, {
            method: methodType, 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        })
        .then(response => response.json());  
    }else{
        return fetch(url, {
            method: methodType, 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json());
    }
    

    }