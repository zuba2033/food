const postData = async (url, data) => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
                'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json();
};

function deleteNotDigits(str) {
    const reg = /\D/g;
    return +str.replace(reg, '');
}

const getResource = async (url) => {

    const result = await fetch(url); 

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`); 
    }

    return await result.json();
};

export {postData, deleteNotDigits, getResource};