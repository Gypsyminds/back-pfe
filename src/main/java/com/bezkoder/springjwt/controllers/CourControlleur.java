package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.Repositery.*;
import com.bezkoder.springjwt.Services.ICondidat;
import com.bezkoder.springjwt.Services.ICourse;
import com.bezkoder.springjwt.Services.IProf;
import com.bezkoder.springjwt.models.Course;
import com.bezkoder.springjwt.models.File;
import com.bezkoder.springjwt.models.Profe;
import com.bezkoder.springjwt.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/cour")
public class CourControlleur {
    @Autowired
    ICourse icourse ;
    @Autowired
    ICondidat icondidat ;
    @Autowired
    CourseRepository courrep ;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProfeRepository profrepo ;
    @Autowired
    IProf iprof ;
    @Autowired
    CertificationRepository certifrepo ;
    @Autowired
    Certif_testRepository testrepo ;
    @Autowired
    pdfRepository pdfrep;


    @PostMapping(value = "/add-cour")
    public Course addCour(@RequestBody Course s) {
      // s.setFile(file.getBytes());
     //  Long idfile = pdfrep.idlastf();
      // s.setFilepdf(idfile);
        Long id = pdfrep.idlastf();
        s.setFilepdf(id);
        return icourse.addCour(s);
    }

    @GetMapping(value ="/showall")
    public List<Course> retrieveAllCourse() {

        return icourse.retrieveAllCour();
    }
    @GetMapping(value ="/showCourse/{id}")
    public Course retriveProb(@PathVariable Long id) {

        return icourse.retrieveCourseById(id);
    }
    @GetMapping(value="/showusers")
    public List<User> showusers(){
        return icondidat.retrieveAllUsers();
    }
    @GetMapping(value="/nubrcour")
    public int affcour(){
        return courrep.nubcours();
    }
    @GetMapping(value="/nbrusers")
    public int affusers(){
        return userRepository.nubusers();
    }
    @GetMapping(value="/nbrprof")
    public int affprof(){
        return profrepo.nubprofs();
    }
    @GetMapping(value="/profs")
    public List<Profe> retrieveAllprofs() {

        return iprof.retrieveAllProfs();
    }
    @GetMapping(value="/nbrcertif")
    public int affcertif(){
        return certifrepo.nubcertifs();
    }
    @GetMapping(value="/nbrtest")
    public int afftest(){
        return testrepo.nubtest();
    }
}
