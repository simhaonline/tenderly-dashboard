import React from 'react';
import zxcvbn from "zxcvbn";

import {Button, Card, Input} from "../../Elements";
import {PasswordStrengthScore} from "../index";

const RegisterPasswordForm = ({form, onChange, onSubmit}) => {
    const {email, firstName, lastName, password, repeatPassword} = form;
    const passwordStrength = zxcvbn(password, [email, firstName, lastName]);

    return (
        <Card className="RegisterPasswordForm">
            <Input icon="lock" type="password" label="Password" field="password" value={password} onChange={onChange}/>
            {password && <div>
                <p>Hackable time: {passwordStrength.crack_times_display.offline_slow_hashing_1e4_per_second}</p>
                <p>Score: {passwordStrength.score}</p>
            </div>}
            <Input icon="lock" type="password" label="Repeat password" field="repeatPassword" value={repeatPassword} onChange={onChange}/>
            <PasswordStrengthScore score={passwordStrength.score}/>
            <Button>
                <span>Create Account</span>
            </Button>
        </Card>
    );
};

export default RegisterPasswordForm;
