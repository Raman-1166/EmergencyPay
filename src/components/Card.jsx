import './Card.css';

const Card = ({
  id,
  label,
  value,
  icon,
  variant = 'default',
  description,
  trend,
}) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      return `₹${val.toLocaleString('en-IN')}`;
    }
    return val;
  };

  return (
    <article
      id={id}
      className={`card card--${variant}`}
      aria-label={`${label}: ${formatValue(value)}`}
    >
      <div className="card__header">
        <div className={`card__icon-wrap card__icon-wrap--${variant}`} aria-hidden="true">
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`card__trend card__trend--${trend >= 0 ? 'up' : 'down'}`} aria-label={`Trend: ${trend >= 0 ? 'up' : 'down'}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {trend >= 0 ? (
                <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>
              ) : (
                <><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></>
              )}
            </svg>
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      <div className="card__body">
        <p className="card__label">{label}</p>
        <p className="card__value">{formatValue(value)}</p>
        {description && (
          <p className="card__description">{description}</p>
        )}
      </div>

      {variant === 'danger' && (
        <div className="card__alert-strip" aria-hidden="true" />
      )}
    </article>
  );
};

export default Card;
