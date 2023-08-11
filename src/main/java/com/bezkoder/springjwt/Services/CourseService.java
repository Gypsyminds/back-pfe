package com.bezkoder.springjwt.Services;

import com.bezkoder.springjwt.Repositery.CourseRepository;
import com.bezkoder.springjwt.models.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService implements ICourse{
    @Autowired
    CourseRepository icourse;
    @Override
    public List<Course> retrieveAllCour() {

        return (List<Course>) icourse.findAll();
    }

    @Override
    public Course addCour(Course s) {
        //    s.setDate_start(LocalDateTime.now());
        return icourse.save(s);
    }
    @Override
    public Course retrieveCourseById(Long id) {

        return icourse.findById(id).get();
    }
}
