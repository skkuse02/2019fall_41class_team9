import React from 'react';

const isEmail = (email : string) => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
}

const isPassword = (password : string) => {
    if(password.length < 6 || password.length > 16)
        return false;
    return true;
}

const isMatchPassword = (password : string, password2 : string) => {
    if(password != password2)
        return false;
    return true;
}

export {isEmail, isPassword, isMatchPassword};

