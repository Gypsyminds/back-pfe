package com.bezkoder.springjwt.Services;


import com.bezkoder.springjwt.Repositery.CertificationRepository;
import com.bezkoder.springjwt.models.Certification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CertificationService implements ICertification{
    @Autowired
    CertificationRepository icertif;
    @Override
    public Certification addQcm(Certification s) {

        return icertif.save(s);
    }

}
