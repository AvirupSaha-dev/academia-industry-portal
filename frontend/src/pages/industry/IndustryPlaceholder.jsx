function IndustryPlaceholder({
  title = "Coming Soon",
  description = "This industry module is being prepared.",
}) {
  return (
    <div className="industry-page">

      <div className="industry-page-header">
        <div>
          <p className="industry-tag">
            INDUSTRY PORTAL
          </p>

          <h1>{title}</h1>

          <p>{description}</p>
        </div>
      </div>

      <div className="industry-card">

        <div className="industry-empty">

          <div>🚀</div>

          <h3>{title}</h3>

          <p>
            Backend API integration can be connected
            to this module later.
          </p>

        </div>

      </div>

    </div>
  );
}

export default IndustryPlaceholder;