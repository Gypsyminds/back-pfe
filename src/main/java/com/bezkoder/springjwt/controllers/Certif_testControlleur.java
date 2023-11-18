package com.bezkoder.springjwt.controllers;


import com.bezkoder.springjwt.Repositery.CertificationRepository;
import com.bezkoder.springjwt.Services.ICertif_test;
import com.bezkoder.springjwt.Services.ICertification;
import com.bezkoder.springjwt.models.Certif_test;
import com.bezkoder.springjwt.models.Certification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/feed")
public class Certif_testControlleur {
   @Autowired
   ICertif_test iCertif_test;
   @Autowired
   ICertification ICERTIF ;
   @Autowired
   CertificationRepository certif ;

   @PostMapping(value = "/add-test")
   public Certif_test addQcm(@RequestBody Certif_test s) {
      return iCertif_test.addQcm(s);

   }
   @PostMapping(value="/ass-score")
   public Certification addQcm(@RequestBody Certification s){

      return ICERTIF.addQcm(s);
   }
   @GetMapping(value="/certifhtml")
   public Certification getcertif(){
      Long cert =  certif.idlastcertif();
      return ICERTIF.retrieveCourseById(cert);
   }

}
