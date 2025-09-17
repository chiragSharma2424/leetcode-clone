import validator from 'validator';

export const validate = (data) => {
    const mandatoryField = ['firstName', 'emailId', 'passwprd'];
    const isAllowed = mandatoryField.every((k) => {
        Object.keys(data).includes(k);
    });
}