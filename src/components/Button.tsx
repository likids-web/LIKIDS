import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    fullWidth?: boolean;
}

export default function Button({
    variant = 'primary',
    fullWidth = false,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}
            {...props}
        />
    );
}
