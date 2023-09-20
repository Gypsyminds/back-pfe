package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.Repositery.CourseRepository;
import com.bezkoder.springjwt.Repositery.Question_qcmRepository;
import com.bezkoder.springjwt.Services.pdfservice;
import com.bezkoder.springjwt.models.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "http://localhost:4200")
public class PDFControlleur {
    @Autowired
    pdfservice pdf;
    @Autowired
    Question_qcmRepository question_qcmRepository;
    @Autowired
    CourseRepository courrep;
    @Autowired
    pdfservice dfservice;

    @GetMapping(produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<Resource> getPdf() {
        Resource pdfFile = new ClassPathResource("static/use.pdf");

        return ResponseEntity.ok()
                .header("Content-Disposition", "inline; filename=" + pdfFile.getFilename())
                .body(pdfFile);
    }

    // @PostMapping("/generate-pdf/{qcm}")
    // public String generatePdf(@RequestBody String data ,@PathVariable Long qcm) throws  IOException {
    //   String outputPath = "src/main/resources/static/users.pdf";

    //  return  pdf.generatePdfs(data , qcm,outputPath);

    //  }

    //@PostMapping("/upload")
    //public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
     //   String message = "";
      //  try {
       //     dfservice.store(file);

         //   message = "Uploaded the file successfully: " + file.getOriginalFilename();
           // return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
       // } catch (Exception e) {
         //   message = "Could not upload the file: " + file.getOriginalFilename() + "!";
          //  return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
       // }
    //}
}

