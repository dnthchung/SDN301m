"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = exports.TodoMessage = exports.UserMessage = void 0;
exports.UserMessage = {
    FULL_NAME_IS_REQUIRED: "Full name is required",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    EMAIL_IS_REQUIRED: "Email is required",
    EMAIL_IS_INVALID: "Email is invalid",
    PASSWORD_IS_REQUIRED: "Password is required",
    PASSWORD_MUST_BE_A_STRING: "Password must be a string",
    PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: "Password length must be from 6 to 50",
    NEW_PASSWORD_IS_REQUIRED: "New password is required",
    NEW_PASSWORD_MUST_BE_A_STRING: "New password must be a string",
    NEW_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: "New password length must be from 6 to 50",
    CONFIRM_PASSWORD_IS_REQUIRED: "Confirm password is required",
    CONFIRM_PASSWORD_MUST_BE_A_STRING: "Confirm password must be a string",
    CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: "Confirm password length must be from 6 to 50",
    FIRST_NAME_IS_REQUIRED: "First name is required",
    FIRST_NAME_LENGTH_MUST_BE_FROM_6_TO_50: "First name length must be from 6 to 50",
    LAST_NAME_IS_REQUIRED: "Last name is required",
    LAST_NAME_LENGTH_MUST_BE_FROM_6_TO_50: "Last name length must be from 6 to 50",
    PHONE_NUMBER_INVALID: "Phone number is invalid",
    DATE_OF_BIRTH_INVALID: "Date of birth is invalid",
    USER_ID_IS_REQUIRED: "User ID is required",
};
exports.TodoMessage = {
    TITLE_IS_REQUIRED: "Title is required",
    TITLE_LENGTH_MUST_BE_FROM_3_TO_50: "Title length must be from 3 to 50",
};
exports.ErrorMessage = {
    BAD_REQUEST: "Bad Request",
    UNAUTHORIZED: "Unauthorized",
};
