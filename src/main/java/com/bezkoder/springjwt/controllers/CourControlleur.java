package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.Services.ICourse;
import com.bezkoder.springjwt.models.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/cour")
public class CourControlleur {
    @Autowired
    ICourse icourse ;
    @PostMapping(value = "/add-test")
    public Course addCourse(@RequestBody Course s) {
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
}
