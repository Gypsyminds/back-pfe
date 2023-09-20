package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.Repositery.Certif_testRepository;
import com.bezkoder.springjwt.Repositery.CertificationRepository;
import com.bezkoder.springjwt.Repositery.Question_qcmRepository;
import com.bezkoder.springjwt.Services.ICondidat;
import com.bezkoder.springjwt.Services.IQuestion_qcm;
import com.bezkoder.springjwt.models.Certif_test;
import com.bezkoder.springjwt.models.Certification;
import com.bezkoder.springjwt.models.Question_qcm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/qcm")
public class Qcm_QuestionControlleur {

    @Autowired
    IQuestion_qcm iQuestion_qcm;
    @Autowired
    ICondidat icondidat;
    @Autowired
    Question_qcmRepository question_qcmRepository;
    @Autowired
    CertificationRepository certificationRepository;
@Autowired
    Certif_testRepository certifrepo;
    @PostMapping(value = "/add-Qcm")
    public Question_qcm addQcm(@RequestBody Question_qcm s) {
        return iQuestion_qcm.addQcm(s);

    }

   // @PostMapping(value = "/addcondidat")
    //public Condidat addcond(@RequestBody Condidat s, @RequestParam("file") MultipartFile file) throws IOException {

      //      return icondidat.addQcm(s,file);


//}

    @DeleteMapping(value = "/delete-Qcm/{id}")
    void deleteQcmById(@PathVariable Long id) {
        Question_qcm qcm = iQuestion_qcm.retrieveQcmById(id);
        //if(LocalDateTime.now().minusSeconds(1L).isAfter(qcm.getDate_start()))
            iQuestion_qcm.deleteQcmById(id);
    }

    @DeleteMapping(value = "/delete-Qcm")
    void deleteQcm(@RequestBody Question_qcm s) {
        iQuestion_qcm.deleteQcm(s);
    }

    //@GetMapping(value ="/showall")
    //public List<Question_qcm> retrieveAllQcm() {
    //    return iQuestion_qcm.retrieveAllQcm();
   // }

    @GetMapping(value ="/showqcm/{id}")
    public Question_qcm retriveQcm(@PathVariable Long id) {

        return iQuestion_qcm.retrieveQcmById(id);
    }

    @PostMapping(value ="/AddTest/{testid}")
    public Question_qcm AddTest(@RequestBody Question_qcm test,@PathVariable Long testid) {
        return iQuestion_qcm.AddTest(test,testid);
    }
    @GetMapping(value="/qcm/{certif_id_test}")
    public List<Question_qcm> getRanQcm(@PathVariable Long certif_id_test){

        return question_qcmRepository.findRandom(certif_id_test);
    }
  //  @GetMapping(value="score/{qcm}")
    //public Long calculescore(@PathVariable Long qcm){

      //  Long socors = question_qcmRepository.score(qcm);
        //return socors ;

  //  }
    @PostMapping(value="AddFile/{qcm}/{certif}")
    public String Addfile(@RequestBody String reponse ,@PathVariable Long qcm ,@PathVariable Long certif) throws IOException {
        Question_qcm qcms = question_qcmRepository.findById(qcm).orElse(null);
        certif = 1L;
       // Long socors = question_qcmRepository.score(qcms.getCertif().getId_test());

        FileWriter fileWriter = new FileWriter(qcms.getCertif().getTest_title());
        fileWriter.write("Question : ");
        fileWriter.write(qcm.toString());      fileWriter.write("--------- ");
        fileWriter.write("Réponse : ");
        fileWriter.write(reponse.toString());
        fileWriter.write("--------- ");
        fileWriter.write("\n");
        fileWriter.close();
         return "123";

    }


    @GetMapping("/file-content")
    public String getFileContent() throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("1java.txt");
        String fileContent = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
        return fileContent;
    }

        //@GetMapping("/qrcode")
    //    public ResponseEntity<byte[]> generateQRCode(@RequestParam("text") String text) throws IOException, WriterException {

      //      QRCodeWriter qrCodeWriter = new QRCodeWriter();

     //       BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, 200, 200);
       //     ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
       //     MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
       //     byte[] bytes = outputStream.toByteArray();
     //       HttpHeaders headers = new HttpHeaders();
      //      headers.setContentType(MediaType.IMAGE_PNG);
      //      return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
     //   }


    @GetMapping("/pdf/{fileName:.+}")
    public ResponseEntity<Resource> getPdf(@PathVariable String fileName) throws IOException {
        Resource resource = new ClassPathResource("static/pdf" + fileName);

        if (resource.exists()) {
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=" + fileName);
            headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");
            return new ResponseEntity<>(resource, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/api/static")
    public ResponseEntity<byte[]> getPdf() throws IOException {
        ClassPathResource pdfFile = new ClassPathResource("static/use.pdf");
        byte[] bytes = StreamUtils.copyToByteArray(pdfFile.getInputStream());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "use.pdf");
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }
}
