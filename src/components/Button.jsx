import './Button.css';

const Button = ({
  id,
  children,
  variant = 'primary',
  icon,
  onClick,
  disabled = false,
  fullWidth = false,
  size = 'md',
}) => {
  return (
    <button
      id={id}
      className={[
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth ? 'btn--full' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="btn__label">{children}</span>
      {variant === 'primary' && (
        <span className="btn__shine" aria-hidden="true" />
      )}
    </button>
  );
};

export default Button;
