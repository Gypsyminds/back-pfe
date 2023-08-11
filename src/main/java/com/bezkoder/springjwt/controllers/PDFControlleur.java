package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.Repositery.Question_qcmRepository;
import com.bezkoder.springjwt.Services.pdfservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "http://localhost:4200")
public class PDFControlleur {
    @Autowired
    pdfservice pdf ;
    @Autowired
    Question_qcmRepository question_qcmRepository;
    @GetMapping(produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<Resource> getPdf() {
        Resource pdfFile = new ClassPathResource("static/use.pdf");

        return ResponseEntity.ok()
                .header("Content-Disposition", "inline; filename=" + pdfFile.getFilename())
                .body(pdfFile);
    }

    //@PostMapping("/generate-pdf/{qcm}")
   // public String generatePdf(@RequestBody String data ,@PathVariable Long qcm) throws DocumentException, IOException {
    //    String outputPath = "src/main/resources/static/users.pdf";

     //  return  pdf.generatePdfs(data , qcm,outputPath);

    //}
}
