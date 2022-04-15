const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_PASSWORD = 'PASSWORD';

const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
const VALIDATOR_MINLENGTH = val => ({
    type: VALIDATOR_TYPE_MINLENGTH,
    val: val
});
const VALIDATOR_MAXLENGTH = val => ({
    type: VALIDATOR_TYPE_MAXLENGTH,
    val: val
});
const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
const VALIDATOR_PASSWORD = () => ({ type: VALIDATOR_TYPE_PASSWORD });

const validate = (value, validators) => {

    let isValid = true;
    let errorText = [];
    for (const validator of validators) {
        if (validator.type === VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0;
        }
        if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
            isValid = isValid && value.trim().length >= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
            isValid = isValid && value.trim().length <= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_EMAIL) {
            const regularExpression = /^\S+@\S+\.\S+$/;
            isValid = isValid && regularExpression.test(value);
        }
        if (validator.type === VALIDATOR_TYPE_PASSWORD) {
            //check if include specail character
            const regularExpression = /(?=.*[!@#$%^&*])/;
            isValid = isValid && regularExpression.test(value);
        }
    }
    return isValid;
};

// For testing purpose( run node index.js in terminal)

console.log(validate('jaricboban@yahoo.com', [VALIDATOR_EMAIL(), VALIDATOR_MINLENGTH(5)]));
console.log(validate('jaricboban', [VALIDATOR_EMAIL()]));
console.log(validate('', [VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(15)]));
console.log(validate('boban!!!', [VALIDATOR_PASSWORD()]));
console.log(validate('boban', [VALIDATOR_PASSWORD()]));
