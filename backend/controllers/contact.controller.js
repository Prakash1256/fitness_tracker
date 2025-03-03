import nodemailer from "nodemailer";

export const sendContactForm = (req, res) => {
  const { name, phone, email, comments } = req.body;

  // Set up the transporter using Gmail (you can change this to any other email provider)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,  
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: "ps4059269@gmail.com",
    subject: `New Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Comments: ${comments}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error sending email");
    }
    console.log("Email sent: " + info.response);
    return res.status(200).send("Form submitted successfully");
  });
};
