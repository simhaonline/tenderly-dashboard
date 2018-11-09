import React, {Component} from 'react';
import classNames from 'classnames';

import {PublicApi} from '../../Utils/Api';
import {Button, Dialog, Icon} from '../../Elements';

import './EarlyAccessSignUp.css';

class EarlyAccessSignUp extends Component {
    constructor(props) {
        super(props);

        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.emailRef = React.createRef();

        this.state = {
            formState: 'sign-up',
            errors: {},
            form: {
                firstName: '',
                lastName: '',
                email: '',
                agreement: false,
            },
        }
    }

    validateEmail = (email) => {
        // eslint-disable-next-line
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
    };

    handleSubscribeSubmit = (event) => {
        event.preventDefault();

        const {form, formState} = this.state;

        if (!['error', 'sign-up'].includes(formState)) return;

        this.setState({
            formState: 'sign-up',
        });

        const isValidEmail = this.validateEmail(form.email);

        const errors = {};

        if (!isValidEmail) {
            errors.email = {
                message: `Whoops, seems like this isn't a valid e-mail. Please provide a valid e-mail to sign up.`
            }
        }

        if (!form.agreement) {
            errors.agreement = {
                message: 'In order to be updated you need to agree.'
            }
        }

        this.setState({
            errors,
        });

        if (!!Object.values(errors).length) return;

        this.setState({
            formState: 'sending',
        });

        PublicApi.post('/subscribe', {
            email: form.email,
        }).then(() => {
            setTimeout(() => {
                this.setState({
                    formState: 'sent',
                });

                setTimeout(() => {
                    this.setState({
                        formState: 'done',
                    });
                }, 1000);
            }, 500);
        }, () => {
            this.setState({
                formState: 'error',
            });
        });
    };

    handleFormUpdate = (field) => {
        return (event) => {
            const value = event.target.value;

            this.setState({
                form: {
                    ...this.state.form,
                    [field]: value,
                }
            });
        }
    };

    handleAgreementToggle = () => {
        const {form} = this.state;

        this.setState({
            form: {
                ...form,
                agreement: !form.agreement,
            }
        });
    };

    modalOpenedHandler = () => {
        if (this.emailRef && this.emailRef.current) {
            this.emailRef.current.focus();
        }
    };

    render() {
        const {open, onClose} = this.props;
        const {form, formState, errors} = this.state;

        let buttonClass;
        let buttonText = 'Sign Up';

        if (formState === 'sending') {
            buttonClass = 'Sending';
            buttonText = 'Signing up..';
        } else if (formState === 'sent' || formState === 'done') {
            buttonClass = 'Sent';
            buttonText = 'Thanks!';
        } else if (formState === 'error') {
            buttonText = 'Try again';
        }

        return (
            <Dialog open={open} onClose={onClose} onAfterOpen={this.modalOpenedHandler} className="EarlyAccessSignUpDialog">
                <div className="SignUpWrapper">
                    <div className="SignUpInfo">
                        <div className="SignUpLogo">Tenderly</div>
                        <h4>Get Early Access!</h4>
                        <p>The first batch of invitations will sent out soon, be among the first to get access to Tenderly.</p>
                        <p>You will receive an e-mail with an activation link and documentation when you get approved for Early Access.</p>
                    </div>
                    {formState !== 'done' && <form className="SignUpForm" onSubmit={this.handleSubscribeSubmit}>
                        <div className="FormGroup">
                            <label htmlFor="email" className="FormLabel">E-mail <span className="HighlightPink">*</span></label>
                            <input value={form.email}
                                   onChange={this.handleFormUpdate('email')}
                                   ref={this.emailRef}
                                   type="text"
                                   id="email"
                                   name="email"
                                   className={classNames(
                                       'FormInput',
                                       {
                                           'Error': !!errors.email,
                                       }
                                   )}/>
                            {!!errors.email && <div className="ErrorMessage">{errors.email.message}</div>}
                        </div>
                        <div className="CheckboxGroup">
                            <div className="CheckboxWrapper">
                                <input checked={form.agreement} onChange={this.handleAgreementToggle} type="checkbox" id="news_sign_up" name="news_sign_up" className="CheckboxInput"/>
                                <div className="Checkbox">
                                    <Icon icon="check" className="CheckboxIcon"/>
                                </div>
                            </div>
                            <label htmlFor="news_sign_up" className="FormLabel">I agree to receive updates from Tenderly</label>
                        </div>
                        {!!errors.agreement && <div className="ErrorMessage">{errors.agreement.message}</div>}
                        <div className="FormActions">
                            {formState === 'error' && <span className="ErrorMessage">Whoops, seems that something went wrong on our end, please try again.</span>}
                            <Button type="submit"
                                    className={`SignUpButton ${buttonClass}`}
                                    disabled={!form.agreement || !form.email || !['error', 'sign-up'].includes(formState)}>
                                <span>{buttonText}</span>
                            </Button>
                        </div>
                    </form>}
                    {formState === 'done' && <div className="SignedUpMessageWrapper">
                        <div className="MessageIconWrapper">
                            <Icon icon="send" className="MessageIcon"/>
                        </div>
                        <h5 className="MessageHeading">We'll be in touch.</h5>
                        <p className="MessageText">We are working hard to give you the best blockchain development tools.</p>
                        <Button className={`SignUpButton`} onClick={onClose}>
                            <span>Done</span>
                        </Button>
                    </div>}
                </div>
            </Dialog>
        )
    }
}

export default EarlyAccessSignUp;
