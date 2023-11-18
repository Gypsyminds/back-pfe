package com.bezkoder.springjwt.Services;


import com.bezkoder.springjwt.Repositery.Certif_testRepository;
import com.bezkoder.springjwt.Repositery.ProblemRepository;
import com.bezkoder.springjwt.Repositery.Question_qcmRepository;
import com.bezkoder.springjwt.models.Certif_test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class Certif_testService implements  ICertif_test {
    @Autowired
    Certif_testRepository certif_testRepository;
    @Autowired
    Question_qcmRepository question_qcmRepository;
    @Autowired
    ProblemRepository problemRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public Certif_test addQcm(Certif_test s) {

        return certif_testRepository.save(s);
    }


}


