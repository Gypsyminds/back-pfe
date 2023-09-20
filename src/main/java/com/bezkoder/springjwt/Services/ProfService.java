package com.bezkoder.springjwt.Services;

import com.bezkoder.springjwt.Repositery.ProfeRepository;
import com.bezkoder.springjwt.models.Course;
import com.bezkoder.springjwt.models.Profe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProfService implements IProf{

@Autowired
ProfeRepository profrepo ;

    @Override
    public List<Profe> retrieveAllProfs() {

        return (List<Profe>) profrepo.findAll();
    }

}
