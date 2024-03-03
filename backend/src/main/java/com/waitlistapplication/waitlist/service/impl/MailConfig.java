package com.waitlistapplication.waitlist.service.impl;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    // Bean definition for configuring JavaMailSender
    @Bean
    public JavaMailSender javaMailSender() {
        // Create an instance of JavaMailSenderImpl
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        // Set SMTP host, port, username, and password
        mailSender.setHost("smtp.gmail.com"); // Set your SMTP host
        mailSender.setPort(587); // Set your SMTP port
        mailSender.setUsername("mnalin02@gmail.com"); // Set your SMTP username
        mailSender.setPassword("ggsq dowq fljp pgqw"); // Set your SMTP password
        //password is generated from google's app password feature
        // Additional mail properties
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        // Return the configured JavaMailSender
        return mailSender;
    }
}
