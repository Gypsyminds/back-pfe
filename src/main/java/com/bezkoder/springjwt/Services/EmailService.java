package com.bezkoder.springjwt.Services;


import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        //message.
        javaMailSender.send(message);
    }
    //public void sendPdfByEmail(String to, String subject, String text, byte[] pdfData) {
    //    MimeMessage message = javaMailSender.createMimeMessage();
     //   try {
        //    MimeMessageHelper helper = new MimeMessageHelper(message, true);
        //    helper.setTo(to);
        //    helper.setSubject(subject);
       //     helper.setText(text);
       //     helper.addAttachment("document.pdf", new ByteArrayResource(pdfData), "application/pdf");

        //    javaMailSender.send(message);
       // }catch (jakarta.mail.MessagingException e) {
       //     throw new RuntimeException(e);
     //   }
  //  }
    public void sendPdfByEmails(String to, String subject, String text, byte[] pdfData) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            helper.addAttachment("document.pdf", new ByteArrayResource(pdfData), "application/pdf");

            javaMailSender.send(message);
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
