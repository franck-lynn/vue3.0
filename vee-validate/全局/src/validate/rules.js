const reuqired = (value) => {
    if (!value || !value.length) {
        console.log("走这里")
        return 'This field is required';
    }
    return true;
}
const email = value => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return true;
    }
    // Check if email
    if (!/[A-Za-z0-9._%+-]+@[A-Z0-9.-]+\.[A-Za-z]{2,4}/.test(value)) {
        console.log("也走这里")
        return 'This field must be a valid email';
    }
    return true;
}

const minLength = (value, [limit]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
        return true;
    }
    if (value.length < limit) {
        console.log("还走了这里")
        return `This field must be at least ${limit} characters`;
    }
    return true;
}
const confirmed = (value, [target], ctx) => {
    //! 是 form, 不是 from
    if (value === ctx.form[target]) {
        return true
    }
    return '密码不匹配'
}

export { reuqired, email, minLength, confirmed }