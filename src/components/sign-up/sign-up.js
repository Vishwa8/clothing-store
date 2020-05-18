import React from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { auth, createUserProfileDocument } from '../../firebase/firebase-utils';
import './sign-up.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            createUserProfileDocument(user, { displayName });

            this.state = {
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
            
        } catch (error) {
            console.log(error);
        }
        this.setState({email: "", password: ""})
    }

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({[name]: value});
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>

            <form className='sign-up-form' onSubmit={this.handleSubmit}>
                <FormInput 
                    name='displayName' 
                    type='text' 
                    value={displayName} 
                    label='Display Name'
                    handleChange={this.handleChange}
                    required 
                />
                <FormInput 
                    name='email' 
                    type='email' 
                    value={email} 
                    label='Email'
                    handleChange={this.handleChange}
                    required 
                />
                <FormInput 
                    name='password' 
                    type='password' 
                    value={password}
                    label='Password'
                    handleChange={this.handleChange}
                    required 
                />
                <FormInput 
                    name='confirmPassword' 
                    type='password' 
                    value={confirmPassword}
                    label='Confirm Password'
                    handleChange={this.handleChange}
                    required 
                />
                <CustomButton type='submit'>SIGN UP </CustomButton>
            </form>
        </div>
        ) 
    }
}

export default SignUp;