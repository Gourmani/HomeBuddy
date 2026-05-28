import baseTemplate from "./baseTemplate.js";

const welcomeTemplate = (name) => {
  return baseTemplate(`

    <h2 style="
      text-align:center;
      color:#0f172a;
    ">
      Welcome to GrihSahayak 🎉
    </h2>

    <p style="
      font-size:16px;
      line-height:1.8;
      color:#475569;
      text-align:center;
    ">
      Hi <b>${name}</b>,
      <br /><br />
      Your account has been successfully verified.
    </p>

    <div style="
      margin-top:30px;
      background:#f8fafc;
      border-radius:12px;
      padding:25px;
    ">

      <h3 style="margin-top:0;color:#2563eb;">
        What you can do now:
      </h3>

      <ul style="
        color:#475569;
        line-height:2;
        padding-left:18px;
      ">
        <li>Hire trusted maids & cooks</li>
        <li>Find babysitters & drivers</li>
        <li>Manage requests easily</li>
        <li>Track bookings professionally</li>
      </ul>

    </div>

  `);
};

export default welcomeTemplate;