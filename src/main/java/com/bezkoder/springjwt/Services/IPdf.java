package com.bezkoder.springjwt.Services;

import com.bezkoder.springjwt.models.File;
import com.bezkoder.springjwt.models.imageuser;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IPdf {
    //public Stream<Path> loadAll();
    public List<File> retrieveAllfiles();
    public File retrieveQcmById(Long id);
    public imageuser retrieveById(Long id) ;
    public File store(MultipartFile file) throws IOException ;
    }
