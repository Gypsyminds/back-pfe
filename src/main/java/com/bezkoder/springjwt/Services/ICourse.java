package com.bezkoder.springjwt.Services;


import com.bezkoder.springjwt.models.Course;

import java.util.List;

public interface ICourse {
    public List<Course> retrieveAllCour();

   // Course addCour(Course s, Long idfile);

    // public Course addCour(Course s);
    public Course retrieveCourseById(Long id);
   // public Course addCourse(Course s, MultipartFile file);

    public Course addCour(Course s) ;
}


