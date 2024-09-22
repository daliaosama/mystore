import './contact.css'
import { useState } from 'react'
import * as yup from "yup"
import success from '/assets/icon-success-check.svg'

function Contact()
{

    const [errors, setErrors] = useState({});
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        message:'',
        
      })
      function handleSubmit(event){
       event.preventDefault()
       testValidation()
      }
      function handleChange(event)
      {
      var value=event.target.value;
      const key=event.target.name;
      setFormData({
        ...formData,
        [key]:value
      })
      setErrors({...errors,[event.target.name]:''})
      }
      const validationSechema=yup.object().shape({
        name:yup.string().required(),
        email:yup.string().email().required(),
        message:yup.string().required(),
      })
      async function testValidation(){
        try{
            await validationSechema.validate(formData, {abortEarly:false})
            setErrors({})
            setIsSubmitted(true);
        }
        catch(error){
            const validationErrors = {};
            error.inner.forEach((err)=>{
                validationErrors[err.path]=err.message;
            })
            setErrors(validationErrors)
        }
      }
      const [isSubmitted, setIsSubmitted] = useState(false);
    return(
        <div className="contactpage">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div id="Name">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                        borderColor: errors.name? 'red' : '#ccc',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                      }}
                    />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </div>
                <div id="Email">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email"
                     value={formData.email}
                     onChange={handleChange} 
                     style={{
                        borderColor: errors.email ? 'red' : '#ccc',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                      }}
                     />
                     {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <div id="Message">
                    <label htmlFor="message">Message:</label>
                    <textarea name="message" id="message"
                     value={formData.message}
                     onChange={handleChange} 
                     style={{
                        borderColor: errors.message ? 'red' : '#ccc',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                      }}
                     >
                     </textarea>
                     {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
                </div>
                <input type="submit" value="Send" id="send"/>
            </form>
            {isSubmitted && <div className='submitted'>
        <label><img src={success} />Message Sent</label>
        <label>Thanks for completing the form!.We&apos;ll be in touch soon!</label></div>}
        </div>
    )
}
export default Contact