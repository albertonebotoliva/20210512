const email = value => {
    value = value.trim();
    const regExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!regExp.test(value)) return 'EMAIL: Please enter a valid email';;
    if (value === '') return 'EMAIL: Email is required';

    return null;
}

const name = value => {
    value = value.trim();

    if (value === '') return 'NAME: The name is required';
    if (/[^a-zA-Z -]/.test(value)) return 'NAME: Invalid characters';
    if (value.length < 3) return 'NAME: The name needs to be at least three characters';

    return null;
}

const consents = consents => {
    if (Object.values(consents).filter(consent => consent.checked === true).length <= 0)
        return 'CONSENT: You need to select at least one consent';

    return null;
}

export const validation = (event, data) => {
    const errors = [];

    name(data.name) && errors.push(name(data.name));
    email(data.email) && errors.push(email(data.email));
    consents(data.consents) && errors.push(consents(data.consents));

    return errors;
}
