const validateName = (name) => /^[а-яА-Яa-zA-Z._\s-]{2,30}$/.test(name);
const validateEmail = (email) =>
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

export const checkValidateName = (name, inputName) => {
  let nameErrors = [];
  if (name === '') {
    nameErrors = [
      {
        inputName: inputName,
        message: 'Please enter your first name',
      },
    ];
  } else if (name.length < 2) {
    nameErrors = [{ inputName: inputName, message: 'Too short' }];
  } else if (name.length > 30) {
    nameErrors = [{ inputName: inputName, message: 'Too long' }];
  } else if (!validateName(name)) {
    nameErrors = [{ inputName: inputName, message: 'Enter a valid first name' }];
  } else if (name.match(/^\s+$/) !== null) {
    nameErrors = [{ inputName: inputName, message: 'Name has blank spaces' }];
  } else {
    nameErrors = [];
  }
  return nameErrors;
};
export const checkValidateSurname = (surname) => {
  let familyErrors = [];
  if (surname === '') {
    familyErrors = [{ type: 'empty', message: 'Please enter your last name' }];
  } else if (surname.length < 2) {
    familyErrors = [{ type: 'short', message: 'Too short' }];
  } else if (surname.length > 30) {
    familyErrors = [{ type: 'long', message: 'Too long' }];
  } else if (!validateName(surname)) {
    familyErrors = [{ type: 'invalid', message: 'Enter a valid last name' }];
  } else {
    familyErrors = [];
  }
  return familyErrors;
};

export const checkValidateEmail = (email) => {
  let emailErrors = [];
  if (email === '') {
    emailErrors = [{ type: 'empty', message: 'Please enter your email' }];
  } else if (!validateEmail(email)) {
    emailErrors = [{ type: 'invalid', message: 'Enter a valid email' }];
  } else {
    emailErrors = [];
  }
  return emailErrors;
};
