import styled, { keyframes } from 'styled-components';

const waveAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    10% {
        transform: rotate(14deg);
    }
    20% {
        transform: rotate(-8deg);
    }
    30% {
        transform: rotate(14deg);
    }
    40% {
        transform: rotate(-4deg);
    }
    50% {
        transform: rotate(10deg);
    }
    60% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    input[type='text'],
    input[type='email'],
    input[type='password'] {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: none;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.5);
        color: #333;
        font-size: 16px;
        font-weight: 400;
        transition: background-color 0.3s ease;

        &:focus {
            background: linear-gradient(to right, #6a11cb, #2575fc);
            color: #fff;
            outline: none;
        }

        &::placeholder {
            color: #999;
        }
    }

    button[type='submit'] {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 10px;
        margin-top: 20px;
        border: none;
        border-radius: 5px;
        background-color: #2575fc;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            animation: ${waveAnimation} 1s ease;
        }

        &:focus {
            background-color: #6a11cb;
            outline: none;
        }

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }

    .spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        margin-left: 10px;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;
