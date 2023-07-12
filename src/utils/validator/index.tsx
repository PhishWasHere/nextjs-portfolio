
export default function Validator (name: any, email: any, phoneNumber: any, message: any) {
    try {
        const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
        const numRegex = /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/;
         //num regex doesnt accept shortened 04 num. for eg. 412345678  

        const fields = [ //need to fix err displays
            { name: name, value: name, err: 'Name (Field Required)', stock: 'Name' },
            { name: email, value: email, err: 'Email (Field Required)', stock: 'Email' },
            { value: phoneNumber, err: 'Contact Number (Field Required)', stock: 'Contact Number' },
            { value: message, err: 'Message (Field Required)', stock: 'Message' },
        ]
    
        const reg = [
            { reg: emailRegex , name: email, value: email, err: 'Email (please enter a valid email)' },
            { reg: numRegex, value: phoneNumber, err: 'Contact Number (please enter a valid number)' },
        ]

        let isValid = true;

        fields.forEach((field) => { //resets fields
        field.value.classList.remove('err');
        field.value.textContent = field.stock;
    
        if (!field.name) { //checks if fields are empty
            field.value.classList.add('err');
            field.value.textContent = field.err;
            isValid = false;
        }
        })
  
        reg.forEach((reg) => {
            if (!reg.name.match(reg.reg)) { //checks if fields are valid
            reg.value.classList.add('err');
            reg.value.textContent = reg.err;
            isValid = false;
        }
        })

        return isValid;

    } catch (err) {
        console.log(err);
    }
}