import React from 'react';
import classNames from 'classnames';

import {Icon} from "../../Elements";

import './PasswordStrengthScore.scss';

const PasswordStrengthScore = ({score}) => {
    return (
        <div className="PasswordStrengthScore" data-score={score}>
            <svg id="StrengthSvg" viewBox="0 0 100 100">
                <path className={classNames(
                    "StrengthDash",
                    "Strength0",
                    {
                        "Active": score >= 0,
                    }
                )} fill="none" strokeLinecap="round" strokeWidth="4"
                      d="M50 2
           a 48 48 0 0 1 0 96
           a 48 48 0 0 1 0 -96"/>
                <path className={classNames(
                    "StrengthDash",
                    "Strength1",
                    {
                        "Active": score >= 1,
                    }
                )} fill="none" strokeLinecap="round" strokeWidth="4"
                      d="M50 2
           a 48 48 0 0 1 0 96
           a 48 48 0 0 1 0 -96"/>
                <path className={classNames(
                    "StrengthDash",
                    "Strength2",
                    {
                        "Active": score >= 2,
                    }
                )} fill="none" strokeLinecap="round" strokeWidth="4"
                      d="M50 2
           a 48 48 0 0 1 0 96
           a 48 48 0 0 1 0 -96"/>
                <path className={classNames(
                    "StrengthDash",
                    "Strength3",
                    {
                        "Active": score >= 3,
                    }
                )} fill="none" strokeLinecap="round" strokeWidth="4"
                      d="M50 2
           a 48 48 0 0 1 0 96
           a 48 48 0 0 1 0 -96"/>
                <path className={classNames(
                    "StrengthDash",
                    "Strength4",
                    {
                        "Active": score >= 4,
                    }
                )} fill="none" strokeLinecap="round" strokeWidth="4"
                      d="M50 2
           a 48 48 0 0 1 0 96
           a 48 48 0 0 1 0 -96"/>
            </svg>
            <div className="ShieldIconWrapper">
                <Icon icon="shield" className="ShieldIcon"/>
            </div>
            <div className="CheckmarkIconWrapper">
                <Icon icon="check" className="CheckmarkIcon"/>
            </div>
        </div>
    )
};

export default PasswordStrengthScore;
