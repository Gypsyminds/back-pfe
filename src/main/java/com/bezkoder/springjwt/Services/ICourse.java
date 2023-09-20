package com.bezkoder.springjwt.Services;


import com.bezkoder.springjwt.models.Course;

import java.util.List;

public interface ICourse {
    public List<Course> retrieveAllCour();

    public Course addCour(Course s);
    public Course retrieveCourseById(Long id);

}


