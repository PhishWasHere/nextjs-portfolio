  
export default async function Mailer(name, email, num, text) {
    try {
      const response = await fetch('/api/send', { 
        method: 'POST',
        body: JSON.stringify({ name, email, num, text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      let mailSent = false

      if (response.ok) {
        console.log('success');
      } else {
        console.log('error');
      }
  
    } catch (err) {
      console.error(err);
    }
  }
  
    
  