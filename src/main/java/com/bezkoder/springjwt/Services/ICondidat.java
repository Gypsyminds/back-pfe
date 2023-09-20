package com.bezkoder.springjwt.Services;

import com.bezkoder.springjwt.models.User;

import java.util.List;

public interface ICondidat {
    //Condidat addQcm(Condidat s , MultipartFile photo);
    public List<User> retrieveAllUsers();

}
