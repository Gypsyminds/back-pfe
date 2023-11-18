package com.bezkoder.springjwt.Services;


import com.bezkoder.springjwt.models.Certification;

public interface ICertification {
    public Certification addQcm(Certification s);
    public Certification retrieveCourseById(Long id) ;

    }
