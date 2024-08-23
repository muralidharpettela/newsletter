import React, {useState} from 'react';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Message} from 'primereact/message';
import './unsubscribe.css';  // Import custom styles

const unsubscribeEmail = async (email) => {
    const response = await axios.post('https://app-membership.onrender.com/unsubscribe', null, {
        params: { email }
    });
    return response.data;
};

const Unsubscribe = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    // Use the mutation hook to handle the unsubscribe API call
    const mutation = useMutation(unsubscribeEmail, {
        onSuccess: () => {
            setMessage({severity: 'success', text: 'Successfully unsubscribed'});
            setEmail('');  // Clear the email field
        },
        onError: () => {
            setMessage({severity: 'error', text: 'An error occurred while unsubscribing'});
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(email);
    };

    return (
        <div className="p-d-flex p-jc-center p-ai-center" style={{minHeight: '100vh'}}>
            <div className="p-card p-p-4 p-shadow-3 unsubscribe-card">
                <h1 className="p-text-center p-mb-4">Newsletter Unsubscribe</h1>
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="p-field p-grid p-align-center p-mb-3">
                        <div className="p-col-12 p-md-9">
              <span className="p-float-label">
                <InputText
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-inputtext-sm"
                />
                <label htmlFor="email">Enter your email</label>
              </span>
                        </div>
                        <div className="p-col-12 p-md-3 p-mt-2 p-md-mt-0">
                            <Button
                                type="submit"
                                label="Unsubscribe"
                                icon="pi pi-envelope"
                                loading={mutation.isLoading}
                                className="p-button-sm"
                            />
                        </div>
                    </div>
                </form>
                {message && <Message severity={message.severity} text={message.text} className="p-mt-3"/>}
            </div>
        </div>
    );
};

export default Unsubscribe;