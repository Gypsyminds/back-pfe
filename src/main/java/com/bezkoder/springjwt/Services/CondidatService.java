package com.bezkoder.springjwt.Services;

import com.bezkoder.springjwt.Repositery.CondidatRepository;

import com.bezkoder.springjwt.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CondidatService implements ICondidat{


    @Autowired
    CondidatRepository condidatrep;

    //@Override
    //public Condidat addQcm(Condidat s , MultipartFile photo) {
      // s.setPhoto(photo);
        //return iQuestion_qcm.save(s);
    //}

    @Override
    public List<User> retrieveAllUsers() {

        return (List<User>) condidatrep.findAll();
    }

}
