export default function Validator(name: string, email: string, phoneNumber: string, message: string) {
    try {
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
      const numRegex = /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/;
  
      const fields = [
        { value: name, err: 'Name (Field Required)', stock: 'Name' },
        { value: email, err: 'Email (Field Required)', stock: 'Email' },
        { value: phoneNumber, err: 'Contact Number (Field Required)', stock: 'Contact Number' },
        { value: message, err: 'Message (Field Required)', stock: 'Message' },
      ];
  
      const regs = [
        { reg: emailRegex, value: email, err: 'Email (please enter a valid email)' },
        { reg: numRegex, value: phoneNumber, err: 'Contact Number (please enter a valid number)' },
      ];
  
      let isValid = true;
  
      fields.forEach((field) => {
        if (!field.value) {
          field.value.classList.add('err');
          field.value.textContent = field.err;
          isValid = false;
        }
      });
  
      regs.forEach((reg) => {
        if (!reg.value.match(reg.reg)) {
          reg.value.classList.add('err');
          reg.value.textContent = reg.err;
          isValid = false;
        }
      });
  
      return isValid;
    } catch (err) {
      console.log(err);
    }
  }
  