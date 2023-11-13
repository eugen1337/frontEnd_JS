export default function() {
    return `
    <style>
    .wrapper {
        margin: 0 auto;
        position: relative;
        max-width: 430px;
        width: 100%;
        background: #cca3ff;
        padding: 34px;
        border-radius: 6px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
    .wrapper h2 {
        position: relative;
        font-size: 22px;
        font-weight: 600;
        color: #333;
        text-align: center;
    }
    .wrapper form {
        margin-top: 30px;
    }
    .wrapper form .input-box {
        height: 52px;
        margin: 18px 0;
    }
    form .input-box input {
        height: 100%;
        width: 100%;
        outline: none;
        padding: 0 15px;
        font-size: 17px;
        font-weight: 400;
        color: #333;
        border: 1.5px solid #c7bebe;
        border-bottom-width: 2.5px;
        border-radius: 6px;
        transition: all 0.3s ease;
    }
    .input-box input:focus,
    .input-box input:valid {
        border-color: #4070f4;
    }
    form .policy {
        display: flex;
        align-items: center;
    }
    form h3 {
        color: #707070;
        font-size: 14px;
        font-weight: 500;
        margin-left: 10px;
    }
    .input-box.button input {
        color: #fff;
        letter-spacing: 1px;
        border: none;
        background: #4070f4;
        cursor: pointer;
    }
    .input-box.button input:hover {
        background: #0e4bf1;
    }
    .but-box {
        text-align:center;
        padding: 4px;
    }
    </style>
    
    `;
}