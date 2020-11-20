const keys = require('../../config/keys');

module.exports = survey => {
  const markup = `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Hello there!</h3>
          <p>Please answer the folowing question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
          </div>
        </div>
      </body>
    </html>
  `;

  return markup;
};