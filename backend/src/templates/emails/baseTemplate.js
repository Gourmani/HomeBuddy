const baseTemplate = (content) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body style="
    margin:0;
    padding:0;
    background:#f4f7fb;
    font-family:Arial,sans-serif;
  ">

    <div style="
      max-width:600px;
      margin:40px auto;
      background:white;
      border-radius:16px;
      overflow:hidden;
      box-shadow:0 5px 20px rgba(0,0,0,0.08);
    ">

      <!-- HEADER -->
      <div style="
        background:linear-gradient(135deg,#2563eb,#1e40af);
        padding:30px;
        text-align:center;
        color:white;
      ">
        <h1 style="margin:0;font-size:28px;">
          GrihSahayak
        </h1>

        <p style="
          margin-top:8px;
          opacity:0.9;
          font-size:14px;
        ">
          Trusted Home Services Platform
        </p>
      </div>

      <!-- CONTENT -->
      <div style="padding:40px 30px;">
        ${content}
      </div>

      <!-- FOOTER -->
      <div style="
        background:#f8fafc;
        padding:20px;
        text-align:center;
        font-size:13px;
        color:#64748b;
      ">
        <p style="margin:0;">
          © ${new Date().getFullYear()} GrihSahayak
        </p>

        <p style="margin-top:8px;">
          Secure • Trusted • Professional
        </p>
      </div>

    </div>

  </body>
  </html>
  `;
};

export default baseTemplate;