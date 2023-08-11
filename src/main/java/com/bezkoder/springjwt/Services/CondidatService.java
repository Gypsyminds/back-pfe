package com.bezkoder.springjwt.Services;

import com.bezkoder.springjwt.Repositery.CondidatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CondidatService implements ICondidat{


    @Autowired
    CondidatRepository iQuestion_qcm;

    //@Override
    //public Condidat addQcm(Condidat s , MultipartFile photo) {
      // s.setPhoto(photo);
        //return iQuestion_qcm.save(s);
    //}
}
