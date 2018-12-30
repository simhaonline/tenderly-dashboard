import React from 'react';
import zxcvbn from "zxcvbn";

import {Button, Card, Input} from "../../Elements";
import {PasswordStrengthScore} from "../index";

import './RegisterPasswordForm.css';

const RegisterPasswordForm = ({form, onChange, onSubmit, onBack}) => {
    const {email, firstName, lastName, password, repeatPassword} = form;
    const passwordStrength = zxcvbn(password, [email, firstName, lastName]);

    return (
        <Card className="RegisterPasswordForm">
            <div className="MainFormWrapper">
                <div className="InputsWrapper">
                    <div>
                        <Input icon="lock" type="password" label="Password" field="password" value={password} onChange={onChange}/>
                        <Input icon="lock" type="password" label="Repeat password" field="repeatPassword" value={repeatPassword} onChange={onChange}/>
                    </div>
                    {password && <div className="CrackInfoWrapper">
                        <div className="CrackInfo">Hackable time: <span className="CrackTimeInfo">{passwordStrength.crack_times_display.offline_slow_hashing_1e4_per_second}</span></div>
                    </div>}
                </div>
                <div className="ScoreWrapper">
                    <PasswordStrengthScore score={passwordStrength.score}/>
                </div>
            </div>
            <div>
                <Button onClick={onBack} outline>
                    <span>Back</span>
                </Button>
                <Button disabled={!password || !repeatPassword} onClick={onSubmit}>
                    <span>Create Account</span>
                </Button>
            </div>
        </Card>
    );
};

export default RegisterPasswordForm;
