const emailAdapter =
  process.env.MAILGUN_API_KEY &&
  process.env.MAILGUN_DOMAIN &&
  process.env.MAILGUN_ADDRESS
    ? {
        module: "parse-server-mailgun",
        options: {
          apiKey: process.env.MAILGUN_API_KEY,
          domain: process.env.MAILGUN_DOMAIN,
          fromAddress: process.env.MAILGUN_ADDRESS,
          templates: {
            /* inviteEmail: {
        pathHtml: "mailTemplates/invite.html",
        pathPlainText: "mailTemplates/invite.txt",
        subject: "Inviting you to Arges",
      }, */
            passwordResetEmail: {
              pathHtml: "mailTemplates/passwordReset.html",
              pathPlainText: "mailTemplates/passwordReset.txt",
              subject: "Reset your password",
            },
            verificationEmail: {
              pathHtml: "mailTemplates/emailVerify.html",
              pathPlainText: "mailTemplates/emailVerify.txt",
              subject: "Confirm your account",
            },
          },
        },
      }
    : undefined;
export default emailAdapter;
