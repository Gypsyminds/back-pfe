package com.bezkoder.springjwt.Services;

import com.bezkoder.springjwt.Repositery.pdfRepository;
import com.bezkoder.springjwt.Repositery.userumagerepo;
import com.bezkoder.springjwt.models.File;
import com.bezkoder.springjwt.models.imageuser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class PdfService implements IPdf{
    @Autowired
    pdfRepository pdfrep ;
    @Autowired
    userumagerepo rep;
    //private final Path root = Paths.get("uploads");


    public List<File> retrieveAllfiles() {

        return (List<File>) pdfrep.findAll();
    }
   @Override
    public File retrieveQcmById(Long id) {

        return pdfrep.findById(id).get();
    }
   @Override
    public imageuser retrieveById(Long id) {

        return  rep.findById(id).orElse(null);
    }
    public File store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        File FileDB = new File(fileName, file.getContentType(), file.getBytes());

        return pdfrep.save(FileDB);
    }

}
